import {
  CONTEXT_MENU,
  DRAWING_CANVAS,
  HTML_PARSER,
  RUIG_EXTENSION_INTERFACE,
  EXTENSION_POOL,
  MOUSE_MOVEMENT_ELEMENT,
} from '../../../common/constants'
import IAnyObject from '../../../common/models/IAnyObject'
import SharedConfig from '../../../common/SharedConfig'
import type ExtensionPool from '../../../extension/ExtensionPool'
import ContextItem from '../application/components/contextmenu/ContextItem'
import type ContextMenu from '../application/components/contextmenu/ContextMenu'
import { ContextConfig } from '../application/components/contextmenu/ContextSession'
import type DrawingCanvas from '../application/components/drawingcanvas/DrawingCanvas'
import MouseMovement from '../application/components/MouseMovement'
import type ParserContainer from '../application/components/ParserContainer'
import ISVG from './models/ISVG'

export const createSVGElement = (svgData: ISVG | IAnyObject) => {
  const { xmlns = 'http://www.w3.org/2000/svg', viewBox = '0 0 512 512', path } = svgData

  const svgElement = document.createElementNS(xmlns, 'svg')
  svgElement.setAttribute('viewBox', viewBox)

  const pathElement = document.createElementNS(xmlns, 'path')
  pathElement.setAttribute('d', path)

  svgElement.appendChild(pathElement)

  return svgElement
}

export const getMouseMovementElement = () => {
  const mouseMovementElement = SharedConfig.get(MOUSE_MOVEMENT_ELEMENT) as MouseMovement
  if (!mouseMovementElement) {
    console.error('mouseMovementElement', 'not yet initialize')
    return
  }

  return mouseMovementElement
}

export const getContextMenu = () => {
  const contextMenuInstance = SharedConfig.get(CONTEXT_MENU) as ContextMenu
  if (!contextMenuInstance) {
    console.error('contextMenu', 'not yet initialize')
    return
  }

  return contextMenuInstance
}

export const getDrawingCanvas = () => {
  const drawingCanvasInstance = SharedConfig.get(DRAWING_CANVAS) as DrawingCanvas
  if (!drawingCanvasInstance) {
    console.error('drawingCanvas', 'not yet initialize')
    return
  }

  return drawingCanvasInstance
}

export const getParserContainer = () => {
  const parserContainerInstance = SharedConfig.get(HTML_PARSER) as ParserContainer
  if (!parserContainerInstance) {
    console.error('parserContainer', 'not yet initialize')
    return
  }

  return parserContainerInstance
}

export const getREI = () => {
  const REIInstance = SharedConfig.get(RUIG_EXTENSION_INTERFACE)
  if (!REIInstance) {
    console.error('REI', 'not yet initialize')
    return
  }

  return REIInstance
}

export const getExtensionPool = () => {
  const extensionPoolInstance = SharedConfig.get(EXTENSION_POOL) as ExtensionPool
  if (!extensionPoolInstance) {
    console.error('extensionPool', 'not yet initialize')
    return
  }

  return extensionPoolInstance
}

export const showContextContent = async (contextItems: ContextItem[], config?: ContextConfig) => {
  const context = getContextMenu()

  if (!context) {
    return
  }

  context.showContextContent(contextItems, config)
}

export const hideContextContent = async (detachAllSession = false) => {
  const context = getContextMenu()

  if (!context) {
    return
  }

  context.hide(detachAllSession)
}

export const getMouseMovement = () => {
  const mouseMovementElement = getMouseMovementElement()

  if (!mouseMovementElement) {
    return
  }

  return mouseMovementElement.getDimension()
}
