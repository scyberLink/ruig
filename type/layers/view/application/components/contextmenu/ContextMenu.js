import BaseComponent from '../base/BaseComponent';
class ContextMenu extends BaseComponent {
    constructor(style) {
        super(Object.assign({ background: 'green' }, (style !== null && style !== void 0 ? style : {})));
    }
}
export default ContextMenu;
