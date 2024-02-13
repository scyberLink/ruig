import IAnyObject from "../../../../../common/models/IAnyObject";
import ShadowMode from "../../../application/common/ShadowMode";
import DesignSelectionWrapperItem from "../DesignSelectionWrapperItem";

class RotatingItem extends DesignSelectionWrapperItem {

    initialBorder!: string
    dragOffsetX!: number;
    dragOffsetY!: number;

    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            ...(style ?? {}),
        }, mode)

        this.draggable = true
        this.setCursor('rotate')
    }

    // Define startX and startY variables to store the initial position of the mouse pointer
    private startX!: number;
    private startY!: number;

    ondragstart = (event: DragEvent) => {
        event.dataTransfer?.setDragImage(new Image(), 0, 0)
        this.startX = event.clientX;
        this.startY = event.clientY;
    };

    ondrag = (event: DragEvent) => {
        event.preventDefault();
        const deltaX = event.clientX - this.startX;
        const deltaY = event.clientY - this.startY;
        const angle = Math.atan2(deltaY, deltaX);
        const rotate = angle * (180 / Math.PI);
        this.getWrapped().rotate = rotate
    };

    setSvg(svg: string) {
        let img = new Image(20, 20)
        img.src = `cursor/${svg}.svg`
        this.appendChild(img)
    }
}

export default (RotatingItem);