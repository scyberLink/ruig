import RotatingItem from './RotatingItem';
class CenterRotateElement extends RotatingItem {
    constructor(style, mode) {
        super(Object.assign({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.ondrag = (event) => {
            event.preventDefault();
            const drawingCanvas = this.getWrapped();
            const x2 = Math.abs(event.clientX);
            const y2 = Math.abs(event.clientY);
            const canvasRect = drawingCanvas.getBoundingClientRect();
            const x1 = canvasRect.left;
            const y1 = canvasRect.top;
            const x = (x2 - x1 - 15) * (1 / drawingCanvas.scale);
            const y = (y2 - y1 - 15) * (1 / drawingCanvas.scale);
            this.style.left = x - this.dragOffsetX + 'px';
            this.style.top = y - this.dragOffsetY + 'px';
            event.stopPropagation();
        };
        this.ondragstart = (event) => {
            var _a;
            //event.preventDefault()
            (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setDragImage(new Image(), 0, 0);
            this.dragOffsetX = event.offsetX;
            this.dragOffsetY = event.offsetY;
            event.stopPropagation();
        };
        this.draggable = true;
        const img = new Image(20, 20);
        img.src = 'cursor/rotate.svg';
        this.appendChild(img);
        this.setCursor('grab');
    }
}
export default CenterRotateElement;
