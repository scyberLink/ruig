import { MAX_Z_INDEX } from '../../../../common/constants';
import NullException from '../../../../common/exceptions/NullException';
import BaseComponent from '../../application/components/base/BaseComponent';
import BottomElement from './resizing/BottomElement';
import BottomLeftElement from './resizing/BottomLeftElement';
import BottomRightElement from './resizing/BottomRightElement';
import CenterItem from './resizing/CenterItem';
import RightElement from './resizing/RightElement';
import LeftElement from './resizing/LeftElement';
import TopElement from './resizing/TopElement';
import TopLeftElement from './resizing/TopLeftElement';
import TopRightElement from './resizing/TopRightElement';
class ResizerElement extends BaseComponent {
    constructor(style) {
        super(Object.assign(Object.assign({ background: 'transparent', border: '0.5px solid red', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, (style !== null && style !== void 0 ? style : {})), { 'z-index': MAX_Z_INDEX }));
        this.centerElement = new CenterItem();
        this.topRightElement = new TopRightElement();
        this.bottomRightElement = new BottomRightElement();
        this.bottomLeftElement = new BottomLeftElement();
        this.topLeftElement = new TopLeftElement();
        this.topElement = new TopElement();
        this.leftElement = new LeftElement();
        this.bottomElement = new BottomElement();
        this.rightElement = new RightElement();
        this.appendChildren(this.centerElement, this.topElement, this.leftElement, this.bottomElement, this.rightElement, this.topRightElement, this.bottomLeftElement, this.bottomRightElement, this.topLeftElement);
    }
    setElementToWrapAndWrapper(element, wrapper) {
        if (!element) {
            throw new NullException();
        }
        this.wrappedElement = element;
        this.wrapper = wrapper;
        this.updateSize(element);
        this.topRightElement.setWrapper(wrapper);
        this.bottomRightElement.setWrapper(wrapper);
        this.bottomLeftElement.setWrapper(wrapper);
        this.topLeftElement.setWrapper(wrapper);
        this.topElement.setWrapper(wrapper);
        this.leftElement.setWrapper(wrapper);
        this.bottomElement.setWrapper(wrapper);
        this.rightElement.setWrapper(wrapper);
        this.centerElement.setWrapper(wrapper);
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
export default ResizerElement;
