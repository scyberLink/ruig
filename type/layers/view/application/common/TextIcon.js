import ActionableIcon from './ActionableIcon';
class TextIcon extends ActionableIcon {
    constructor(style, mode) {
        super(Object.assign(Object.assign({}, (style !== null && style !== void 0 ? style : {})), { width: 'unset' }), mode);
        this.supportedDesignElements = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.action = (_designElement) => { };
    }
    subscribe() { }
    init(init) {
        super.init(init);
        this.innerText = this.hint;
    }
}
export default TextIcon;
