import IAnyObject from '../../../../../common/models/IAnyObject';
import BaseComponent from '../base/BaseComponent';
import IToolBar from '../base/model/IToolBar';
declare class ToolBar extends BaseComponent implements IToolBar {
    constructor(style?: IAnyObject);
}
export default ToolBar;
