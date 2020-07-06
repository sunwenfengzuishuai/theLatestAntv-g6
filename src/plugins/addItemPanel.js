// const deepMix = require('@antv/util/lib/deep-mix')
// const each = require('@antv/util/lib/each')
//const createDOM = require('@antv/util/lib/dom/create-dom')
import { createDom } from '@antv/dom-util'
import { deepMix, each } from '@antv/util'
class AddItemPanel {
  constructor(cfgs) {
    this._cfgs = deepMix(this.getDefaultCfg(), cfgs)
  }
  getDefaultCfg() {
    return { container: null }
  }

  get(key) {
    return this._cfgs[key]
  }
  set(key, val) {
    this._cfgs[key] = val
  }

  initPlugin(graph) {
    const parentNode = this.get('container')
    const ghost = createDom(
      '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' +
        ' style="opacity:0"/>'
    )
    const children = parentNode.querySelectorAll(
      'div.ant-collapse-item>div.ant-collapse-content>.ant-collapse-content-box>img[data-item]'
    )
    console.log(children)
    each(children, (child) => {
      const addModel = new Function('return ' + child.getAttribute('data-item'))()
      child.addEventListener('dragstart', (e) => {
        e.dataTransfer.setDragImage(ghost, 0, 0)
        graph.set('addNodeDragging', true)
        graph.set('addModel', addModel)
        console.log(addModel)
      })
      child.addEventListener('dragend', (e) => {
        graph.emit('canvas:mouseup', e)
        graph.set('addNodeDragging', false)
        graph.set('addModel', null)
        console.log(e)
      })
    })
  }

  destroy() {
    this.get('canvas').destroy()
    const container = this.get('container')
    container.parentNode.removeChild(container)
  }
}

export default AddItemPanel
