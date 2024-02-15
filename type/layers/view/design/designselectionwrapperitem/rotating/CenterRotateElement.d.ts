import IAnyObject from '../../../../../common/models/IAnyObject';
import ShadowMode from '../../../application/common/ShadowMode';
import RotatingItem from './RotatingItem';
declare class CenterRotateElement extends RotatingItem {
    initialBorder: string;
    dragOffsetX: number;
    dragOffsetY: number;
    constructor(style?: IAnyObject, mode?: ShadowMode);
    ondrag: (event: DragEvent) => void;
    ondragstart: (event: DragEvent) => void;
}
export default CenterRotateElement;
