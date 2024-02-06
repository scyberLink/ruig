import IAnyObject from "../../../../../common/models/IAnyObject";
import BaseComponent from "../base/BaseComponent";

class ObjectManagerSelector extends BaseComponent {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {})
    });
  }
}

export default BaseComponent.register(ObjectManagerSelector);