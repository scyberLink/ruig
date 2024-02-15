import TextIcon from '../../common/TextIcon';
import BaseComponent from '../base/BaseComponent';
class MenuBar extends BaseComponent {
    constructor(style, mode) {
        super(Object.assign({ display: 'flex', overflow: 'hidden' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.fileMenuItem = new TextIcon({
            position: 'relative',
        });
        this.editMenuItem = new TextIcon({
            position: 'relative',
        });
        this.viewMenuItem = new TextIcon({
            position: 'relative',
        });
        this.toolMenuItem = new TextIcon({
            position: 'relative',
        });
        this.fileMenuItem.init({ hint: 'File', description: '', svgPathData: '' });
        this.editMenuItem.init({ hint: 'Edit', description: '', svgPathData: '' });
        this.viewMenuItem.init({ hint: 'View', description: '', svgPathData: '' });
        this.toolMenuItem.init({ hint: 'Tool', description: '', svgPathData: '' });
        this.appendChildren(this.fileMenuItem, this.editMenuItem, this.viewMenuItem, this.toolMenuItem);
    }
}
export default MenuBar;
