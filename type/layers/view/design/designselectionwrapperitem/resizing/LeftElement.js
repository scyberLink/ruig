import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class LeftElement extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ left: '0', top: '0', bottom: '0', width: '5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setCursor('ew-resize');
    }
}
export default LeftElement;
