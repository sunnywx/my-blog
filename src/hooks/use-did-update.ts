import {useEffect, useRef} from 'preact/hooks'

export default function useDidUpdate(cb, deps) {
  const didMount = useRef(false)

  useEffect(() => {
    if (!didMount.current) {
      didMount.current=true
    } else {
      cb()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps])
}