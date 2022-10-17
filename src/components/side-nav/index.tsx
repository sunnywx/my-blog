import {h} from 'preact'
import {useEffect, useState, useContext, useRef} from 'preact/hooks'
import cs from 'classnames'
import {AppCtx} from '../../store/app-state'
import MonthSection from "./month-section";

import style from './index.scss'

type Props = {
  className?: string;
}

// todo
// const chapterUrl=`http://127.0.0.1:9876/chapters.json`
const chapterUrl=`/chapters.json`

const threshold=768 // viewpoint width

// dec sort
function compare(a, b){
  if(a>b) return -1;
  if(a<b) return 1;
  return 0;
}

function SideNav(props: Props) {
  const [chapters, setChapters]=useState({})
  const {sideMenu}=useContext(AppCtx)
  const navRef=useRef(null)
  let toggleRef: any=null

  useEffect(()=> {
    fetch(chapterUrl)
      .then(res=> res.json())
      .then(data=> {
        // console.log('chapters: ', data)
        setChapters(data)
      })

    handleResize()
    window.addEventListener('resize', handleResize);

    document.addEventListener('click', handleClickOutside)

    return ()=> {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  function handleResize(){
    const sz=window.innerWidth
    if(sz < threshold){
      sideMenu.value=true // auto hide side menu
    }
  }

  function handleClickOutside(ev){
    toggleRef=document.getElementById('toggle-side-nav')
    if(toggleRef && toggleRef.contains(ev.target)) return;
    // @ts-ignore
    if(navRef && !navRef?.current?.contains(ev.target)){
      sideMenu.value=true
    }
  }

  return (
    <div className={cs(style.nav, {[style.hidden]: sideMenu.value})} ref={navRef}>
      {/* use sideMenu will not trigger re-render */}
      {Object.keys(chapters).sort(compare).map(year=> {
        return (
          <div key={year} className={style.year}>
            <p>{year}年</p>
            {Object.keys(chapters[year]).sort(compare).map((mon, idx)=> {
              return <MonthSection month={mon} items={chapters[year][mon]} key={idx} />
            })}
          </div>
        )
      })}
    </div>
  );
}

export default SideNav;