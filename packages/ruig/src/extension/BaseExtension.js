import { NullException } from '../common/exceptions/NullException';
import { ExtensionPool } from './ExtensionPool';
class BaseExtension {
    appContainer;
    pool;
    constructor(appContainer) {
        this.appContainer = appContainer;
        this.pool = new ExtensionPool(this.appContainer);
        this.init();
    }
    static extensionAuthor;
    static extensionName;
    static getId(extension) {
        if (!(extension.prototype instanceof BaseExtension)) {
            throw new Error(`Class does not extend BaseExtension`);
        }
        if (!extension.extensionAuthor || !extension.extensionName) {
            throw new NullException(`You have not defined either extensionAuthor or extensionName`);
        }
        return `${extension.extensionAuthor}.${extension.extensionName}`;
    }
    start() { }
    install() { }
    enable() { }
    disable() { }
    upgrade() { }
    enableAutoUpgrade() { }
    disableAutoUpgrade() { }
}
export { BaseExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJhc2VFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFBO0FBRWxFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUUvQyxNQUFlLGFBQWE7SUFDMUIsWUFBWSxDQUFnQjtJQUM1QixJQUFJLENBQWU7SUFFbkIsWUFBWSxZQUE0QjtRQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTtRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNoRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDYixDQUFDO0lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBUTtJQUM5QixNQUFNLENBQUMsYUFBYSxDQUFRO0lBRTVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBK0I7UUFDMUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsWUFBWSxhQUFhLENBQUMsRUFBRTtZQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUE7U0FDdkQ7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUU7WUFDMUQsTUFBTSxJQUFJLGFBQWEsQ0FBQyw4REFBOEQsQ0FBQyxDQUFBO1NBQ3hGO1FBRUQsT0FBTyxHQUFHLFNBQVMsQ0FBQyxlQUFlLElBQUksU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ2xFLENBQUM7SUFJRCxLQUFLLEtBQUksQ0FBQztJQUVWLE9BQU8sS0FBSSxDQUFDO0lBRVosTUFBTSxLQUFJLENBQUM7SUFFWCxPQUFPLEtBQUksQ0FBQztJQUVaLE9BQU8sS0FBSSxDQUFDO0lBRVosaUJBQWlCLEtBQUksQ0FBQztJQUV0QixrQkFBa0IsS0FBSSxDQUFDO0NBQ3hCO0FBRUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFBIn0=