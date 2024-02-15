import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
class RotatingItem extends DesignSelectionWrapperItem {
    constructor(style, mode) {
        super(Object.assign({ width: '20px', height: '20px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.ondragstart = (event) => {
            var _a;
            //event.preventDefault()
            const img = new Image();
            img.src = 'cursor/rotate.svg';
            (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setDragImage(img, 0, 0);
            this.startX = event.clientX;
            this.startY = event.clientY;
            event.stopPropagation();
        };
        this.ondrag = (event) => {
            event.preventDefault();
            const deltaX = event.clientX - this.startX;
            const deltaY = event.clientY - this.startY;
            const angle = Math.atan2(deltaY, deltaX);
            const rotate = angle * (180 / Math.PI);
            this.getWrapped().rotate = rotate;
            event.stopPropagation();
        };
        this.onmousedown = (event) => {
            //event.preventDefault()
            event.stopPropagation();
        };
        this.draggable = true;
        this.setCursor('rotate');
    }
    setSvg(svg) {
        const img = new Image(20, 20);
        img.src = `cursor/${svg}.svg`;
        this.appendChild(img);
    }
}
export default RotatingItem;
