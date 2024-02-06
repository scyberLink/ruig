import IAnyObject from "../../../../../common/models/IAnyObject";
import BaseComponent from "../base/BaseComponent";

class ContextMenu extends BaseComponent {
    constructor(style?: IAnyObject) {
        super({
            background: 'green',
            ...(style ?? {})
        });
    }
}

export default BaseComponent.register(ContextMenu);