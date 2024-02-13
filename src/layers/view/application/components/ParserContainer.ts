import IAnyObject from "../../../../common/models/IAnyObject";
import Color from "../common/Color";
import BaseComponent from "./base/BaseComponent";
import IParserContainer from "./base/model/IParserContainer";

class ParserContainer extends BaseComponent implements IParserContainer {
  constructor(style?: IAnyObject) {
    super({
      display: 'none',
      position: 'initial',
      ...(style ?? {}),
    });
  }
}

export default (ParserContainer);