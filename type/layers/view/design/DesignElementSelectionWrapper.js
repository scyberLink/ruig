import SharedConfig from '../../../common/SharedConfig';
import { ACTIVE_ELEMENT } from '../../../common/constants';
import NullException from '../../../common/exceptions/NullException';
import BaseComponent from '../application/components/base/BaseComponent';
import ResizerElement from './designselectionwrapperitem/ResizerElement';
import RotatorElement from './designselectionwrapperitem/RotatorElement';
var DesignElementSelectionMode;
(function (DesignElementSelectionMode) {
    DesignElementSelectionMode[DesignElementSelectionMode["ROTATE"] = 0] = "ROTATE";
    DesignElementSelectionMode[DesignElementSelectionMode["RESIZE"] = 1] = "RESIZE";
})(DesignElementSelectionMode || (DesignElementSelectionMode = {}));
class DesignElementSelectionWrapper extends BaseComponent {
    constructor(style) {
        super(Object.assign({ background: 'transparent', border: '0', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, (style !== null && style !== void 0 ? style : {})));
        this.rotatorElement = new RotatorElement({
            display: 'none',
        });
        this.resizerElement = new ResizerElement();
        this.mode = DesignElementSelectionMode.RESIZE;
        this.appendChildren(this.rotatorElement, this.resizerElement);
        window.onkeydown = (event) => {
            event.preventDefault();
            const activeElement = SharedConfig.get(ACTIVE_ELEMENT);
            let moveFactor = 1;
            if (event.ctrlKey) {
                moveFactor = 5;
            }
            if (activeElement) {
                const currentTop = activeElement.offsetTop;
                const currentLeft = activeElement.offsetLeft;
                switch (event.key) {
                    case 'ArrowUp':
                        activeElement.style.top = currentTop - moveFactor + 'px';
                        break;
                    case 'ArrowDown':
                        activeElement.style.top = currentTop + moveFactor + 'px';
                        break;
                    case 'ArrowLeft':
                        activeElement.style.left = currentLeft - moveFactor + 'px';
                        break;
                    case 'ArrowRight':
                        activeElement.style.left = currentLeft + moveFactor + 'px';
                        break;
                }
            }
        };
    }
    setElementToWrap(element) {
        if (!element) {
            throw new NullException();
        }
        this.wrappedElement = element;
        this.updateSize(element);
        this.rotatorElement.setElementToWrapAndWrapper(element, this);
        this.resizerElement.setElementToWrapAndWrapper(element, this);
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
    toggleMode() {
        switch (this.mode) {
            case DesignElementSelectionMode.RESIZE:
                this.resizerElement.style.display = 'none';
                this.rotatorElement.style.display = 'initial';
                break;
            case DesignElementSelectionMode.ROTATE:
                this.rotatorElement.style.display = 'none';
                this.resizerElement.style.display = 'initial';
                break;
            default:
                break;
        }
    }
}
export { DesignElementSelectionWrapper as DesignElementWrapper };
export default DesignElementSelectionWrapper;
