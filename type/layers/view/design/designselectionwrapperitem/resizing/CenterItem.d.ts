import IAnyObject from '../../../../../common/models/IAnyObject';
import ShadowMode from '../../../application/common/ShadowMode';
import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem';
declare class CenterElement extends DesignSelectionWrapperItem {
    initialBorder: string;
    dragOffsetX: number;
    dragOffsetY: number;
    constructor(style?: IAnyObject, mode?: ShadowMode);
    ondrag: (event: DragEvent) => void;
    ondragstart: (event: DragEvent) => void;
    ondragend: (event: DragEvent) => void;
    onclick: (event: MouseEvent) => void;
    onmousedown: (event: MouseEvent) => void;
}
export default CenterElement;
