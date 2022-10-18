import {h} from 'preact'
import {useEffect, useContext} from 'preact/hooks'
import {usePrerenderData} from '@preact/prerender-data-provider'
import {marked} from 'marked'
import {AppCtx} from "../../store/app-state";
// import html from 'htm'

import style from './index.scss'
import {VscArrowLeft, VscArrowRight} from "react-icons/vsc";

type Props = {
  className?: string;
  date: string;
  slug?: string;
}

function normalizeUrl(url: string){
  if(!url) return ''
  if(url.endsWith('/')) return url.slice(0, -1)
  return url
}

function BlogDetail(props: Props) {
  const [data, loading, error] = usePrerenderData(props);
  const {pageIds}=useContext(AppCtx)

  const ids=pageIds.value
  const blogUrl=normalizeUrl(['/blog', props.date, props.slug].join('/'))
  const blogIdx=ids.findIndex(v=> v.u === blogUrl)

  useEffect(()=> {
    const title=ids[blogIdx]?.t
    if(title){
      document.title = `${title} | Thinking in X`
    }
  }, [blogIdx, ids, props.slug])

  // useEffect(()=> {
  //   // console.log('preload data: ', data)
  //   console.log('page ids: ', pageIds.value)
  // }, [data, pageIds.value])

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const parsed=marked.parse(data.content)

  let prev, next;
  if(ids.length > 1){
    if(blogIdx > 0 && blogIdx < ids.length - 1){
      prev=ids[blogIdx - 1]
      next=ids[blogIdx + 1]
    }
    if(blogIdx === 0){
      next=ids[blogIdx + 1]
    }
    if(blogIdx === ids.length - 1) {
      prev=ids[blogIdx - 1]
    }
  }

  return (
    <div className={style.wrap}>
      <div className={style.article} dangerouslySetInnerHTML={{__html: parsed}} />
      <div className={style.pager}>
        {prev && (
          <a href={prev.u}><VscArrowLeft /> {prev.t}</a>
        )}
        {next && (
          <a href={next.u}>{next.t} <VscArrowRight /></a>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;