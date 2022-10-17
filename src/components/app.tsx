import { h, Fragment } from 'preact';
import { Route, Router } from 'preact-router';
import {Provider as PreloadDataProvider} from '@preact/prerender-data-provider'
import {AppCtx, createAppState} from '../store/app-state'

import Header from './header';
import SideNav from './side-nav'

// Code-splitting is automated for `routes` directory
import About from '../routes/about'
import BlogList from "../routes/blog-list";
import BlogDetail from "../routes/blog-detail";
import Tags from '../routes/tags'

const appState=createAppState()

const App = (props: unknown) => {
  function handleRouteChange(ev){
      // console.log('changed route: ', ev)
    if(!appState.sideMenu.value){
      appState.sideMenu.value=true;
    }
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
              <Route component={Tags} path="/tags" />
              <Route path="/blog/:pn?" component={BlogList} />
              <Route path="/blog/:date/:slug?" component={BlogDetail} />
            </Router>
          </div>
        </>
      </PreloadDataProvider>
    </AppCtx.Provider>
  )
}

export default App;
