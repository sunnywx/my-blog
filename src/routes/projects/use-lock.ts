import {useEffect, useState, useCallback} from "preact/hooks";

function useLock<T extends (...args: any[])=> Promise<any> | undefined | void>(effect){
  const [loading, setLoading]=useState(false)
  const [data, setData]=useState(null)  // response data
  let clicked=false
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handler=useCallback<T>((...args: any[])=> {
    if(loading) return
    // call effect
    setLoading(true)

    if(!clicked){
      clicked=true

      return new Promise((resolve, reject)=> {
        setTimeout(()=> {
          const res=effect.call()
          resolve(res)
          // setData(res)
          setLoading(false)
          clicked=false
        }, 1000)
      })
    }


  }, [])

  // useEffect(()=> {
  //   handler()
  // }, [loading])

  return [loading, data, handler]
}

export default useLock