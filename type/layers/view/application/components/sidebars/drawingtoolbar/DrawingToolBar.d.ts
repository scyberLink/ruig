import IAnyObject from '../../../../../../common/models/IAnyObject';
import ActionableIcon from '../../../common/ActionableIcon';
import BaseComponent from '../../base/BaseComponent';
import IDrawingToolBar from '../../base/model/IDrawingToolBar';
declare class DrawingToolBar extends BaseComponent implements IDrawingToolBar {
    pickTool: ActionableIcon;
    linkTool: ActionableIcon;
    spanTool: ActionableIcon;
    buttonTool: ActionableIcon;
    inputTool: ActionableIcon;
    constructor(style?: IAnyObject);
}
export default DrawingToolBar;
