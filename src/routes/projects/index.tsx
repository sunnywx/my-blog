import {h} from 'preact'
import {useEffect} from "preact/hooks";
import useLock from "./use-lock";

import style from './index.scss'

type Props = {
  className?: string;
}

function Projects(props: Props) {
  useEffect(()=> {
    document.title = 'Projects | sunnywang'
  }, [])

  const [loading, data, handler] = useLock(()=> {
    return fetch('/projects.json')
      .then(res=> res.json())
      .then(d=> {
        console.log('resp: ', d)
      })
  })

  return (
    <div className={style.wrap}>
      <button onClick={handler as any}>{loading ? 'loading..' : 'send request'}</button>
    </div>
  );
}

export default Projects;