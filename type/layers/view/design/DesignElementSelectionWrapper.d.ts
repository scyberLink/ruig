import IAnyObject from '../../../common/models/IAnyObject';
import BaseComponent from '../application/components/base/BaseComponent';
import DesignElement from './DesignElement';
import IDesignElementSelectWrapper from './models/IDesignElementSelectionWrapper';
declare class DesignElementSelectionWrapper extends BaseComponent implements IDesignElementSelectWrapper {
    private rotatorElement;
    private resizerElement;
    private wrappedElement;
    private mode;
    constructor(style?: IAnyObject);
    setElementToWrap(element: DesignElement): void;
    updateSize(element: DesignElement): void;
    getWrappedElement(): DesignElement;
    toggleMode(): void;
}
export { DesignElementSelectionWrapper as DesignElementWrapper };
export default DesignElementSelectionWrapper;
