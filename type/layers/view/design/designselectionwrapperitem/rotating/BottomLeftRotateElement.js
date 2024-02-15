import RotatingItem from './RotatingItem';
class BottomLeftRotateElement extends RotatingItem {
    constructor(style, mode) {
        super(Object.assign({ left: '0', bottom: '0', margin: '-5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setSvg('sw-rotate');
    }
}
export default BottomLeftRotateElement;
