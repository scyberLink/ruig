import IAnyObject from '../../../../../common/models/IAnyObject';
import ActionableIcon from '../../common/ActionableIcon';
import ShadowMode from '../../common/ShadowMode';
import BaseComponent from '../base/BaseComponent';
import IMenuBar from '../base/model/IMenuBar';
declare class MenuBar extends BaseComponent implements IMenuBar {
    fileMenuItem: ActionableIcon;
    editMenuItem: ActionableIcon;
    viewMenuItem: ActionableIcon;
    toolMenuItem: ActionableIcon;
    constructor(style?: IAnyObject, mode?: ShadowMode);
}
export default MenuBar;
