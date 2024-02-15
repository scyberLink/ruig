import IAnyObject from '../../../../common/models/IAnyObject';
import BaseComponent from '../../application/components/base/BaseComponent';
import DesignElement from '../DesignElement';
import { DesignElementWrapper } from '../DesignElementSelectionWrapper';
declare class RotatorElement extends BaseComponent {
    private centerRotateElement;
    private topRightRotateElement;
    private bottomRightRotateElement;
    private bottomLeftRotateElement;
    private topLeftRotateElement;
    private wrappedElement;
    private wrapper;
    initialBorder: string;
    constructor(style?: IAnyObject);
    setElementToWrapAndWrapper(element: DesignElement, wrapper: DesignElementWrapper): void;
    updateSize(element: DesignElement): void;
    getWrappedElement(): DesignElement;
}
export default RotatorElement;
