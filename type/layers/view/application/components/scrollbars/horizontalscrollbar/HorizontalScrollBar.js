import BaseComponent from '../../base/BaseComponent';
class HorizontalScrollBar extends BaseComponent {
    constructor(style) {
        super(Object.assign(Object.assign({}, (style !== null && style !== void 0 ? style : {})), { background: 'gray' }));
    }
}
export default HorizontalScrollBar;
