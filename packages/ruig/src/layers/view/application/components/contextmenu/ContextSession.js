import { getMouseMovement } from '../../../common/utils';
import { BaseComponent } from '../base/BaseComponent';
class ContextSession extends BaseComponent {
    group;
    config;
    constructor(style) {
        super({
            background: 'white',
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            'border-radius': '10px',
            'max-height': '500px',
            'max-width': '400px',
            'flex-direction': 'column',
            'flex-wrap': 'nowrap',
            border: '0',
            padding: '5px 10px',
            margin: '5px 0',
            'overflow-y': 'scroll',
            'overflow-x': 'hidden',
            'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
            ...(style ?? {}),
        });
    }
    init(group, config) {
        this.config = config;
        const mouseMovement = getMouseMovement();
        this.rotate;
        this.style.transform = `translate(${(mouseMovement?.clientX || 0) - 10}px, ${(mouseMovement?.clientY || 0) + 5}px)`;
        this.appendChildren(...group);
        config?.onShow && config?.onShow();
    }
    onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
}
export { ContextSession };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dFNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb250ZXh0U2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFVckQsTUFBTSxjQUFlLFNBQVEsYUFBYTtJQUN4QyxLQUFLLENBQWU7SUFDcEIsTUFBTSxDQUFnQjtJQUV0QixZQUFZLEtBQWtCO1FBQzVCLEtBQUssQ0FBQztZQUNKLFVBQVUsRUFBRSxPQUFPO1lBQ25CLE9BQU8sRUFBRSxNQUFNO1lBQ2YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsR0FBRyxFQUFFLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQztZQUNQLGVBQWUsRUFBRSxNQUFNO1lBQ3ZCLFlBQVksRUFBRSxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLGdCQUFnQixFQUFFLFFBQVE7WUFDMUIsV0FBVyxFQUFFLFFBQVE7WUFDckIsTUFBTSxFQUFFLEdBQUc7WUFDWCxPQUFPLEVBQUUsVUFBVTtZQUNuQixNQUFNLEVBQUUsT0FBTztZQUNmLFlBQVksRUFBRSxRQUFRO1lBQ3RCLFlBQVksRUFBRSxRQUFRO1lBQ3RCLFlBQVksRUFBRSw4QkFBOEI7WUFDNUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7U0FDakIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELElBQUksQ0FBQyxLQUFtQixFQUFFLE1BQXNCO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ3BCLE1BQU0sYUFBYSxHQUFHLGdCQUFnQixFQUFFLENBQUE7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxhQUFhLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDbkgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFBO1FBQzdCLE1BQU0sRUFBRSxNQUFNLElBQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFBO0lBQ3BDLENBQUM7SUFFRCxPQUFPLEdBQUcsQ0FBQyxDQUFRLEVBQUUsRUFBRTtRQUNyQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDbEIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO0lBQ3JCLENBQUMsQ0FBQTtDQUNGO0FBRUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFBIn0=