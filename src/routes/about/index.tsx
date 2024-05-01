import {h} from 'preact'
import style from './style.scss'
import {useEffect} from "preact/hooks";

function About(props){
  useEffect(()=> {
    document.title = 'About | sunnywang'
  }, [])

  return (
    <div className={style.wrap}>
      <div>
        <h2>About me:</h2>
        <div>
          <p>
            My name is <strong>Sunny Wang</strong>, a full-stack developer living in WuHan, China.
          </p>
          <p>I'm focus on web platform, JavaScript, React (also preact, vue, svelte..), nodejs, python.</p>
          <p>I also interested in math, algorithm, system design, machine learning, AI. </p>
          <p>In spare time, I like reading, writing, thinking, I believe life-long learning.</p>
          <p>Keep calm and carry on.</p>
          <p>Stay hungry, stay foolish.</p>
        </div>
        
        {/* <div>
          <p>Update resume every year, if you realize you have nothing to update,
            then you're wasting your life this year</p>
          
          <p>Use English as much as possible</p>
        </div> */}

        {/*<h2>Skills:</h2>*/}
        {/*<ul>*/}
        {/*  <li>native web, DOM</li>*/}
        {/*  <li>javascript</li>*/}
        {/*  <li>css3, scss, styled-components, tailwindcss</li>*/}
        {/*  <li>webpack, rollup, babel, eslint, typescript, esbuild, vite (modern toolchain)</li>*/}
        {/*  <li>jquery, backbone, lodash, rxjs, react, preact, vue, svelte(promising..)</li>*/}
        {/*  <li>*/}
        {/*    SPA (single page application) state management:*/}
        {/*    <ul>*/}
        {/*      <li>local state / context</li>*/}
        {/*      <li>redux / redux-toolkit</li>*/}
        {/*      <li>mobx</li>*/}
        {/*      <li>recoil</li>*/}
        {/*      <li>preact signal</li>*/}
        {/*      <li>rxjs</li>*/}
        {/*    </ul>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    Data fetching:*/}
        {/*    <ul>*/}
        {/*      <li>native fetch</li>*/}
        {/*      <li>axios</li>*/}
        {/*      <li>react-query</li>*/}
        {/*      <li>swr</li>*/}
        {/*      <li>graphql</li>*/}
        {/*    </ul>*/}
        {/*  </li>*/}
        {/*  <li>nodejs</li>*/}
        {/*  <li>mongodb</li>*/}
        {/*  <li>container, docker</li>*/}
        {/*  <li>git, devops, ci/cd</li>*/}
        {/*</ul>*/}

        {/*<h2>My projects:</h2>*/}
        {/*<ul>*/}
        {/*  <li>Appcenter (app deploy, cluster orchestrator)</li>*/}
        {/*  <li>OpenPitrix (multi-cloud app management platform)</li>*/}
        {/*  <li>Form builder (formily based)</li>*/}
        {/*  <li>Page engine (low code)</li>*/}
        {/*  <li>App render (upload app bundle, render it)</li>*/}
        {/*  /!*<li>Notification center</li>*!/*/}
        {/*  <li>Swagger api generator</li>*/}
        {/*  <li>Preact static site generator (this blog site is built by it)</li>*/}
        {/*  <li>Everymemo note taking web app (on-going)</li>*/}
        {/*  <li>slim-ui, a react based ui lib (on-going)</li>*/}
        {/*  <li>Book reading web app (on-going)</li>*/}
        {/*</ul>*/}

        {/*<h2>Shared talks: </h2>*/}
        {/*<ul>*/}
        {/*  <li>Thinking in view</li>*/}
        {/*  <li>wasm intro</li>*/}
        {/*  <li>基于formily的表单设计器实现</li>*/}
        {/*</ul>*/}

        {/*<h2>Interested in:</h2>*/}
        {/*<ul>*/}
        {/*  <li>Web platform, (always bet on web)</li>*/}
        {/*  <li>js / nodejs</li>*/}
        {/*  <li>web 3.0 / decentralized / distribution</li>*/}
        {/*  <li>docker, k8s, cloud native</li>*/}
        {/*  <li>WebAssembly</li>*/}
        {/*  <li>c / rust / go</li>*/}
        {/*  <li>AI, machine learning</li>*/}
        {/*  <li>Algorithm, problem solving, system design</li>*/}
        {/*  <li>Reading, writing, thinking</li>*/}
        {/*</ul>*/}
      </div>
    </div>
  )
}

export default About