import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class BottomRightElement extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ width: '5px', height: '5px', right: '0', bottom: '0' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setCursor('nwse-resize');
    }
}
export default BottomRightElement;
