import IAnyObject from '../../../../../common/models/IAnyObject';
import BaseComponent from '../base/BaseComponent';
import IContextMenu from '../base/model/IContextMenu';
declare class ContextMenu extends BaseComponent implements IContextMenu {
    constructor(style?: IAnyObject);
}
export default ContextMenu;
