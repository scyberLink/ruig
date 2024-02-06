import IAnyObject from "../../../common/models/IAnyObject";
import BaseComponent from "../application/components/base/BaseComponent";
import IDumpElement from "./models/IDumpElement";

class DumpElement extends BaseComponent implements IDumpElement {
    constructor(style?: IAnyObject) {
        super({
          ...(style ?? {}),
        });
    }
}

export default BaseComponent.register(DumpElement as any);