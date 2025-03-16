import { BaseComponent } from './base/BaseComponent';
class MouseMovement extends BaseComponent {
    clientX = 0;
    clientY = 0;
    screenX = 0;
    screenY = 0;
    constructor(style) {
        super({
            ...(style ?? {}),
            position: 'fixed',
            bottom: 0,
            right: 0,
        });
        const coordinate = document.createElement('span');
        window.onmousemove = (event) => {
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            this.screenX = event.screenX;
            this.screenY = event.screenY;
        };
        this.appendChildren(coordinate);
    }
    getDimension() {
        return {
            clientX: this.clientX,
            clientY: this.clientY,
            screenX: this.screenX,
            screenY: this.screenY,
        };
    }
}
export { MouseMovement };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW91c2VNb3ZlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1vdXNlTW92ZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBSXBELE1BQU0sYUFBYyxTQUFRLGFBQWE7SUFDdkMsT0FBTyxHQUFXLENBQUMsQ0FBQTtJQUNuQixPQUFPLEdBQVcsQ0FBQyxDQUFBO0lBQ25CLE9BQU8sR0FBVyxDQUFDLENBQUE7SUFDbkIsT0FBTyxHQUFXLENBQUMsQ0FBQTtJQUVuQixZQUFZLEtBQWtCO1FBQzVCLEtBQUssQ0FBQztZQUNKLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2hCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7U0FDVCxDQUFDLENBQUE7UUFDRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRWpELE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUE7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFBO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQTtZQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUE7UUFDOUIsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQUVELE9BQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQSJ9