import registerAnchor from './anchor'
import registerNode from './node'
import registerFlowNode from './flowNode'
import registerEdge from './edge'

export default function(G6) {
  //这里注意这几个函数的执行顺序不能错，flowNode中具体注册节点，继承node
  registerAnchor(G6)
  registerNode(G6)
  registerFlowNode(G6)
  registerEdge(G6)
}
