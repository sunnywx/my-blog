import {h} from 'preact'
import {useEffect} from "preact/hooks";

type Props = {
  className?: string;
  id: string;
  title: string;
}

const elemId='gitalk-container'

function Comment({id, title}: Props) {
  useEffect(()=> {
    // gitalk flag
    let rendered=false

    const gitalkOptions = {
      clientID: "e6529ed76f49a1c63227",
      clientSecret: "105ae6c9c257d966e42020b5babd8d11b4b35fb6",
      repo: "sunnywx.github.io",
      owner: "sunnywx",
      admin: ["sunnywx"],
      id,
      title,
      distractionFreeMode: false,
    }

    let tm: any =setInterval(()=> {
      if(window.Gitalk && !rendered){
        rendered=true
        const gitalk = new window.Gitalk(gitalkOptions)
        gitalk.render(elemId)

        clearInterval(tm)
        tm=null
      }
    }, 100)

    return ()=> {
      clearInterval(tm)
      tm=null
    }
  }, [id, title])

  return (
    <div id='gitalk-container' />
  );
}

export default Comment;