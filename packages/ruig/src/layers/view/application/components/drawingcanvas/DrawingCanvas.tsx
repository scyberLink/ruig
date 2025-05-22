/* eslint-disable @typescript-eslint/no-explicit-any */
import { SharedConfig } from '../../../../../common/SharedConfig'
import { HTML_PARSER, MIN_Z_INDEX, SAVED_DESIGN } from '../../../../../common/constants'
import { NullException } from '../../../../../common/exceptions/NullException'
import { IPosition } from '../../../../../common/models/IPosition'
import { spreadTo } from '../../../../../common/utils'
import { DesignElement } from '../../../design/base/DesignElement'
import { Color } from '../../common/Color'
import { ParserContainer } from '../ParserContainer'
import { BaseComponent } from '../base/BaseComponent'
import { IDrawingCanvas } from '../base/model/IDrawingCanvas'
import { IStyle } from '../base/model/IStyle'

export enum DesignMode {
  PREVIEWING,
  DESIGNING,
}

class DrawingCanvasManager extends BaseComponent implements IDrawingCanvas {
  initDelayedTimeout = 2000
  saveInterval = 20000
  hasInit = false
  mode = DesignMode.PREVIEWING
  designElements: DesignElement[] = []

  constructor(style?: IStyle) {
    super({
      ...(style ?? {}),
      background: 'transparent',
      overflow: 'none',
      transition: `transform 100ms ease-in-out`,
      'z-index': MIN_Z_INDEX,
    })
    this.init = this.init.bind(this)
    this.save = this.save.bind(this)
    this.initDelayed()
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

    `
    this.init()
    const intervalID = setInterval(() => {
      if (this.hasInit) {
        this.refreshCanvas()
        setInterval(this.save, this.saveInterval)
        clearInterval(intervalID)
      }
    }, this.initDelayedTimeout)
    setTimeout(this.init, this.initDelayedTimeout)
  }

  init() {
    const savedDesignElements = this.getSaved()
    const parser = SharedConfig.get(HTML_PARSER) as ParserContainer
    if (!parser) {
      this.hasInit = true
      return
    }
    const parsed = parser.parse(savedDesignElements)
    for (const element of parsed) {
      this.makeDesignElement(element)
    }
    this.designElements = [...(parsed as DesignElement[])]
    this.hasInit = true
  }

  getSaved() {
    const savedDesignElements: string = (SharedConfig.getLocalData(SAVED_DESIGN) as string) || ''
    return savedDesignElements
  }

  save() {
    SharedConfig.setLocalData(SAVED_DESIGN, this.innerHTML)
  }

  activateDesignMode() {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.designElements[i]
      if (child && !(child instanceof DesignElement)) {
        this.designElements[i] = new DesignElement(child)
      }
    }
    this.mode = DesignMode.DESIGNING
    this.refreshCanvas()
  }

  private refreshCanvas() {
    this.innerHTML = ''
    super.appendChildren(...this.designElements)
  }

  activatePreviewMode() {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children.item(i)
      if (child instanceof DesignElement) {
        const originalChild = child.childNodes[0] as HTMLElement
        if (originalChild && this.contains(child)) {
          this.replaceChild(originalChild, child)
        }
      }
    }
    this.mode = DesignMode.PREVIEWING
    this.refreshCanvas()
  }

  addDesignElement(element: HTMLElement, position?: IPosition) {
    if (!element) {
      throw NullException
    }

    const { x, y } = position || { x: 1, y: 1, metric: 'px' }

    element.style &&
      spreadTo(element.style, {
        top: `${y}${position?.metric || 'px'}`,
        left: `${x}${position?.metric || 'px'}`,
      })

    element = this.makeDesignElement(element)

    super.appendChild(element)

    return element
  }

  makeDesignElement(element: HTMLElement | DesignElement) {
    if (!(element instanceof DesignElement)) {
      return new DesignElement(element, this)
    }
    return element
  }

  append(...nodes: (string | Node)[]): void {
    for (const node of nodes) {
      if (typeof node == 'string') {
        const parser = SharedConfig.get(HTML_PARSER) as ParserContainer
        const parsed = parser.parse(node)
        for (const element of parsed) {
          this.addDesignElement(element)
        }
      } else {
        this.addDesignElement(node as HTMLElement)
      }
    }
  }

  appendChild<T extends Node>(node: T): T {
    return this.addDesignElement(node as unknown as HTMLElement) as unknown as T
  }

  appendChildren(...children: HTMLElement[]): void {
    for (const child of children) {
      this.addDesignElement(child)
    }
  }

  onkeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.key == 's') {
      e.preventDefault()
      this.save()
    }
  }

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

  addEventToDesignElement(eventName: string, listener: (e: Event) => any) {
    for (const designElement of this.designElements) {
      designElement.addEventListener(eventName, listener)
    }
  }
}

import Reblend from 'reblendjs'

async function DrawingCanvas({ style }: { style: ReblendTyping.CSSProperties }) {
  await new Promise((resolve) => setTimeout(resolve, 10000))

  return (
    <div
      style={{
        ...(style ?? {}),
        background: 'transparent',
        border: `0.5px solid ${Color.ash}`,
        overflow: 'none',
        transition: `transform 100ms ease-in-out`,
        zIndex: MIN_Z_INDEX,
      }}
    >
      DrawingCanvas
    </div>
  )
}

export { DrawingCanvasManager, DrawingCanvas }
