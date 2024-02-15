import { rand } from '../../../../common/md5';
import DesignElementTypes from '../../common/DesignElementTypes';
import DesignElement from '../DesignElement';
class LinkDesignElement extends DesignElement {
    constructor(style) {
        super(Object.assign(Object.assign({}, (style !== null && style !== void 0 ? style : {})), { display: 'inline' }));
        this.type = DesignElementTypes.LINK;
        this.extendedElement.textContent = 'Link' + rand();
    }
}
export default LinkDesignElement;
