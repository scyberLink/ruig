import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class TopLeftElement extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ top: '0', left: '0', width: '5px', height: '5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setCursor('nwse-resize');
    }
}
export default TopLeftElement;
