import { h, Fragment } from 'preact';
import { Route, Router } from 'preact-router';
import {useEffect, useErrorBoundary} from 'preact/hooks'
import Prism from 'prismjs'
import {Provider as PreloadDataProvider} from '@preact/prerender-data-provider'
// import {Helmet} from 'react-helmet'
import {AppCtx, createAppState} from '../store/app-state'

import Header from './header';
import SideNav from './side-nav'

// Code-splitting is automated for `routes` directory
import About from '../routes/about'
import BlogList from "../routes/blog-list";
import BlogDetail from "../routes/blog-detail";
import Tags from '../routes/tags'
import Projects from "../routes/projects";
import Topics from "../routes/topics";
import TopicDetail from "../routes/topic-detail";

const appState=createAppState()

const App = (props: unknown) => {
  const [error, resetError]=useErrorBoundary()

  useEffect(()=> {

    Prism.highlightAll();

    // auto set dark mode
    const doc=document.documentElement
    const cachedTheme=localStorage.getItem('theme')
    if(cachedTheme){
      // @ts-ignore
      doc.setAttribute('data-theme', cachedTheme)
    } else {
      const hour=(new Date).getHours()
      if((hour >= 18 && hour < 24) || (hour >= 0 && hour <=6)){
        doc.setAttribute('data-theme', 'dark')
      }
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
    if (typeof window !== 'undefined') {
      // handle mobile size
      if(window.innerWidth <= 768){
        if (!appState.hideSider.value) {
          appState.hideSider.value = true;
        }

        if (!appState.hideTopNav.value) {
          appState.hideTopNav.value = true;
        }
      }

      // always scroll to page top
      const main=document.querySelector('.main > div:last-child')
      main && main.scrollTo({top: 0, behavior: 'smooth'})
    }
  }

  if(error){
    return (
      <div className='error-bound'>
        <h2>Error:</h2>
        <p>{error.message}</p>
        <p>{error.stack}</p>
        <button onClick={resetError}>Try again</button>
      </div>
    );
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
              <Route path="/tags/:name?" component={Tags} />
              <Route path="/topics/:name?" component={Topics} />
              <Route path="/topic/:slug*" component={TopicDetail} />
              <Route path="/projects" component={Projects} />
              <Route path="/blogs/:pn?" component={BlogList} />
              {/*<Route path="/blog/:date/:slug?" component={BlogDetail} />*/}
              <Route path="/blog/:slug*" component={BlogDetail} />
            </Router>
          </div>

          {/*<Helmet>*/}
          {/*  <link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css" />*/}
          {/*  <script src="https://unpkg.com/gitalk/dist/gitalk.min.js" />*/}
          {/*</Helmet>*/}
        </>
      </PreloadDataProvider>
    </AppCtx.Provider>
  )
}

export default App;
