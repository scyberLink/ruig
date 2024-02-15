import IAnyObject from '../../../../common/models/IAnyObject';
import DesignElementTypes from '../../common/DesignElementTypes';
import DesignElement from '../DesignElement';
declare class LinkDesignElement extends DesignElement {
    type: DesignElementTypes;
    constructor(style?: IAnyObject);
}
export default LinkDesignElement;
