import { showContextContent } from '../../../common/utils';
import { Tool } from '../../common/Tool';
class MenuBarItem extends Tool {
    contextItems = [];
    constructor(style) {
        super({
            width: 'unset',
            ...(style ?? {}),
            position: 'relative',
        });
    }
    addItems(...items) {
        this.contextItems.push(...items.filter(Boolean));
    }
    activate = async () => {
        showContextContent(this.contextItems, { onHide: () => this.disable() });
    };
}
export { MenuBarItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudUJhckl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNZW51QmFySXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUMxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFHeEMsTUFBTSxXQUFZLFNBQVEsSUFBSTtJQUM1QixZQUFZLEdBQWtCLEVBQUUsQ0FBQTtJQUVoQyxZQUFZLEtBQWtCO1FBQzVCLEtBQUssQ0FBQztZQUNKLEtBQUssRUFBRSxPQUFPO1lBQ2QsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDaEIsUUFBUSxFQUFFLFVBQVU7U0FDckIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFHLEtBQW9CO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFFRCxRQUFRLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDcEIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3pFLENBQUMsQ0FBQTtDQUNGO0FBRUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFBIn0=