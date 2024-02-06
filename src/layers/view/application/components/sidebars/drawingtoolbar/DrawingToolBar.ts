import SharedConfig from "../../../../../../common/SharedConfig"
import { DRAWING_CANVAS, EXTENDED_TOOLS } from "../../../../../../common/constants"
import IAnyObject from "../../../../../../common/models/IAnyObject"
import { appendChildren } from "../../../../../../common/utils"
import LinkDesignElement from "../../../../design/designitem/LinkDesignElement"
import ActionableIcon from "../../../common/ActionableIcon"
import BaseComponent from "../../base/BaseComponent"
import DrawingCanvas from "../../drawingcanvas/DrawingCanvas"
import {DC} from "../../drawingcanvas/DrawingCanvas"
import DrawingToolbarItem from "./DrawingToolbarItem"

class DrawingToolBar extends BaseComponent {
  pickTool: ActionableIcon
  linkTool: ActionableIcon
  spanTool: ActionableIcon
  buttonTool: ActionableIcon
  inputTool: ActionableIcon

  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      display: 'flex',
      'flex-wrap': 'nowrap',
      'flex-direction': 'column',
      'justify-content': 'space-around',
    })
    this.pickTool = new DrawingToolbarItem({}) as ActionableIcon
    this.linkTool = new DrawingToolbarItem({}) as ActionableIcon
    this.spanTool = new DrawingToolbarItem({}) as ActionableIcon
    this.buttonTool = new DrawingToolbarItem({}) as ActionableIcon
    this.inputTool = new DrawingToolbarItem({}) as ActionableIcon

    this.pickTool.init({
      svgPathData: "M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z",
      hint: "Pick tool",
      description: "This enables selection and deselection of an object",
    })

    this.linkTool.init({
      svgPathData: "M221.5 51.7C216.6 39.8 204.9 32 192 32s-24.6 7.8-29.5 19.7l-120 288-40 96c-6.8 16.3 .9 35 17.2 41.8s35-.9 41.8-17.2L93.3 384H290.7l31.8 76.3c6.8 16.3 25.5 24 41.8 17.2s24-25.5 17.2-41.8l-40-96-120-288zM264 320H120l72-172.8L264 320z",
      hint: "Link tool",
      description: "Draw a link object",
    })

    this.spanTool.init({
      svgPathData: "M99.1 105.4C79 114 68.2 127.2 65.2 144.8c-2.4 14.1-.7 23.2 2 29.4c2.8 6.3 7.9 12.4 16.7 18.6c19.2 13.4 48.3 22.1 84.9 32.5c1 .3 1.9 .6 2.9 .8c32.7 9.3 72 20.6 100.9 40.7c15.7 10.9 29.9 25.5 38.6 45.1c8.8 19.8 10.8 42 6.6 66.3c-7.3 42.5-35.3 71.7-71.8 87.3c-35.4 15.2-79.1 17.9-123.7 10.9l-.2 0 0 0c-24-3.9-62.7-17.1-87.6-25.6c-4.8-1.7-9.2-3.1-12.8-4.3C5.1 440.8-3.9 422.7 1.6 405.9s23.7-25.8 40.5-20.3c4.9 1.6 10.2 3.4 15.9 5.4c25.4 8.6 56.4 19.2 74.4 22.1c36.8 5.7 67.5 2.5 88.5-6.5c20.1-8.6 30.8-21.8 33.9-39.4c2.4-14.1 .7-23.2-2-29.4c-2.8-6.3-7.9-12.4-16.7-18.6c-19.2-13.4-48.3-22.1-84.9-32.5c-1-.3-1.9-.6-2.9-.8c-32.7-9.3-72-20.6-100.9-40.7c-15.7-10.9-29.9-25.5-38.6-45.1c-8.8-19.8-10.8-42-6.6-66.3l31.5 5.5L2.1 133.9C9.4 91.4 37.4 62.2 73.9 46.6c35.4-15.2 79.1-17.9 123.7-10.9c13 2 52.4 9.6 66.6 13.4c17.1 4.5 27.2 22.1 22.7 39.2s-22.1 27.2-39.2 22.7c-11.2-3-48.1-10.2-60.1-12l4.9-31.5-4.9 31.5c-36.9-5.8-67.5-2.5-88.6 6.5z",
      hint: "Span tool",
      description: "Draw a span object",
    })

    this.buttonTool.init({
      svgPathData: "M64 32C28.7 32 0 60.7 0 96V256 416c0 35.3 28.7 64 64 64H192c70.7 0 128-57.3 128-128c0-46.5-24.8-87.3-62-109.7c18.7-22.3 30-51 30-82.3c0-70.7-57.3-128-128-128H64zm96 192H64V96h96c35.3 0 64 28.7 64 64s-28.7 64-64 64zM64 288h96 32c35.3 0 64 28.7 64 64s-28.7 64-64 64H64V288z",
      hint: "Button tool",
      description: "Draw a button object",
    })

    this.inputTool.init({
      svgPathData: "M32 32C14.3 32 0 46.3 0 64S14.3 96 32 96h96V416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H288c17.7 0 32-14.3 32-32s-14.3-32-32-32H192V96h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H160 32z",
      hint: "Input tool",
      description: "Draw an input object",
    })

    this.linkTool.action = () => {
      
      let canvas: DC = SharedConfig.get(DRAWING_CANVAS);
      
      canvas.addDesignElement(new LinkDesignElement({width: '100px', height: '10px', background: 'green'}))
      
    }

    


    appendChildren(this,
      this.pickTool,
      this.linkTool,
      this.spanTool,
      this.buttonTool,
      this.inputTool,
    )

    if (SharedConfig.has(EXTENDED_TOOLS)) {
      let tools = SharedConfig.get(EXTENDED_TOOLS)
      if (Array.isArray(tools)) {
        for (const tool of tools) {
          appendChildren(this, tool)
        }
      } else {
        appendChildren(this, tools)
      }
    }

  }
}

export default BaseComponent.register(DrawingToolBar)