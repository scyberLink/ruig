import IAnyObject from '../../../../../common/models/IAnyObject';
import ShadowMode from '../../../application/common/ShadowMode';
import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
declare class RotatingItem extends DesignSelectionWrapperItem {
    initialBorder: string;
    constructor(style?: IAnyObject, mode?: ShadowMode);
    setSvg(svg: string): void;
    private startX;
    private startY;
    ondragstart: (event: DragEvent) => void;
    ondrag: (event: DragEvent) => void;
    onmousedown: (event: MouseEvent) => void;
}
export default RotatingItem;
