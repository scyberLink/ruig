/* eslint-disable @typescript-eslint/no-explicit-any */
import { SharedConfig } from '../../../../common/SharedConfig';
import { ACTIVE_ELEMENT, DESIGN_ELEMENT_EVENT_DATA, EVENT_DESELECT, EVENT_SELECT } from '../../../../common/constants';
import { DesignElementTypes } from '../../common/DesignElementTypes';
import { createSVGElement } from '../../common/utils';
import { BaseComponent } from '../components/base/BaseComponent';
import { Color } from './Color';
class ActionableIcon extends BaseComponent {
    constructor(style, mode) {
        super({
            position: 'relative',
            width: '18px',
            height: '18px',
            border: '0',
            padding: '1px 2px',
            'border-radius': '5px',
            ...(style ?? {}),
        }, mode);
        this.hovered({
            background: `${Color.lightBlue}`,
        });
        this.setCursor('pointer');
        this.subscribe();
    }
    svgPathData;
    hint;
    description;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action = (designElement) => { };
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
        ev?.preventDefault();
        this.disable();
    }
    enableCheck(ev) {
        ev?.preventDefault();
        const { [DESIGN_ELEMENT_EVENT_DATA]: designElement } = ev?.detail;
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
    onclick = (event) => {
        event?.preventDefault();
        const activeElement = SharedConfig.get(ACTIVE_ELEMENT);
        this.action(activeElement);
    };
}
export { ActionableIcon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uYWJsZUljb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBY3Rpb25hYmxlSWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1REFBdUQ7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFBO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUseUJBQXlCLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBRXRILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFBO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBRXJELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQTtBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBSS9CLE1BQWUsY0FBZSxTQUFRLGFBQWE7SUFDakQsWUFBWSxLQUFrQixFQUFFLElBQWlCO1FBQy9DLEtBQUssQ0FDSDtZQUNFLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsR0FBRztZQUNYLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1NBQ2pCLEVBQ0QsSUFBSSxDQUNMLENBQUE7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsVUFBVSxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRTtTQUNqQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXpCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBRUQsV0FBVyxDQUFTO0lBQ3BCLElBQUksQ0FBUztJQUNiLFdBQVcsQ0FBUztJQUVwQixJQUFJLENBQUMsSUFBaUI7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