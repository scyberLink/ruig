import IAnyObject from '../../../../../common/models/IAnyObject';
import BaseComponent from '../base/BaseComponent';
import IObjectManagerSelector from '../base/model/IObjectManagerSelector';
declare class ObjectManagerSelector extends BaseComponent implements IObjectManagerSelector {
    constructor(style?: IAnyObject);
}
export default ObjectManagerSelector;
