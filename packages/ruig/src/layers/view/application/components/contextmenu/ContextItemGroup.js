/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseComponent } from '../base/BaseComponent';
class ContextItemGroup extends BaseComponent {
    constructor() {
        super({
            position: 'initial',
            background: 'transparent',
            margin: '5px 0',
            border: '0',
            'border-color': 'gray',
            'border-top': '1px solid',
            'border-bottom': '1px solid',
        });
        this.hovered({ borderColor: 'blue' });
    }
    init(groupName, ...contextItems) {
        this.title = groupName;
        this.appendChildren(...contextItems);
    }
}
export { ContextItemGroup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dEl0ZW1Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvbnRleHRJdGVtR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsdURBQXVEO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUdyRCxNQUFNLGdCQUFpQixTQUFRLGFBQWE7SUFDMUM7UUFDRSxLQUFLLENBQUM7WUFDSixRQUFRLEVBQUUsU0FBUztZQUNuQixVQUFVLEVBQUUsYUFBYTtZQUN6QixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxHQUFHO1lBQ1gsY0FBYyxFQUFFLE1BQU07WUFDdEIsWUFBWSxFQUFFLFdBQVc7WUFDekIsZUFBZSxFQUFFLFdBQVc7U0FDN0IsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLENBQUMsU0FBaUIsRUFBRSxHQUFHLFlBQTJCO1FBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0NBQ0Y7QUFFRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQSJ9