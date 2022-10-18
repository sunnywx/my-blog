import {h} from 'preact'
import {useEffect, useState} from "preact/hooks";

import style from './index.scss'

type Props = {
  className?: string;
}

type TTag={
  [key: string]: Array<{u: string, t: string}>
}

function Tags(props: Props) {
  const [tags, setTags] = useState<TTag>({})

  useEffect(()=> {
    document.title = 'Tags | Thinking in X'
  }, [])

  useEffect(() => {
    fetch('/tags.json')
      .then(res => res.json())
      .then(tags => {
        setTags(tags)
      })
  }, [])

  return (
    <div className={style.wrap}>
      {Object.entries(tags).sort(([, v1], [, v2]) => v1.length < v2.length ? 1 : -1)
        .map(([key, items]) => {
          return (
            <div key={key}>
              <p>{key === '_' ? '未分类' : key} <span>({items.length})</span></p>
              <ul>
                {items.map(({u, t})=> {
                  return (
                    <li key={u}><a href={u}>{t}</a></li>
                  )
                })}
              </ul>
            </div>
          )
        })}
    </div>
  );
}

export default Tags;