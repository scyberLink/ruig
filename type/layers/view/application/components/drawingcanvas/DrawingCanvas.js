import SharedConfig from '../../../../../common/SharedConfig';
import { ACTIVE_ELEMENT, MIN_Z_INDEX } from '../../../../../common/constants';
import NullException from '../../../../../common/exceptions/NullException';
import { spreadTo } from '../../../../../common/utils';
import BaseComponent from '../base/BaseComponent';
class DrawingCanvas extends BaseComponent {
    constructor(style) {
        super(Object.assign(Object.assign({}, (style !== null && style !== void 0 ? style : {})), { 'z-index': MIN_Z_INDEX }));
        this.onclick = (event) => {
            event.preventDefault();
            const element = SharedConfig.get(ACTIVE_ELEMENT);
            element === null || element === void 0 ? void 0 : element.deselect();
        };
    }
    /* connectedCallback() {
    } */
    addDesignElement(element, position) {
        if (!element) {
            throw NullException;
        }
        const { x, y } = position || { x: 10, y: 10, metric: 'px' };
        spreadTo(element.style, {
            position: 'absolute',
            top: `${y}${(position === null || position === void 0 ? void 0 : position.metric) || 'px'}`,
            left: `${x}${(position === null || position === void 0 ? void 0 : position.metric) || 'px'}`,
        });
        this.appendChildren(element);
        return element;
    }
}
export { DrawingCanvas as DC };
export default DrawingCanvas;
