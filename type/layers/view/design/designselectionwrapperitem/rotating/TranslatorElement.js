import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class TranslatorElement extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ background: 'green', width: '20px', height: '20px', top: '0', left: '0', 'margin-top': '-25px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.draggable = true;
        this.setCursor('lr-distort');
    }
}
export default TranslatorElement;
