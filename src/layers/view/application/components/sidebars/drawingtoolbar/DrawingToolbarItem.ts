import IAnyObject from "../../../../../../common/models/IAnyObject";
import DesignElementTypes from "../../../../common/DesignElementTypes";
import DesignElement from "../../../../design/DesignElement";
import ActionableIcon from "../../../common/ActionableIcon";
import BaseComponent from "../../base/BaseComponent";

class DrawingToolbarItem extends ActionableIcon {

    supportedDesignElements = DesignElementTypes.All

    action = (designElement: DesignElement) => {
        throw new Error("Method not implemented.");
    }

    constructor(style?: IAnyObject) {
        super({
            ...(style ?? {}),
            position: 'relative'
        });

    }

}

export default BaseComponent.register(DrawingToolbarItem);