import { h, Fragment } from 'preact';
import { Route, Router } from 'preact-router';
import {useEffect} from 'preact/hooks'
import Prism from 'prismjs'
import {Provider as PreloadDataProvider} from '@preact/prerender-data-provider'
import {AppCtx, createAppState} from '../store/app-state'

import Header from './header';
import SideNav from './side-nav'

// Code-splitting is automated for `routes` directory
import About from '../routes/about'
import BlogList from "../routes/blog-list";
import BlogDetail from "../routes/blog-detail";
import Tags from '../routes/tags'
import Projects from "../routes/projects";

const appState=createAppState()

function checkSmallScreen() {
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    if (!appState.sideMenu.value) {
      appState.sideMenu.value = true;
    }
  }
}

checkSmallScreen()

const App = (props: unknown) => {
  useEffect(()=> {
    Prism.highlightAll();

    // auto set dark mode
    const hour=(new Date).getHours()
    if((hour >= 18 && hour < 24) || (hour >= 0 && hour <=6)){
      document.documentElement.setAttribute('data-theme', 'dark')
    }

    // preload page ids
    fetch('/page-ids.json')
      .then(res=> res.json())
      .then(ids=> {
        appState.pageIds.value=ids;
      })
  }, [])

  function handleRouteChange(){
    // console.log('changed route: ', ev)
    checkSmallScreen()
  }

  return (
    <AppCtx.Provider value={appState}>
      <PreloadDataProvider value={props}>
        <>
          <Header />

          <div className='main'>
            <SideNav />

            <Router onChange={handleRouteChange}>
              <Route path="/" component={BlogList} />
              <Route path="/about" component={About} />
              <Route path="/tags" component={Tags} />
              <Route path="/projects" component={Projects} />
              <Route path="/blogs/:pn?" component={BlogList} />
              <Route path="/blog/:date/:slug?" component={BlogDetail} />
            </Router>
          </div>
        </>
      </PreloadDataProvider>
    </AppCtx.Provider>
  )
}

export default App;
