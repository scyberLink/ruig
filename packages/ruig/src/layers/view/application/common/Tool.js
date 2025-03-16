/* eslint-disable @typescript-eslint/no-explicit-any */
import { SharedConfig } from '../../../../common/SharedConfig';
import { ACTIVE_TOOL } from '../../../../common/constants';
import { createSVGElement } from '../../common/utils';
import { BaseComponent } from '../components/base/BaseComponent';
import { Color } from './Color';
class Tool extends BaseComponent {
    active = false;
    initialBackgroundColor = 'initial';
    constructor(style, mode) {
        super({
            position: 'relative',
            width: '18px',
            height: '18px',
            border: '0',
            padding: '1px 2px',
            'border-radius': '5px',
            ...(style ?? {}),
        }, mode);
        this.hovered({
            background: `${Color.lightBlue}`,
        });
        this.setCursor('pointer');
    }
    svgPathData;
    hint;
    description;
    deactivate;
    enable() {
        this.initialBackgroundColor = this.style.background;
        this.style.background = 'blue';
        this.active = true;
    }
    disable() {
        this.style.background = this.initialBackgroundColor;
        this.active = false;
    }
    init(init) {
        const { svgPathData, hint, description, deactivate, activate } = init;
        this.svgPathData = svgPathData || this.svgPathData;
        this.hint = hint || this.hint;
        this.description = description || this.description;
        this.deactivate = deactivate || this.deactivate;
        this.activate = activate || this.activate;
        if (this.svgPathData) {
            const svg = createSVGElement({ path: this.svgPathData });
            this.appendChild(svg);
            this.title = this.hint;
        }
        else {
            this.innerHTML = this.hint;
        }
    }
    onclick = (event) => {
        event?.preventDefault();
        const previousActiveTool = SharedConfig.get(ACTIVE_TOOL);
        previousActiveTool?.disable();
        previousActiveTool?.deactivate && previousActiveTool?.deactivate();
        this.activate && this.activate();
        this.enable();
        SharedConfig.set(ACTIVE_TOOL, this);
    };
    activate;
}
export { Tool };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsdURBQXVEO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUE7QUFFMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFBO0FBQ2hFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFXL0IsTUFBZSxJQUFLLFNBQVEsYUFBYTtJQUN2QyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ2Qsc0JBQXNCLEdBQVcsU0FBUyxDQUFBO0lBRTFDLFlBQVksS0FBa0IsRUFBRSxJQUFpQjtRQUMvQyxLQUFLLENBQ0g7WUFDRSxRQUFRLEVBQUUsVUFBVTtZQUNwQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxPQUFPLEVBQUUsU0FBUztZQUNsQixlQUFlLEVBQUUsS0FBSztZQUN0QixHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztTQUNqQixFQUNELElBQUksQ0FDTCxDQUFBO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFVBQVUsRUFBRSxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUU7U0FDakMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRUQsV0FBVyxDQUFTO0lBQ3BCLElBQUksQ0FBUztJQUNiLFdBQVcsQ0FBUztJQUNwQixVQUFVLENBQVk7SUFFdEIsTUFBTTtRQUNKLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQTtRQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUE7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUE7UUFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDckIsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFlO1FBQ2xCLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3JFLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFBO1FBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUE7UUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQTtRQUN6QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7WUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtTQUMzQjtJQUNILENBQUM7SUFFRCxPQUFPLEdBQUcsQ0FBQyxLQUFpQixFQUFFLEVBQUU7UUFDOUIsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFBO1FBQ3ZCLE1BQU0sa0JBQWtCLEdBQVMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQVEsQ0FBQTtRQUNyRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQTtRQUM3QixrQkFBa0IsRUFBRSxVQUFVLElBQUksa0JBQWtCLEVBQUUsVUFBVSxFQUFFLENBQUE7UUFDbEUsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDckMsQ0FBQyxDQUFBO0lBRUQsUUFBUSxDQUFzQjtDQUMvQjtBQUVELE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQSJ9