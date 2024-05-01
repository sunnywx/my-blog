asyncify any func
==

将任意函数异步化

```js
function asyncify(fn){
  let orig_fn=fn
  let intv=setTimeout(function (){
      intv=null
      if(fn) fn()
    }, 0)
  
  fn=null
  
  return function (){
    if(intv){
      // settimeout has not fired
      fn=orig_fn.bind.call(orig_fn, [this].concat([].slice.call(arguments)))
    } else {
      // timeout has fired, direct call orig fn
      orig_fn.apply(this, arguments)
    }
  }
  
}
```