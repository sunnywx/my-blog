class Node{
  constructor(data, child=null){
    this.data=data
    this.child=child
  }

  toJson(){
    if(this.child === null){
      return {...this.data}
    }
    return {
      ...this.data,
      child: this.mapChild()
    }
  }

  mapChild(){
    return this.child.map(c=> {
      return this.toJson.call(c)
    })
  }
}

module.exports=Node