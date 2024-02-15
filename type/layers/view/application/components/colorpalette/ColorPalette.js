import BaseComponent from '../base/BaseComponent';
class ColorPalette extends BaseComponent {
    constructor(style) {
        super(Object.assign({}, (style !== null && style !== void 0 ? style : {})));
    }
}
export default ColorPalette;
