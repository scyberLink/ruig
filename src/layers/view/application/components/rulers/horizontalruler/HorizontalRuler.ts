import IAnyObject from "../../../../../../common/models/IAnyObject";
import BaseComponent from "../../base/BaseComponent";
import IHorizontalRuler from "../../base/model/IHorizontalRuler";

class HorizontalRuler extends BaseComponent implements IHorizontalRuler {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    });
  }
}

export default (HorizontalRuler);