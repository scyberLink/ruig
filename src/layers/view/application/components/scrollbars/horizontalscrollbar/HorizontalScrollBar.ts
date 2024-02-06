import IAnyObject from "../../../../../../common/models/IAnyObject";
import BaseComponent from "../../base/BaseComponent";

class HorizontalScrollBar extends BaseComponent {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      background: 'gray',
    });
  }
}

export default BaseComponent.register(HorizontalScrollBar);