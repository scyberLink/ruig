import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class TopRightElement extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ top: '0', right: '0', width: '5px', height: '5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setCursor('nesw-resize');
    }
}
export default TopRightElement;
