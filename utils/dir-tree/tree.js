const Node=require('./node')

class Tree{
  constructor(root=null){
    this.root=root
  }

  findNode(node, condition){
    let found
    if(node.child){
      // console.log('visit node: ', node.data.url)
      if(typeof condition === 'function' && condition(node)){
        return node
      }

      for(let i=0, len=node.child.length; i<len; i++){
        // dfs traversal
        found=this.findNode(node.child[i], condition)
      }
    }
    return found
  }

  insertNode(data, child){
    let n=new Node(data, child)
    if(!this.root){
      this.root=n
      return
    }

    const matchParentUrl=data.url.slice(0, data.url.lastIndexOf('/'))
    let found=this.findNode(this.root, node=> {
      return node.child && node.data.url === matchParentUrl
    })

    found ? found.child.push(n) : this.root.child.push(n)
  }

  toJson(){
    if(this.root){
      return this.root.toJson()
    }
    return null
  }
}

module.exports={
  Tree,
  Node
}