import { BaseComponent } from '../../base/BaseComponent';
class DrawingToolBar extends BaseComponent {
    constructor(style) {
        super({
            ...(style ?? {}),
            display: 'flex',
            'flex-wrap': 'nowrap',
            'flex-direction': 'column',
            'justify-content': 'space-around',
        });
    }
    appendChildren(...children) {
        super.appendChildren(...children);
    }
}
export { DrawingToolBar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhd2luZ1Rvb2xCYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEcmF3aW5nVG9vbEJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFLeEQsTUFBTSxjQUFlLFNBQVEsYUFBYTtJQUN4QyxZQUFZLEtBQWM7UUFDeEIsS0FBSyxDQUFDO1lBQ0osR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDaEIsT0FBTyxFQUFFLE1BQU07WUFDZixXQUFXLEVBQUUsUUFBUTtZQUNyQixnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLGlCQUFpQixFQUFFLGNBQWM7U0FDbEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGNBQWMsQ0FBQyxHQUFHLFFBQThCO1FBQzlDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0NBQ0Y7QUFFRCxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUEifQ==