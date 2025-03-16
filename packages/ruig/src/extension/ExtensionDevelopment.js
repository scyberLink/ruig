import { ExtensionPool } from './ExtensionPool';
class ExtensionDevelopment {
    extensionPool;
    constructor() {
        this.extensionPool = new ExtensionPool();
    }
    install(extension) {
        this.extensionPool.manualInstall({
            id: extension.getId(extension),
            rating: 0,
            downloads: 0,
            builtin: false,
        });
    }
}
export { ExtensionDevelopment };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0ZW5zaW9uRGV2ZWxvcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFeHRlbnNpb25EZXZlbG9wbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFL0MsTUFBTSxvQkFBb0I7SUFDeEIsYUFBYSxDQUFlO0lBRTVCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFBO0lBQzFDLENBQUM7SUFFRCxPQUFPLENBQUMsU0FBK0I7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7WUFDL0IsRUFBRSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQzlCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLENBQUM7WUFDWixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQUVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFBIn0=