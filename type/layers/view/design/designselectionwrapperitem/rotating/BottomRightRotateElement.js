import RotatingItem from './RotatingItem';
class BottomRightRotateElement extends RotatingItem {
    constructor(style, mode) {
        super(Object.assign({ right: '0', bottom: '0', margin: '-5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        this.setSvg('se-rotate');
    }
}
export default BottomRightRotateElement;
