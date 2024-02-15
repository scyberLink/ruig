import IAnyObject from '../../../../../common/models/IAnyObject';
import BaseComponent from '../base/BaseComponent';
import IActionBar from '../base/model/IActionBar';
declare class ActionBar extends BaseComponent implements IActionBar {
    constructor(style?: IAnyObject);
}
export default ActionBar;
