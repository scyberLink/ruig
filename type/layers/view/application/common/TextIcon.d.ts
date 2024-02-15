import IAnyObject from '../../../../common/models/IAnyObject';
import DesignElementTypes from '../../common/DesignElementTypes';
import DesignElement from '../../design/DesignElement';
import ActionableIcon from './ActionableIcon';
import { IActionInit } from './IAction';
import ShadowMode from './ShadowMode';
declare class TextIcon extends ActionableIcon {
    constructor(style?: IAnyObject, mode?: ShadowMode);
    supportedDesignElements: DesignElementTypes[];
    action: (_designElement: DesignElement) => void;
    subscribe(): void;
    init(init: IActionInit): void;
}
export default TextIcon;
