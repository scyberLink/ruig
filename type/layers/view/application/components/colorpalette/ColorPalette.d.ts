import IAnyObject from '../../../../../common/models/IAnyObject';
import BaseComponent from '../base/BaseComponent';
import IColorPalette from '../base/model/IColorPalette';
declare class ColorPalette extends BaseComponent implements IColorPalette {
    constructor(style?: IAnyObject);
}
export default ColorPalette;
