import BaseComponent from '../application/components/base/BaseComponent';
class DumpElement extends BaseComponent {
    constructor(style) {
        super(Object.assign({}, (style !== null && style !== void 0 ? style : {})));
    }
}
export default DumpElement;
