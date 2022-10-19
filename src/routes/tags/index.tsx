import {h} from 'preact'
import {useEffect, useState} from "preact/hooks";
import {route} from "preact-router";

import style from './index.scss'

type Props = {
  className?: string;
  name?: string;
}

type TVal={u: string, t: string}

type TTag={
  [key: string]: Array<TVal>
}

function Tags({name}: Props) {
  const [tags, setTags] = useState<TTag | TVal[]>({})
  const [curTags, setCurTags] = useState<TVal[]>([])

  useEffect(()=> {
    document.title = 'Tags | sunnywang'
  }, [])

  useEffect(() => {
    fetch('/tags.json')
      .then(res => res.json())
      .then(tags => {
        setTags(tags)
      })
  }, [])

  useEffect(()=> {
    if(name) {
      setCurTags(tags[name] || [])
    }
  }, [tags, name])

  if(name){
    return (
      <div>
        <h2>{name === '_' ? '未分类' : name} <span>({curTags.length})</span></h2>
        <ul>
          {(curTags as TVal[]).map(({u, t})=> {
            return (
              <li key={u}><a href={u}>{t}</a></li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className={style.wrap}>
      {Object.entries(tags || {}).sort(([, v1], [, v2]) => v1.length < v2.length ? 1 : -1)
        .map(([key, items]) => {
          if(items.length === 0) return;

          return (
            <div key={key} onClick={()=> route(`/tags/${key}`)}>
              <h2>{key === '_' ? '未分类' : key} <span>({items.length})</span></h2>
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