import IAnyObject from '../../../../common/models/IAnyObject';
import DesignElementTypes from '../../common/DesignElementTypes';
import DesignElement from '../../design/DesignElement';
import BaseComponent from '../components/base/BaseComponent';
import IAction, { IActionInit } from './IAction';
import ShadowMode from './ShadowMode';
declare abstract class ActionableIcon extends BaseComponent implements IAction {
    constructor(style?: IAnyObject, mode?: ShadowMode);
    svgPathData: string;
    hint: string;
    description: string;
    init(init: IActionInit): void;
    enable(): void;
    disable(): void;
    abstract supportedDesignElements: DesignElementTypes | DesignElementTypes[];
    action: (designElement: DesignElement) => void;
    subscribe(): void;
    disableCheck(ev: any): void;
    enableCheck(ev: any): void;
    isTypeSupported(type?: DesignElementTypes): boolean;
    onclick: (event: MouseEvent) => void;
}
export default ActionableIcon;
