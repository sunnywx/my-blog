import {h, Fragment} from 'preact'
import {useEffect, useState, useContext, useRef} from 'preact/hooks'
import cs from 'classnames'
import { Route, Router } from 'preact-router';
import Match from 'preact-router/match'
import {AppCtx} from '../../store/app-state'
import BlogChapters from "./blog-chapters";
import TopicChapters from "./topic-chapters";

import style from './index.scss'

type Props = {
  className?: string;
}

const threshold=768 // viewpoint width

function SideNav(props: Props) {
  const {hideSider}=useContext(AppCtx)
  const navRef=useRef(null)
  let toggleRef: any=null

  useEffect(()=> {
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
      hideSider.value=true // auto hide side menu
    }
  }

  function handleClickOutside(ev){
    toggleRef=document.getElementById('toggle-side-nav')
    if(typeof window !== 'undefined' && window.innerWidth > threshold) return;
    if(toggleRef && toggleRef.contains(ev.target)) return;
    // @ts-ignore
    if(navRef && !navRef?.current?.contains(ev.target)){
      hideSider.value=true
    }
  }

  return (
    <div className={cs(style.nav, {[style.hidden]: hideSider.value})} ref={navRef}>
      {/*<Router>*/}
      {/*  <Route component={TopicChapters} path='/topics/:slug*' />*/}
      {/*  <Route component={TopicChapters} path='/topic/:slug*' />*/}
      {/*  <Route component={BlogChapters} path='/:slug*' />*/}
      {/*</Router>*/}
      <Match path='/:slug*'>
        {({matches, path}) => {
          // console.log('path: ', path, matches)
          const isTopicPage=/\/topic\/?(.*)/.exec(path)
          const isProjectPage=/\/projects\/?(.*)/.exec(path)
          
          if(isProjectPage || path === '/about'){
            hideSider.value=true
            return null
          }
          
          if(isTopicPage){
            return <TopicChapters />
          }
  
          return <BlogChapters />
        }}
      </Match>
    </div>
  );
}

export default SideNav;