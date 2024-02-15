import DesignElementTypes from '../../../../common/DesignElementTypes';
import ActionableIcon from '../../../common/ActionableIcon';
class DrawingToolbarItem extends ActionableIcon {
    constructor(style) {
        super(Object.assign(Object.assign({}, (style !== null && style !== void 0 ? style : {})), { position: 'relative' }));
        this.supportedDesignElements = DesignElementTypes.All;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.action = (designElement) => {
            throw new Error('Method not implemented.');
        };
    }
}
export default DrawingToolbarItem;
