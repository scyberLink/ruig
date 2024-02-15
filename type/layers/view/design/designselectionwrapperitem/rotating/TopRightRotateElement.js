import RotatingItem from './RotatingItem';
class TopRightRotateElement extends RotatingItem {
    constructor(style, mode) {
        super(Object.assign({ top: '0', right: '0', margin: '-5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setSvg('ne-rotate');
    }
}
export default TopRightRotateElement;
