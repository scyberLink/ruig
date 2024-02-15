import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class BottomElement extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ bottom: '0', left: '0', right: '0', height: '5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setCursor('ns-resize');
    }
}
export default BottomElement;
