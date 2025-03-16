/* eslint-disable @typescript-eslint/no-explicit-any */
import { openDB } from 'idb';
var FileManagementMode;
(function (FileManagementMode) {
    FileManagementMode["READONLY"] = "readonly";
    FileManagementMode["READWRITE"] = "readwrite";
})(FileManagementMode || (FileManagementMode = {}));
export var Table;
(function (Table) {
    Table["METAS"] = "metas";
    Table["ASSETS"] = "assets";
})(Table || (Table = {}));
class FileManagement {
    db = null;
    async open() {
        this.db = await openDB(this.DATABASE, this.DATABASE_VERSION, {
            upgrade: (db) => {
                db.createObjectStore(Table.ASSETS, { keyPath: this.KEYPATH });
                db.createObjectStore(Table.METAS, { keyPath: this.KEYPATH });
            },
        });
    }
    async saveFile(fileName, fileContent, type, table = Table.ASSETS) {
        try {
            const tx = this.db.transaction(table, FileManagementMode.READWRITE);
            const store = tx.objectStore(table);
            const mime = this.getMime(type);
            store.put({ fileName, file: { mime, type, fileContent } });
            await tx.done;
        }
        catch (error) {
            console.error('Error saving file:', error);
        }
    }
    getMime(extension) {
        switch (extension) {
            case 'txt':
                return 'text/plain';
            case 'html':
                return 'text/html';
            case 'css':
                return 'text/css';
            case 'js':
                return 'text/javascript';
            case 'json':
                return 'application/json';
            case 'svg':
                return 'image/svg+xml';
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            case 'pdf':
                return 'application/pdf';
            default:
                return 'application/octet-stream';
        }
    }
    async getFile(fileName, table = Table.ASSETS) {
        try {
            const tx = this.db.transaction(table, FileManagementMode.READONLY);
            const store = tx.objectStore(table);
            const { file } = (await store.get(fileName)) || { file: null };
            await tx.done;
            return file;
        }
        catch (error) {
            console.error('Error retrieving:', error);
            return null;
        }
    }
    close() {
        this.db?.close();
    }
    KEYPATH = 'fileName';
    DATABASE = 'ExtensionStore';
    DATABASE_VERSION = 1;
}
export { FileManagement };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZU1hbmFnZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGaWxlTWFuYWdlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1REFBdUQ7QUFDdkQsT0FBTyxFQUFnQixNQUFNLEVBQUUsTUFBTSxLQUFLLENBQUE7QUFFMUMsSUFBSyxrQkFHSjtBQUhELFdBQUssa0JBQWtCO0lBQ3JCLDJDQUFxQixDQUFBO0lBQ3JCLDZDQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFISSxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBR3RCO0FBRUQsTUFBTSxDQUFOLElBQVksS0FHWDtBQUhELFdBQVksS0FBSztJQUNmLHdCQUFlLENBQUE7SUFDZiwwQkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsS0FBSyxLQUFMLEtBQUssUUFHaEI7QUFFRCxNQUFNLGNBQWM7SUFDbEIsRUFBRSxHQUEwQixJQUFXLENBQUE7SUFFdkMsS0FBSyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzNELE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO2dCQUNkLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO2dCQUM3RCxFQUFFLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtZQUM5RCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBZ0IsRUFBRSxXQUEwQixFQUFFLElBQVksRUFBRSxRQUFlLEtBQUssQ0FBQyxNQUFNO1FBQ3BHLElBQUk7WUFDRixNQUFNLEVBQUUsR0FBRyxJ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