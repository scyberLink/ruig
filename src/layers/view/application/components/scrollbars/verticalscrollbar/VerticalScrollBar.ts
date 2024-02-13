import IAnyObject from "../../../../../../common/models/IAnyObject";
import BaseComponent from "../../base/BaseComponent";
import IVerticalScrollBar from "../../base/model/IVerticalScrollBar";

class VerticalScrollBar extends BaseComponent implements IVerticalScrollBar{
  constructor(style?: IAnyObject) {
    super({
      background: 'red',
      ...(style ?? {})
    });
  }
}

export default (VerticalScrollBar);