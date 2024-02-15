import IAnyObject from '../../../../common/models/IAnyObject';
import ShadowMode from '../../application/common/ShadowMode';
import BaseComponent from '../../application/components/base/BaseComponent';
import { DC } from '../../application/components/drawingcanvas/DrawingCanvas';
import DesignElement from '../DesignElement';
import { DesignElementWrapper } from '../DesignElementSelectionWrapper';
declare class DesignSelectionWrapperItem extends BaseComponent {
    private designElementWrapper;
    initialBorder: string;
    constructor(style?: IAnyObject, mode?: ShadowMode);
    setWrapper(designElementWrapper: DesignElementWrapper): void;
    getWrapper(): DesignElementWrapper;
    getWrapped(): DesignElement;
    getWrappedParent(): HTMLElement;
    getDrawingCanvas(): DC;
    hide(): void;
    show(): void;
}
export default DesignSelectionWrapperItem;
