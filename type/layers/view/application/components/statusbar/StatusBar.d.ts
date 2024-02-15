import IAnyObject from '../../../../../common/models/IAnyObject';
import BaseComponent from '../base/BaseComponent';
import IStatusBar from '../base/model/IStatusBar';
declare class StatusBar extends BaseComponent implements IStatusBar {
    constructor(style?: IAnyObject);
}
export default StatusBar;
