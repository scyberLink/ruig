import BaseComponent from '../base/BaseComponent';
class TabPane extends BaseComponent {
    constructor(style) {
        super(Object.assign({ background: 'red' }, (style !== null && style !== void 0 ? style : {})));
    }
}
export default TabPane;
