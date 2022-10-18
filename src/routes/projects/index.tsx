import {h} from 'preact'
import {useEffect, useState} from "preact/hooks";

import style from './index.scss'

type Props = {
  className?: string;
}

function Tags(props: Props) {

  useEffect(()=> {
    document.title = 'Projects | Thinking in X'
  }, [])

  return (
    <div className={style.wrap}>
      projects
    </div>
  );
}

export default Tags;