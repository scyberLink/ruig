import { spawnSync } from "child_process";
import { program } from "commander";
import fs from 'fs';
import leven from 'leven';
import path from "path";
import { minify } from 'terser';
import IManifest from "./IManifest";
import IAnyObject from "./IAnyObject";
import { ZipFile } from "yazl";
import IFile from "./IFile";

const pkgPath = path.resolve(process.cwd(), 'package.json')
if (!fs.existsSync(pkgPath)) {
	throw new Error("package.json not found")
}
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json')
if (!fs.existsSync(tsconfigPath)) {
	throw new Error("tsconfig.json not found")
}
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'))

module.exports = function (argv: string[]): void {
	program.version(pkg.version).usage('<command>');

	program
		.command('package')
		.description(`Package project the current project`)
		//.option('-c, --package', 'Package the project', false)
		.option('-a, --assetsDir', 'Assets dir can be in public dir or any where', `./public/assets`)
		.action(({ assetsDir }) => _package(assetsDir));
	/* 
		program
			.command('show <extensionid>')
			.description(`Shows an extension's metadata`)
			.option('--json', 'Outputs data in json format', false)
			.action((extensionid, { json }) => main(show(extensionid, json)));
	 */
	program.on('command:*', ([cmd]: string) => {

		program.outputHelp(help => {
			const availableCommands = program.commands.map(c => c.name);
			const suggestion = availableCommands.find(c => leven(c as any, cmd) < c.length * 0.4);

			help = `${help}\n Unknown command '${cmd}'`;

			return suggestion ? `${help}, did you mean '${suggestion}'?\n` : `${help}.\n`;
		});
		process.exit(1);
	});

	program.description(`${pkg.description}
	To learn more about the Ruig extension API: https://aka.ms/ruig-extension-api
	To connect with the Ruig extension developer community: https://aka.ms/ruig-discussions`);

	program.parse(argv);
};

async function _package(assetsDir: string) {
	const tsBuildDir = tsconfig?.compilerOptions?.outDir

	if (!tsBuildDir) {
		throw new Error("Please specify outDir in tsconfig compilerOptions")
	}

	if (!(
		pkg.name &&
		pkg.version &&
		pkg.description &&
		pkg.publisher &&
		pkg.classname &&
		pkg.doc
	)) {
		throw new Error(`You must specify name, version, description, classname, doc, and publisher in package.json file`)
	}

	if (!fs.existsSync(pkg.doc)) {
		throw new Error("Please specify or create a valid README.md documentation file in the root in package.json")
	}

	const manifest: IManifest = {
		name: pkg.name,
		version: pkg.version,
		description: pkg.description,
		publisher: pkg.publisher,
		classname: pkg.classname,
		doc: pkg.doc,
	}

	const outDir = `/tmp/${pkg.name}_${pkg.version}_production`
	const bundleName = 'extension.ruigem'
	const manifesName = 'manifest.json'
	const minBundleName = 'extension.min.ruigem'
	const importationsName = 'importations.json'
	const bundlePath = path.join(outDir, bundleName);
	const manifestPath = path.join(outDir, manifesName);
	const minBundlePath = path.join(outDir, minBundleName);
	const importationsPath = path.join(outDir, importationsName);

	spawnSync('npx', ['tsc'])

	let importations: IAnyObject = {}
	let files: string[] = []

	const ignorePatterns = readIgnorePatterns();

	const compiled = __package(tsBuildDir, files, importations, ignorePatterns).join('\n\n').trim().concat('\n\n', `new ${manifest.classname}(REI.appContainer)`).replace(/assets\//g, `extension-store/${manifest.publisher}/${manifest.name}/`)

	spawnSync('rm', ['-rf', outDir])
	spawnSync('mkdir', ['-p', outDir])
	fs.writeFileSync(bundlePath, compiled);
	fs.writeFileSync(importationsPath, JSON.stringify(Object.keys(importations)));
	fs.writeFileSync(manifestPath, JSON.stringify(manifest));

	const result = await minify(compiled, { mangle: true })
	fs.writeFileSync(minBundlePath, result.code as string);

	zip(manifest, outDir, assetsDir)

}

function __package(directory: string, files: string[], importations: IAnyObject, ignorePatterns: RegExp[]): string[] {
	const children = fs.readdirSync(directory);

	children.forEach(item => {
		const filePath = path.join(directory, item);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			__package(filePath, files, importations, ignorePatterns);
		} else {
			if (!ignorePatterns.some(pattern => pattern.test(filePath)) && filePath.endsWith('.js')) {
				const fileContent = fs.readFileSync(filePath, 'utf8');
				const { stripped, imports } = stripImportsAndExports(fileContent);
				files.push(stripped);
				for (const imported of imports) {
					importations[imported] = imported
				}
			}
		}
	});

	return files;
}

function stripImportsAndExports(content: string): { stripped: string; imports: string[] } {
	const importRegex = /import\s*({[^}]+}|\w+)\s*from\s*['"].+?['"];?/g;
	const exportRegex = /export\s+.+?;/g;
	const imports: string[] = [];
	const stripped = content.replace(importRegex, (_match, importStatement) => {
		if (importStatement.startsWith('{')) {

			const namedImports: string[] = importStatement.substring(1, importStatement.length - 1).split(',');

			namedImports.forEach(namedImport => {
				imports.push(namedImport.trim());
			});

			return '';
		} else {
			imports.push(importStatement.trim());
			return '';
		}
	}).replace(exportRegex, '').trim();
	return { stripped, imports };
}

function readIgnorePatterns(): RegExp[] {
	const ignoreFilePath = '.ruigemIgnore';
	if (fs.existsSync(ignoreFilePath)) {
		const ignoreFileContent = fs.readFileSync(ignoreFilePath, 'utf8');
		return ignoreFileContent
			.split('\n')
			.filter(line => !!line.trim())
			.map(pattern => new RegExp(pattern.trim()));
	}
	return [];
}

async function zip(manifest: IManifest, outDir: string, assetsDir: string) {
	const packagePath = `./${manifest.publisher}.${manifest.name}.v${manifest.version}.rex`
	const files: IFile[] = collectFiles(outDir, assetsDir, manifest)
	writeRex(files, packagePath, outDir)
}

async function writeRex(files: IFile[], packagePath: string, outDir: string) {
	try {
		await fs.promises
			.unlink(packagePath)
	} catch (err: any) {
		if (err?.code !== 'ENOENT') {
			throw err
		}
	}

	new Promise((c, e) => {
		const zip = new ZipFile();
		files.forEach(f => {
			zip.addFile(f.localPath, f.path, { mode: 0o600 })
		});
		zip.end();

		const zipStream = fs.createWriteStream(packagePath);
		zip.outputStream.pipe(zipStream);

		zip.outputStream.once('error', e);
		zipStream.once('error', e);
		zipStream.once('finish', () => {
			fs.promises.stat(packagePath).then(stats => {

				let size = 0;
				let unit = '';

				if (stats.size > 1048576) {
					size = Math.round(stats.size / 10485.76) / 100;
					unit = 'MB';
				} else {
					size = Math.round(stats.size / 10.24) / 100;
					unit = 'KB';
				}

				console.log(`Packaged: ${packagePath} (${size}${unit})`);
			})

			spawnSync('rm', ['-rf', outDir])
			c(null)
		});
	})
}

function collectFiles(outDir: string, assetsDir: string, manifest: IManifest): IFile[] {
	const files = _collectFiles([], path.resolve(process.cwd(), assetsDir), assetsDir, manifest)

	const children = fs.readdirSync(outDir);

	files.push(...children.map((filename) => ({ localPath: `${outDir}/${filename}`, path: filename })))
	files.push({ localPath: pkg.doc, path: pkg.doc })
	return files
}

function _collectFiles(files: IFile[], directory: string, baseDir: string, manifest: IManifest) {
	if (fs.existsSync(directory)) {
		const children = fs.readdirSync(directory);
		const acceptedFiles = ['.jpg', '.jpeg', '.png', '.pdf']

		children.forEach(item => {
			const filePath = path.join(directory, item);
			const stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				_collectFiles(files, filePath, baseDir, manifest);
			} else {
				const tmpBaseDir = baseDir.startsWith('./') ? baseDir.substring(2) : baseDir
				const splitted = filePath.split(tmpBaseDir)
				const rexAssetPath = `extension-store/${manifest.publisher}/${manifest.name}${splitted.pop()}`
				if (acceptedFiles.some(pattern => filePath.includes(pattern))) {
					files.push({ localPath: filePath, path: rexAssetPath });
				} else {
					console.warn(`${filePath} not included. Asset not supported. Supported assets includes: jpg, png, pdf`)
				}
			}
		});
	}

	return files;
}

