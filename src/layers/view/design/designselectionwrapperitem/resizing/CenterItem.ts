import SharedConfig from "../../../../../common/SharedConfig";
import { DRAWING_CANVAS } from "../../../../../common/constants";
import IAnyObject from "../../../../../common/models/IAnyObject";
import ShadowMode from "../../../application/common/ShadowMode";
import DesignSelectionWrapperItem from "../DesignSelectionWrapperItem";

class CenterElement extends DesignSelectionWrapperItem {
    initialBorder!: string
    dragOffsetX!: number;
    dragOffsetY!: number;
    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            ...(style ?? {}),
        }, mode)

        this.draggable = true

        this.setCursor('move')
    }
 
    ondrag = (event: DragEvent) => {
        event.preventDefault()
        
        const drawingCanvas = SharedConfig.get(DRAWING_CANVAS)
        const x2 = /* Math.abs */(event.clientX)
        const y2 = /* Math.abs */(event.clientY)
        const canvasRect = drawingCanvas.getBoundingClientRect();
        const x1 = canvasRect.left;
        const y1 = canvasRect.top;
        
        const x = (x2 - x1) * (1 / drawingCanvas.scale);
        const y = (y2 - y1) * (1 / drawingCanvas.scale);
        this.getWrapped().style.left = (x - this.dragOffsetX) + 'px';
        this.getWrapped().style.top = (y - this.dragOffsetY) + 'px';
    }

    ondragstart = (event: DragEvent) => {
        event.dataTransfer?.setDragImage(new Image(), 0, 0)
        this.dragOffsetX = event.offsetX
        this.dragOffsetY = event.offsetY
        this.hide();
    }

    ondragend = (event: DragEvent) => {
        this.show()
    }
    
}

export default (CenterElement);