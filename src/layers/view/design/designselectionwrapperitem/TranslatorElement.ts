import IAnyObject from "../../../../common/models/IAnyObject";
import ShadowMode from "../../application/common/ShadowMode";
import BaseComponent from "../../application/components/base/BaseComponent";
import DesignSelectionWrapperItem from "./DesignSelectionWrapperItem";

class TranslatorElement extends DesignSelectionWrapperItem {
    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            background: 'green',
            width: '20px',
            height: '20px',
            top: '0',
            left: '0',
            'margin-top': '-25px',
            ...(style ?? {}),
        }, mode)

        this.draggable = true

        this.setCursor('lr-distort')
    }
}

export default (TranslatorElement);