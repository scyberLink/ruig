import IAnyObject from '../../../common/models/IAnyObject';
import BaseComponent from '../application/components/base/BaseComponent';
import IDumpElement from './models/IDumpElement';
declare class DumpElement extends BaseComponent implements IDumpElement {
    constructor(style?: IAnyObject);
}
export default DumpElement;
