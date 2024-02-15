import BaseComponent from '../base/BaseComponent';
class ToolBar extends BaseComponent {
    constructor(style) {
        super(Object.assign({}, (style !== null && style !== void 0 ? style : {})));
    }
}
export default ToolBar;
