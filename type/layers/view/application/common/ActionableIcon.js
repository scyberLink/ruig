/* eslint-disable @typescript-eslint/no-explicit-any */
import SharedConfig from '../../../../common/SharedConfig';
import { ACTIVE_ELEMENT, EVENT_DATA, EVENT_DESELECT, EVENT_SELECT } from '../../../../common/constants';
import DesignElementTypes from '../../common/DesignElementTypes';
import { createSVGElement } from '../../common/utils';
import BaseComponent from '../components/base/BaseComponent';
import Color from './Color';
class ActionableIcon extends BaseComponent {
    constructor(style, mode) {
        super(Object.assign({ width: '18px', height: '18px', border: '0', padding: '1px 2px', 'border-radius': '5px' }, (style !== null && style !== void 0 ? style : {})), mode);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.action = (designElement) => { };
        this.onclick = (event) => {
            event === null || event === void 0 ? void 0 : event.preventDefault();
            const activeElement = SharedConfig.get(ACTIVE_ELEMENT);
            this.action(activeElement);
        };
        this.hovered({
            background: `${Color.lightBlue}`,
        });
        this.setCursor('pointer');
        this.subscribe();
    }
    init(init) {
        const { svgPathData, hint, description } = init;
        this.svgPathData = svgPathData;
        this.hint = hint;
        this.description = description;
        const svg = createSVGElement({ path: this.svgPathData });
        this.appendChild(svg);
        this.title = this.hint;
    }
    enable() {
        this.disabled = false;
    }
    disable() {
        this.disabled = true;
    }
    subscribe() {
        window.addEventListener(EVENT_DESELECT, this.disableCheck);
        window.addEventListener(EVENT_SELECT, this.enableCheck);
        this.setAttribute('title', this.hint);
        //this.addClassNames(this.fontAwesomeSolidIcon, this.icon.includes(this.fontAwesome) ? this.icon : `${this.fontAwesome}${this.icon}`, this.fontAwesomeXtraSmallIcon)
    }
    /* notFontAwesomeIcon() {
          this.removeClassNames(this.fontAwesomeSolidIcon, `${this.fontAwesome}*`)
          this.addClassNames(this.icon)
      } */
    disableCheck(ev) {
        ev === null || ev === void 0 ? void 0 : ev.preventDefault();
        this.disable();
    }
    enableCheck(ev) {
        ev === null || ev === void 0 ? void 0 : ev.preventDefault();
        const { [EVENT_DATA]: designElement } = ev === null || ev === void 0 ? void 0 : ev.detail;
        if (designElement) {
            const designType = designElement.type;
            if (this.isTypeSupported(designType)) {
                return this.enable();
            }
        }
        this.disable();
    }
    isTypeSupported(type) {
        if (this.supportedDesignElements == DesignElementTypes.All) {
            return true;
        }
        for (const designType of this.supportedDesignElements) {
            if (designType === type) {
                return true;
            }
        }
        return false;
    }
}
export default ActionableIcon;
