import IAnyObject from '../../../../../../common/models/IAnyObject';
import DesignElementTypes from '../../../../common/DesignElementTypes';
import DesignElement from '../../../../design/DesignElement';
import ActionableIcon from '../../../common/ActionableIcon';
declare class DrawingToolbarItem extends ActionableIcon {
    supportedDesignElements: DesignElementTypes;
    action: (designElement: DesignElement) => never;
    constructor(style?: IAnyObject);
}
export default DrawingToolbarItem;
