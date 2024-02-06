import IAnyObject from "../../../../../common/models/IAnyObject";
import Color from "../../common/Color";
import BaseComponent from "../base/BaseComponent";

class ConsoleCanvas extends BaseComponent {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    });
  }
}

export default BaseComponent.register(ConsoleCanvas);