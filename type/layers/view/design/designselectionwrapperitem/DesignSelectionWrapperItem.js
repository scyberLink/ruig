import SharedConfig from '../../../../common/SharedConfig';
import { DRAWING_CANVAS } from '../../../../common/constants';
import BaseComponent from '../../application/components/base/BaseComponent';
class DesignSelectionWrapperItem extends BaseComponent {
    constructor(style, mode) {
        super(Object.assign({ position: 'absolute', border: '0', background: 'transparent' }, (style !== null && style !== void 0 ? style : {})), mode);
    }
    setWrapper(designElementWrapper) {
        this.designElementWrapper = designElementWrapper;
    }
    getWrapper() {
        return this.designElementWrapper;
    }
    getWrapped() {
        return this.designElementWrapper.getWrappedElement();
    }
    getWrappedParent() {
        return this.getWrapped().parentElement;
    }
    getDrawingCanvas() {
        return SharedConfig.get(DRAWING_CANVAS);
    }
    hide() {
        this.initialBorder = this.parentElement.style.border;
        this.parentElement.style.border = '0';
        //this.style.display = 'none'
    }
    show() {
        var _a;
        this.parentElement.style.border = (_a = this.initialBorder) !== null && _a !== void 0 ? _a : '0.5px solid red';
        //this.style.display = 'initial'
    }
}
export default DesignSelectionWrapperItem;
