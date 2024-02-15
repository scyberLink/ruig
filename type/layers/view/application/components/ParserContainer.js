import BaseComponent from './base/BaseComponent';
class ParserContainer extends BaseComponent {
    constructor(style) {
        super(Object.assign({ display: 'none', position: 'initial' }, (style !== null && style !== void 0 ? style : {})));
    }
}
export default ParserContainer;
