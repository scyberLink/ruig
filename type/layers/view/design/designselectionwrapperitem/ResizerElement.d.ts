import IAnyObject from '../../../../common/models/IAnyObject';
import BaseComponent from '../../application/components/base/BaseComponent';
import DesignElement from '../DesignElement';
import { DesignElementWrapper } from '../DesignElementSelectionWrapper';
declare class ResizerElement extends BaseComponent {
    private centerElement;
    private topRightElement;
    private bottomRightElement;
    private bottomLeftElement;
    private topLeftElement;
    private topElement;
    private leftElement;
    private bottomElement;
    private rightElement;
    private wrappedElement;
    private wrapper;
    initialBorder: string;
    constructor(style?: IAnyObject);
    setElementToWrapAndWrapper(element: DesignElement, wrapper: DesignElementWrapper): void;
    updateSize(element: DesignElement): void;
    getWrappedElement(): DesignElement;
}
export default ResizerElement;
