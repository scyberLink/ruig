import IAnyObject from "../../../../../../common/models/IAnyObject";
import BaseComponent from "../../base/BaseComponent";

class VerticalScrollBar extends BaseComponent {
  constructor(style?: IAnyObject) {
    super({
      background: 'red',
      ...(style ?? {})
    });
  }
}

export default BaseComponent.register(VerticalScrollBar);