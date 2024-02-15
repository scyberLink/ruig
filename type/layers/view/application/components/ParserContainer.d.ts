import IAnyObject from '../../../../common/models/IAnyObject';
import BaseComponent from './base/BaseComponent';
import IParserContainer from './base/model/IParserContainer';
declare class ParserContainer extends BaseComponent implements IParserContainer {
    constructor(style?: IAnyObject);
}
export default ParserContainer;
