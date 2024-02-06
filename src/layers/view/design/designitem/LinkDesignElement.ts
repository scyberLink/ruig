import { rand } from "../../../../common/md5";
import IAnyObject from "../../../../common/models/IAnyObject";
import BaseComponent from "../../application/components/base/BaseComponent";
import DesignElementTypes from "../../common/DesignElementTypes";
import DesignElement from "../DesignElement";

class LinkDesignElement extends DesignElement {
    
    type: DesignElementTypes = DesignElementTypes.LINK;
    
    constructor(style?: IAnyObject) {
        super({
            ...(style ?? {}),
            display: 'inline',
        })

        this.extendedElement.textContent = 'Link' + rand()
    }

}

export default BaseComponent.register(LinkDesignElement)