import {h} from 'preact'
import {VscFile, VscFolder, VscFolderOpened} from 'react-icons/vsc'
import {Match} from 'preact-router/match'
import cs from 'classnames'
import {useEffect, useState} from "preact/hooks";
import {dirFirst} from './util'
import style from './index.scss'

export type NodeItem = {
  url: string;
  title: string;
  child?: Array<NodeItem>;
}

type Props = {
  className?: string;
} & NodeItem

function Node({url, title, child}: Props) {
  const [fold, setFold] = useState(true)

  useEffect(()=> {
    if(location.pathname.startsWith(url)){
      setFold(false)
    }
  }, [])

  function renderChild(child: Array<NodeItem>) {
    return (
      <div className={style.child}>
        {child.sort(dirFirst).map(c => <Node {...c} key={c.url}/>)}
      </div>
    )
  }

  return (
    <div className={cs(style.node, {
      [style.fold]: fold,
    })}>
      {child ? (
        <div
          className={cs(style.dir, {[style.disabled]: child.length === 0})}
          onClick={() => {
            if (!child?.length) return
            setFold(prev => !prev)
          }}
        >
          {fold || !child.length ? <VscFolder/> : <VscFolderOpened/>}
          <span>{title}</span>
        </div>
      ) : (
        <Match path={url}>
          {({matches}) => (
            <a href={url} className={cs(style.leaf, {[style.active]: matches})}><VscFile /> {title}</a>
          )}
        </Match>
      )}
      {child && renderChild(child)}
    </div>
  );
}

export default Node;