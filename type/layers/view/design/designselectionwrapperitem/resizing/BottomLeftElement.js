import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class BottomLeftElement extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ width: '5px', height: '5px', left: '0', bottom: '0' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setCursor('nesw-resize');
    }
}
export default BottomLeftElement;
