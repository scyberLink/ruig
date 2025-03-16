/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseComponent } from '../base/BaseComponent';
class ContextItem extends BaseComponent {
    groupName = 'Miscellenous';
    constructor() {
        super({
            position: 'initial',
            background: 'transparent',
            overflow: 'hidden',
            'max-height': '500px',
            //'min-height': '20px',
            'max-width': '500px',
            //'min-width': '100px',
            border: '0',
            margin: '20px 0',
        });
    }
    init(htmlInstance, groupName) {
        this.groupName = groupName || this.groupName;
        this.appendChild(htmlInstance);
    }
}
export { ContextItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dEl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb250ZXh0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1REFBdUQ7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFBO0FBRXJELE1BQU0sV0FBWSxTQUFRLGFBQWE7SUFDckMsU0FBUyxHQUFHLGNBQWMsQ0FBQTtJQUUxQjtRQUNFLEtBQUssQ0FBQztZQUNKLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFlBQVksRUFBRSxPQUFPO1lBQ3JCLHVCQUF1QjtZQUN2QixXQUFXLEVBQUUsT0FBTztZQUNwQix1QkFBdUI7WUFDdkIsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUUsUUFBUTtTQUNqQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsSUFBSSxDQUFDLFlBQWdDLEVBQUUsU0FBa0I7UUFDdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2hDLENBQUM7Q0FDRjtBQUVELE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQSJ9