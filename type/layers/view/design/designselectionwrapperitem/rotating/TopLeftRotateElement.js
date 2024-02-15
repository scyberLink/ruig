import RotatingItem from './RotatingItem';
class TopLeftRotateElement extends RotatingItem {
    constructor(style, mode) {
        super(Object.assign({ top: '0', left: '0', margin: '-5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setSvg('nw-rotate');
    }
}
export default TopLeftRotateElement;
