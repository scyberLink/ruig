import IAnyObject from "../../../../common/models/IAnyObject";
import Color from "../common/Color";
import BaseComponent from "./base/BaseComponent";

class ParserContainer extends BaseComponent {
  constructor(style?: IAnyObject) {
    super({
      display: 'none',
      position: 'initial',
      ...(style ?? {}),
    });
  }
}

export default BaseComponent.register(ParserContainer);