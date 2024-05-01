import {h} from 'preact'
import Match from "preact-router/match";
import cs from "classnames";
import {useState} from 'preact/hooks'
import {VscChevronRight, VscChevronDown} from 'react-icons/vsc'
import style from "./index.scss";

type ChapterItem={
  title: string;
  url: string;
}

type Props = {
  className?: string;
  month: string;
  items: ChapterItem[]
}

function MonthSection({month, items}: Props) {
  const [toggle, setToggle]=useState(false)

  return (
    <div className={style.month}>
      <p onClick={()=> setToggle(t=> !t)}>
        {toggle ? <VscChevronRight /> : <VscChevronDown />}
        <span>{month}月 ({items.length})</span>
      </p>
      <ul className={cs({[style.hidden]: toggle})}>
        {items.map(v=> (
          <Match path={v.url} key={v.url}>
            {({matches})=> (
              <li className={cs({[style.active]: matches})}>
                <a href={v.url}>{v.title}</a>
              </li>
            )}
          </Match>
        ))}
      </ul>
    </div>
  )
}

export default MonthSection;