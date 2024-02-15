import SharedConfig from '../../../../../common/SharedConfig';
import { DRAWING_CANVAS } from '../../../../../common/constants';
import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class CenterElement extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ top: '0', left: '0', bottom: '0', right: '0' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.ondrag = (event) => {
            event.preventDefault();
            const drawingCanvas = SharedConfig.get(DRAWING_CANVAS);
            const x2 = Math.abs(event.clientX);
            const y2 = Math.abs(event.clientY);
            const canvasRect = drawingCanvas.getBoundingClientRect();
            const x1 = canvasRect.left;
            const y1 = canvasRect.top;
            const x = (x2 - x1) * (1 / drawingCanvas.scale);
            const y = (y2 - y1) * (1 / drawingCanvas.scale);
            // Calculate the boundaries of the canvas
            const canvasWidth = drawingCanvas.offsetWidth;
            const canvasHeight = drawingCanvas.offsetHeight;
            const childWidth = this.getWrapped().offsetWidth;
            const childHeight = this.getWrapped().offsetHeight;
            // Ensure the child element does not go outside the canvas
            const newX = Math.min(Math.max(x - this.dragOffsetX, 0), canvasWidth - childWidth);
            const newY = Math.min(Math.max(y - this.dragOffsetY, 0), canvasHeight - childHeight);
            this.getWrapped().style.left = `${newX}px`;
            this.getWrapped().style.top = `${newY}px`;
            event.stopPropagation();
        };
        this.ondragstart = (event) => {
            var _a;
            //event.preventDefault()
            (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setDragImage(new Image(), 0, 0);
            this.dragOffsetX = event.offsetX;
            this.dragOffsetY = event.offsetY;
            this.hide();
            //event.stopPropagation()
        };
        this.ondragend = (event) => {
            event.preventDefault();
            this.show();
            event.stopPropagation();
        };
        this.onclick = (event) => {
            event.preventDefault();
            this.getWrapper().toggleMode();
            event.stopPropagation();
        };
        this.onmousedown = (event) => {
            //event.preventDefault()
            event.stopPropagation();
        };
        this.draggable = true;
        this.setCursor('move');
    }
}
export default CenterElement;
