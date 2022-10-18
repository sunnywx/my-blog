import {h} from 'preact'
import style from './style.scss'
import {useEffect} from "preact/hooks";

function About(props){
  useEffect(()=> {
    document.title = 'About | Thinking in X'
  }, [])

  return (
    <div className={style.wrap}>
      <h2>About me:</h2>
      <div>
        <p>
          My name is <strong>Wang Xi</strong> (english name: <strong>Sunny Wang</strong>), a programmer living in WuHan, China.
        </p>
        <p>I'm focusing on web platform, javascript, react (preact, vue, svelte..), nodejs, full stack.</p>
        <p>I also interested in math, AI, algorithm, system design. </p>
        <p>In spare time, i like reading and writing about anything, always be a deep learner and life-long learner.</p>
      </div>

      <h2>Skills:</h2>
      <ul>
        <li>native web api, DOM</li>
        <li>javascript</li>
        <li>css3, scss, styled-components(css-in-js), tailwindcss</li>
        <li>webpack, rollup, babel, eslint, typescript, esbuild (modern web toolchain)</li>
        <li>jquery, backbone, rxjs, react, preact, svelte(very promising..)</li>
        <li>mongodb</li>
        <li>redis</li>
        <li>nodejs</li>
        <li>container, docker</li>
        <li>git, devops, ci/cd</li>
        <li>a little python, golang</li>
      </ul>

      <h2>My projects:</h2>
      <ul>
        <li>appcenter</li>
        <li>openpitrix (multi-cloud app management platform)</li>
        <li>cluster orchestrator</li>
        <li>page engine (low code)</li>
        <li>notification center</li>
        <li>swagger api generator</li>
      </ul>

      <h2>Shared topics: </h2>
      <ul>
        <li>thinking in view</li>
        <li>wasm intro</li>
      </ul>

      <h2>Interested in:</h2>
      <ul>
        <li>web platform, (always bet on web)</li>
        <li>js / nodejs</li>
        <li>docker, k8s, cloud native</li>
        <li>wasm</li>
        <li>c / rust / go</li>
        <li>AI, machine learning</li>
        <li>algorithm, problem solving</li>
        <li>system design</li>
        <li>reading, writing, thinking</li>
      </ul>
    </div>
  )
}

export default About