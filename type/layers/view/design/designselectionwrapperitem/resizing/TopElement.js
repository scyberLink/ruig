import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class TopElement extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ top: '0', left: '0', right: '0', height: '5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setCursor('ns-resize');
    }
}
export default TopElement;
