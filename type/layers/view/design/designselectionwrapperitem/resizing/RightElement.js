import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class RightElement extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ right: '0', top: '0', bottom: '0', width: '5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setCursor('ew-resize');
    }
}
export default RightElement;
