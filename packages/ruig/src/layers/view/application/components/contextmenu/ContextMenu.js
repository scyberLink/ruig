import { BaseComponent } from '../base/BaseComponent';
import { ContextContentContainer } from './ContextContentContainer';
class ContextMenu extends BaseComponent {
    contextContentContainer = new ContextContentContainer();
    constructor(style) {
        super({
            background: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            border: '0',
            ...(style ?? {}),
        });
        this.toggleDisplay(true);
        this.appendChild(this.contextContentContainer);
    }
    onclick = () => {
        this.toggleDisplay(true);
        this.contextContentContainer.hide();
    };
    oncontextmenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    async showContextContent(contextItems, config) {
        this.contextContentContainer.show(contextItems, config);
        this.toggleDisplay();
    }
    async hide(detachAllSession = false) {
        this.contextContentContainer.hide(detachAllSession);
    }
}
export { ContextMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dE1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb250ZXh0TWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFFckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFJbkUsTUFBTSxXQUFZLFNBQVEsYUFBYTtJQUNyQyx1QkFBdUIsR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUE7SUFFdkQsWUFBWSxLQUFrQjtRQUM1QixLQUFLLENBQUM7WUFDSixVQUFVLEVBQUUsYUFBYTtZQUN6QixRQUFRLEVBQUUsVUFBVTtZQUNwQixHQUFHLEVBQUUsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDO1lBQ1AsTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxHQUFHO1lBQ1gsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7U0FDakIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFRCxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4QixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDckMsQ0FBQyxDQUFBO0lBRUQsYUFBYSxHQUFHLENBQUMsQ0FBUSxFQUFFLEVBQUU7UUFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUNyQixDQUFDLENBQUE7SUFFRCxLQUFLLENBQUMsa0JBQWtCLENBQUMsWUFBMkIsRUFBRSxNQUFzQjtRQUMxRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSztRQUNqQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDckQsQ0FBQztDQUNGO0FBRUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFBIn0=