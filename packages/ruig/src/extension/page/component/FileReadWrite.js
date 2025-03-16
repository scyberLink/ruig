import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import JSZip from 'jszip';
import { FileManagement, Table } from '../../../common/FileManagement';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { SharedConfig } from '../../../common/SharedConfig';
import { EXTENSION_POOL } from '../../../common/constants';
const FileReadWrite = () => {
    const [readyToInstall, setReadyToInstall] = useState(false);
    const [alreadyInstalled, setAlreadyInstalled] = useState(false);
    const [installed, setInstalled] = useState(false);
    const [manifest, setManifest] = useState(null);
    const [doc, setDoc] = useState('');
    const extensionPool = SharedConfig.get(EXTENSION_POOL);
    const assets = useRef([]);
    const metas = useRef([]);
    const extensionId = useRef('');
    const fileManager = new FileManagement();
    fileManager.open();
    const zip = new JSZip();
    useEffect(() => {
        return fileManager.close();
    }, []);
    const handleFileChange = async (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            reset();
            await zip.loadAsync(file);
            zip.forEach(async (relativePath, zipEntry) => {
                if (!zipEntry.dir) {
                    const name = zipEntry.name;
                    const content = await readContent(zipEntry);
                    const extension = getExtension(name);
                    if (name == 'manifest.json') {
                        const manifest = JSON.parse(content);
                        setManifest(manifest);
                        const id = `${manifest.publisher}.${manifest.name}`;
                        extensionId.current = id;
                        if (extensionPool.isInstalled(id)) {
                            setAlreadyInstalled(true);
                        }
                    }
                    if (name == 'README.md') {
                        setDoc(content);
                    }
                    if (name.includes('extension-store')) {
                        assets.current.push({ name, content, extension });
                    }
                    else {
                        metas.current.push({ name, content, extension });
                    }
                }
            });
            setReadyToInstall(true);
        }
    };
    const saveFiles = () => {
        for (const file of assets.current) {
            if (file.content) {
                fileManager.saveFile(file.name, file.content, file.extension);
            }
        }
        for (const file of metas.current) {
            if (file.content) {
                fileManager.saveFile(`${extensionId.current}/${file.name}`, file.content, file.extension, Table.METAS);
            }
        }
        ;
        extensionPool?.manualInstall({
            id: extensionId.current,
            rating: 0,
            downloads: 0,
            builtin: false,
        }, !alreadyInstalled);
        setInstalled(true);
    };
    async function readContent(zipEntry) {
        const dataType = getDataType(zipEntry.name);
        return await zip.file(zipEntry.name)?.async(dataType);
    }
    function reset() {
        setInstalled(false);
        setReadyToInstall(false);
        setAlreadyInstalled(false);
        setManifest(null);
        setDoc('');
        assets.current = [];
        metas.current = [];
    }
    const getExtension = (name) => {
        return name.split('.').pop()?.toLowerCase() || '';
    };
    const getDataType = (name) => {
        const fileExtension = getExtension(name);
        let dataType;
        // Determine data type based on file extension
        switch (fileExtension) {
            case 'txt':
            case 'html':
            case 'css':
            case 'js':
            case 'json':
            case 'svg':
                dataType = 'string'; // Text data
                break;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'pdf':
                dataType = 'blob'; // Image data
                break;
            default:
                dataType = 'string';
                break;
        }
        return dataType;
    };
    return (_jsxs("div", { children: [_jsx("input", { type: "file", onChange: handleFileChange }), _jsxs("div", { children: [_jsx("h2", { children: "Information" }), readyToInstall && !manifest ? (_jsx("h2", { style: { color: 'red' }, children: "Invalid extension package" })) : (_jsxs(_Fragment, { children: [readyToInstall && (_jsx("button", { onClick: saveFiles, disabled: installed, children: installed ? 'Installed' : alreadyInstalled ? 'ReInstall' : 'Install' })), readyToInstall && (_jsxs("div", { children: [_jsx("h1", { children: manifest.name }), _jsxs("div", { children: ["Version: ", _jsx("span", { style: { color: 'blue' }, children: manifest.version })] }), _jsxs("div", { children: ["Publisher: ", _jsx("span", { style: { color: 'blue' }, children: manifest.publisher })] }), _jsx("h3", { children: manifest.description }), _jsx("div", { children: _jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], children: doc }) })] }))] }))] })] }));
};
export { FileReadWrite };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZVJlYWRXcml0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZpbGVSZWFkV3JpdGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1REFBdUQ7QUFDdkQsT0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQzFELE9BQU8sS0FBc0IsTUFBTSxPQUFPLENBQUE7QUFDMUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUN0RSxPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUE7QUFDbEMsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUE7QUFFMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQW1CMUQsTUFBTSxhQUFhLEdBQWEsR0FBRyxFQUFFO0lBQ25DLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDM0QsTUFBTSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQy9ELE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pELE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFZLElBQVcsQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2xDLE1BQU0sYUFBYSxHQUFrQixZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBa0IsQ0FBQTtJQUN0RixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQVUsRUFBRSxDQUFDLENBQUE7SUFDbEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFVLEVBQUUsQ0FBQyxDQUFBO0lBQ2pDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUM5QixNQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFBO0lBQ3hDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNsQixNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO0lBRXZCLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDYixPQUFPLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFFTixNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxLQUEwQyxFQUFFLEVBQUU7UUFDNUUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDeEQsSUFBSSxJQUFJLEVBQUU7WUFDUixLQUFLLEVBQUUsQ0FBQTtZQUNQLE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO29CQUNqQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO29CQUMxQixNQUFNLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQkFDM0MsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUVwQyxJQUFJLElBQUksSUFBSSxlQUFlLEVBQUU7d0JBQzNCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBaUIsQ0FBQyxDQUFBO3dCQUM5QyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7d0JBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7d0JBQ25ELFdBQVcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO3dCQUN4QixJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUU7NEJBQ2pDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFBO3lCQUMxQjtxQkFDRjtvQkFFRCxJQUFJLElBQUksSUFBSSxXQUFXLEVBQUU7d0JBQ3ZCLE1BQU0sQ0FBQyxPQUFpQixDQUFDLENBQUE7cUJBQzFCO29CQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO3dCQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtxQkFDbEQ7eUJBQU07d0JBQ0wsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7cUJBQ2pEO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDRixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN4QjtJQUNILENBQUMsQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRTtRQUNyQixLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7YUFDOUQ7U0FDRjtRQUVELEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ3ZHO1NBQ0Y7UUFFRCxDQUFDO1FBQUMsYUFBK0IsRUFBRSxhQUFhLENBQzlDO1lBQ0UsRUFBRSxFQUFFLFdBQVcsQ0FBQyxPQUFPO1lBQ3ZCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLENBQUM7WUFDWixPQUFPLEVBQUUsS0FBSztTQUNmLEVBQ0QsQ0FBQyxnQkFBZ0IsQ0FDbEIsQ0FBQTtRQUVELFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUE7SUFFRCxLQUFLLFVBQVUsV0FBVyxDQUFDLFFBQXFCO1FBQzlDLE1BQU0sUUFBUSxHQUFhLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDckQsT0FBTyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsU0FBUyxLQUFLO1FBQ1osWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3hCLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzFCLFdBQVcsQ0FBQyxJQUFXLENBQUMsQ0FBQTtRQUN4QixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDVixNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNuQixLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtRQUNwQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFBO0lBQ25ELENBQUMsQ0FBQTtJQUVELE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7UUFDbkMsTUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3hDLElBQUksUUFBZ0IsQ0FBQTtRQUVwQiw4Q0FBOEM7UUFDOUMsUUFBUSxhQUFhLEVBQUU7WUFDckIsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxJQUFJLENBQUM7WUFDVixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssS0FBSztnQkFDUixRQUFRLEdBQUcsUUFBUSxDQUFBLENBQUMsWUFBWTtnQkFDaEMsTUFBSztZQUVQLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLO2dCQUNSLFFBQVEsR0FBRyxNQUFNLENBQUEsQ0FBQyxhQUFhO2dCQUMvQixNQUFLO1lBRVA7Z0JBQ0UsUUFBUSxHQUFHLFFBQVEsQ0FBQTtnQkFDbkIsTUFBSztTQUNSO1FBRUQsT0FBTyxRQUFvQixDQUFBO0lBQzdCLENBQUMsQ0FBQTtJQUVELE9BQU8sQ0FDTCwwQkFDRSxnQkFBTyxJQUFJLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsR0FBSSxFQUNqRCwwQkFDRSx1Q0FBb0IsRUFDbkIsY0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUM3QixhQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsMENBQWdDLENBQzVELENBQUMsQ0FBQyxDQUFDLENBQ0YsOEJBQ0csY0FBYyxJQUFJLENBQ2pCLGlCQUFRLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsWUFDNUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FDOUQsQ0FDVixFQUNBLGNBQWMsSUFBSSxDQUNqQiwwQkFDRSx1QkFBSyxRQUFRLENBQUMsSUFBSSxHQUFNLEVBQ3hCLHVDQUNXLGVBQU0sS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFHLFFBQVEsQ0FBQyxPQUFPLEdBQVEsSUFDOUQsRUFDTix5Q0FDYSxlQUFNLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBRyxRQUFRLENBQUMsU0FBUyxHQUFRLElBQ2xFLEVBQ04sdUJBQUssUUFBUSxDQUFDLFdBQVcsR0FBTSxFQUMvQix3QkFDRSxLQUFDLGFBQWEsSUFBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBRyxHQUFHLEdBQWlCLEdBQzVELElBQ0YsQ0FDUCxJQUNBLENBQ0osSUFDRyxJQUNGLENBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELE9BQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQSJ9