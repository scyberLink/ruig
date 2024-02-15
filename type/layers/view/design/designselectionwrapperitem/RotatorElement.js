import { MAX_Z_INDEX } from '../../../../common/constants';
import NullException from '../../../../common/exceptions/NullException';
import BaseComponent from '../../application/components/base/BaseComponent';
import BottomLeftRotateElement from './rotating/BottomLeftRotateElement';
import BottomRightRotateElement from './rotating/BottomRightRotateElement';
import CenterRotateElement from './rotating/CenterRotateElement';
import TopLeftRotateElement from './rotating/TopLeftRotateElement';
import TopRightRotateElement from './rotating/TopRightRotateElement';
class RotatorElement extends BaseComponent {
    constructor(style) {
        super(Object.assign(Object.assign({ display: 'none', background: 'transparent', border: '0', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, (style !== null && style !== void 0 ? style : {})), { 'z-index': MAX_Z_INDEX }));
        this.centerRotateElement = new CenterRotateElement();
        this.topRightRotateElement = new TopRightRotateElement();
        this.bottomRightRotateElement = new BottomRightRotateElement();
        this.bottomLeftRotateElement = new BottomLeftRotateElement();
        this.topLeftRotateElement = new TopLeftRotateElement();
        this.appendChildren(this.topRightRotateElement, this.bottomLeftRotateElement, this.bottomRightRotateElement, this.topLeftRotateElement, this.centerRotateElement);
    }
    setElementToWrapAndWrapper(element, wrapper) {
        if (!element) {
            throw new NullException();
        }
        this.wrappedElement = element;
        this.wrapper = wrapper;
        this.updateSize(element);
        this.topRightRotateElement.setWrapper(wrapper);
        this.bottomRightRotateElement.setWrapper(wrapper);
        this.bottomLeftRotateElement.setWrapper(wrapper);
        this.topLeftRotateElement.setWrapper(wrapper);
        this.centerRotateElement.setWrapper(wrapper);
    }
    updateSize(element) {
        const width = element.clientWidth;
        const height = element.clientHeight;
        this.style.width = width + 15 + 'px';
        this.style.height = height + 15 + 'px';
    }
    getWrappedElement() {
        return this.wrappedElement;
    }
}
export default RotatorElement;
