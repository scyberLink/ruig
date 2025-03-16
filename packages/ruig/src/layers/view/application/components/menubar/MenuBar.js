import { BaseComponent } from '../base/BaseComponent';
import { ContextItem } from '../contextmenu/ContextItem';
import { MenuBarItem } from './MenuBarItem';
class MenuBar extends BaseComponent {
    menuItems;
    constructor(style, mode) {
        super({
            display: 'flex',
            overflow: 'hidden',
            ...(style ?? {}),
        }, mode);
        const fileMenuItem = new MenuBarItem();
        const editMenuItem = new MenuBarItem();
        const viewMenuItem = new MenuBarItem();
        const toolMenuItem = new MenuBarItem();
        fileMenuItem.init({ hint: 'File', description: '', svgPathData: '' });
        editMenuItem.init({ hint: 'Edit', description: '', svgPathData: '' });
        viewMenuItem.init({ hint: 'View', description: '', svgPathData: '' });
        toolMenuItem.init({ hint: 'Tool', description: '', svgPathData: '' });
        this.menuItems = { fileMenuItem, editMenuItem, viewMenuItem, toolMenuItem };
        const items = new Array(10).fill(0).map((_, i) => {
            const item = new ContextItem();
            const span = document.createElement('div');
            span.innerText = 'This is context item ' + i;
            span.onclick = () => alert(span.innerText);
            item.init(span, 'First Group');
            return item;
        });
        const items1 = new Array(10).fill(0).map((_, i) => {
            const item = new ContextItem();
            item.init(document.createTextNode('This is context item ' + i), 'Second Group');
            return item;
        });
        fileMenuItem.addItems(...items);
        editMenuItem.addItems(...items1);
        this.appendChildren(...Object.values(this.menuItems));
    }
    getFileMenu() {
        return this.menuItems['fileMenuItem'];
    }
    getEditMenu() {
        return this.menuItems['editMenuItem'];
    }
    getViewMenu() {
        return this.menuItems['viewMenuItem'];
    }
    getToolMenu() {
        return this.menuItems['toolMenuItem'];
    }
}
export { MenuBar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudUJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1lbnVCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFBO0FBRXJELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRTNDLE1BQU0sT0FBUSxTQUFRLGFBQWE7SUFDakMsU0FBUyxDQUF5QztJQUVsRCxZQUFZLEtBQWtCLEVBQUUsSUFBaUI7UUFDL0MsS0FBSyxDQUNIO1lBQ0UsT0FBTyxFQUFFLE1BQU07WUFDZixRQUFRLEVBQUUsUUFBUTtZQUNsQixHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztTQUNqQixFQUNELElBQUksQ0FDTCxDQUFBO1FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQTtRQUN0QyxNQUFNLFlBQVksR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBO1FBQ3RDLE1BQU0sWUFBWSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUE7UUFDdEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQTtRQUV0QyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ3JFLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDckUsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNyRSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRXJFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQTtRQUUzRSxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9DLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUE7WUFDOUIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLHVCQUF1QixHQUFHLENBQUMsQ0FBQTtZQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUE7WUFDOUIsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQTtZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUE7WUFDL0UsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDLENBQUMsQ0FBQTtRQUVGLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQTtRQUMvQixZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUE7UUFFaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUNGO0FBRUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFBIn0=