import { ActionableIcon } from './ActionableIcon';
class TextIcon extends ActionableIcon {
    constructor(style, mode) {
        super({
            ...(style ?? {}),
            width: 'unset',
        }, mode);
    }
    supportedDesignElements = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action = (_designElement) => { };
    subscribe() { }
    init(init) {
        super.init(init);
        this.innerText = this.hint;
    }
}
export { TextIcon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEljb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUZXh0SWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFJakQsTUFBTSxRQUFTLFNBQVEsY0FBYztJQUNuQyxZQUFZLEtBQWtCLEVBQUUsSUFBaUI7UUFDL0MsS0FBSyxDQUNIO1lBQ0UsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDaEIsS0FBSyxFQUFFLE9BQU87U0FDZixFQUNELElBQUksQ0FDTCxDQUFBO0lBQ0gsQ0FBQztJQUVELHVCQUF1QixHQUF5QixFQUFFLENBQUE7SUFFbEQsNkRBQTZEO0lBQzdELE1BQU0sR0FBRyxDQUFDLGNBQTZCLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQTtJQUU5QyxTQUFTLEtBQUksQ0FBQztJQUVkLElBQUksQ0FBQyxJQUFpQjtRQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtJQUM1QixDQUFDO0NBQ0Y7QUFFRCxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUEifQ==