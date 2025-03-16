/* eslint-disable @typescript-eslint/no-explicit-any */
import { SharedConfig } from '../../../../../common/SharedConfig';
import { HTML_PARSER, MIN_Z_INDEX, SAVED_DESIGN } from '../../../../../common/constants';
import { NullException } from '../../../../../common/exceptions/NullException';
import { spreadTo } from '../../../../../common/utils';
import { DesignElement } from '../../../design/base/DesignElement';
import { BaseComponent } from '../base/BaseComponent';
export var DesignMode;
(function (DesignMode) {
    DesignMode[DesignMode["PREVIEWING"] = 0] = "PREVIEWING";
    DesignMode[DesignMode["DESIGNING"] = 1] = "DESIGNING";
})(DesignMode || (DesignMode = {}));
class DrawingCanvas extends BaseComponent {
    initDelayedTimeout = 2000;
    saveInterval = 20000;
    hasInit = false;
    mode = DesignMode.PREVIEWING;
    designElements = [];
    constructor(style) {
        super({
            ...(style ?? {}),
            background: 'transparent',
            overflow: 'none',
            transition: `transform 100ms ease-in-out`,
            'z-index': MIN_Z_INDEX,
        });
        this.init = this.init.bind(this);
        this.save = this.save.bind(this);
        this.initDelayed();
    }
    initDelayed() {
        this.innerHTML = `
<style>
.loader {
  background: #000;
  background: radial-gradient(#222, #000);
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
}

.loader-inner {
  bottom: 0;
  height: 60px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}

.loader-line-wrap {
  animation: 
  spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite
;
  box-sizing: border-box;
  height: 50px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform-origin: 50% 100%;
  width: 100px;
}
.loader-line {
  border: 4px solid transparent;
  border-radius: 100%;
  box-sizing: border-box;
  height: 100px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}
.loader-line-wrap:nth-child(1) { animation-delay: -50ms; }
.loader-line-wrap:nth-child(2) { animation-delay: -100ms; }
.loader-line-wrap:nth-child(3) { animation-delay: -150ms; }
.loader-line-wrap:nth-child(4) { animation-delay: -200ms; }
.loader-line-wrap:nth-child(5) { animation-delay: -250ms; }

.loader-line-wrap:nth-child(1) .loader-line {
  border-color: hsl(0, 80%, 60%);
  height: 90px;
  width: 90px;
  top: 7px;
}
.loader-line-wrap:nth-child(2) .loader-line {
  border-color: hsl(60, 80%, 60%);
  height: 76px;
  width: 76px;
  top: 14px;
}
.loader-line-wrap:nth-child(3) .loader-line {
  border-color: hsl(120, 80%, 60%);
  height: 62px;
  width: 62px;
  top: 21px;
}
.loader-line-wrap:nth-child(4) .loader-line {
  border-color: hsl(180, 80%, 60%);
  height: 48px;
  width: 48px;
  top: 28px;
}
.loader-line-wrap:nth-child(5) .loader-line {
  border-color: hsl(240, 80%, 60%);
  height: 34px;
  width: 34px;
  top: 35px;
}

@keyframes spin {
  0%, 15% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<div class="loader">
  <div class="loader-inner">
    <div class="loader-line-wrap">
      <div class="loader-line"></div>
    </div>
    <div class="loader-line-wrap">
      <div class="loader-line"></div>
    </div>
    <div class="loader-line-wrap">
      <div class="loader-line"></div>
    </div>
    <div class="loader-line-wrap">
      <div class="loader-line"></div>
    </div>
    <div class="loader-line-wrap">
      <div class="loader-line"></div>
    </div>
  </div>
</div>    

    `;
        this.init();
        const intervalID = setInterval(() => {
            if (this.hasInit) {
                this.refreshCanvas();
                setInterval(this.save, this.saveInterval);
                clearInterval(intervalID);
            }
        }, this.initDelayedTimeout);
        setTimeout(this.init, this.initDelayedTimeout);
    }
    init() {
        const savedDesignElements = this.getSaved();
        const parser = SharedConfig.get(HTML_PARSER);
        if (!parser) {
            this.hasInit = true;
            return;
        }
        const parsed = parser.parse(savedDesignElements);
        for (const element of parsed) {
            this.makeDesignElement(element);
        }
        this.designElements = [...parsed];
        this.hasInit = true;
    }
    getSaved() {
        const savedDesignElements = SharedConfig.getLocalData(SAVED_DESIGN) || '';
        return savedDesignElements;
    }
    save() {
        SharedConfig.setLocalData(SAVED_DESIGN, this.innerHTML);
    }
    activateDesignMode() {
        for (let i = 0; i < this.children.length; i++) {
            const child = this.designElements[i];
            if (child && !(child instanceof DesignElement)) {
                this.designElements[i] = new DesignElement(child);
            }
        }
        this.mode = DesignMode.DESIGNING;
        this.refreshCanvas();
    }
    refreshCanvas() {
        this.innerHTML = '';
        super.appendChildren(...this.designElements);
    }
    activatePreviewMode() {
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.item(i);
            if (child instanceof DesignElement) {
                const originalChild = child.childNodes[0];
                if (originalChild && this.contains(child)) {
                    this.replaceChild(originalChild, child);
                }
            }
        }
        this.mode = DesignMode.PREVIEWING;
        this.refreshCanvas();
    }
    addDesignElement(element, position) {
        if (!element) {
            throw NullException;
        }
        const { x, y } = position || { x: 1, y: 1, metric: 'px' };
        element.style &&
            spreadTo(element.style, {
                top: `${y}${position?.metric || 'px'}`,
                left: `${x}${position?.metric || 'px'}`,
            });
        element = this.makeDesignElement(element);
        super.appendChild(element);
        return element;
    }
    makeDesignElement(element) {
        if (!(element instanceof DesignElement)) {
            return new DesignElement(element, this);
        }
        return element;
    }
    append(...nodes) {
        for (const node of nodes) {
            if (typeof node == 'string') {
                const parser = SharedConfig.get(HTML_PARSER);
                const parsed = parser.parse(node);
                for (const element of parsed) {
                    this.addDesignElement(element);
                }
            }
            else {
                this.addDesignElement(node);
            }
        }
    }
    appendChild(node) {
        return this.addDesignElement(node);
    }
    appendChildren(...children) {
        for (const child of children) {
            this.addDesignElement(child);
        }
    }
    onkeydown = (e) => {
        if (e.ctrlKey || e.key == 's') {
            e.preventDefault();
            this.save();
        }
    };
    /* ondrop = (event: DragEvent) => {
      event.preventDefault();
      let element =  SharedConfig.get(ACTIVE_ELEMENT) as HTMLElement
      if (!element) {
        return;
      }
      const thisRect: DOMRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const x = event.clientX - thisRect.left;
      const y = event.clientY - thisRect.top;
      element!.style.left = x + 'px';
      element!.style.top = y + 'px';
    }
   */
    addEventToDesignElement(eventName, listener) {
        for (const designElement of this.designElements) {
            designElement.addEventListener(eventName, listener);
        }
    }
}
export { DrawingCanvas };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhd2luZ0NhbnZhcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkRyYXdpbmdDYW52YXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsdURBQXVEO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQTtBQUNqRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQTtBQUN4RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0RBQWdELENBQUE7QUFFOUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQTtBQUVsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFJckQsTUFBTSxDQUFOLElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNwQix1REFBVSxDQUFBO0lBQ1YscURBQVMsQ0FBQTtBQUNYLENBQUMsRUFIVyxVQUFVLEtBQVYsVUFBVSxRQUdyQjtBQUVELE1BQU0sYUFBYyxTQUFRLGFBQWE7SUFDdkMsa0JBQWtCLEdBQUcsSUFBSSxDQUFBO0lBQ3pCLFlBQVksR0FBRyxLQUFLLENBQUE7SUFDcEIsT0FBTyxHQUFHLEtBQUssQ0FBQTtJQUNmLElBQUksR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFBO0lBQzVCLGNBQWMsR0FBb0IsRUFBRSxDQUFBO0lBRXBDLFlBQVksS0FBYztRQUN4QixLQUFLLENBQUM7WUFDSixHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNoQixVQUFVLEVBQUUsYUFBYTtZQUN6QixRQUFRLEVBQUUsTUFBTTtZQUNoQixVQUFVLEVBQUUsNkJBQTZCO1lBQ3pDLFNBQVMsRUFBRSxXQUFXO1NBQ3ZCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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