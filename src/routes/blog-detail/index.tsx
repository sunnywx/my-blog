import {h} from 'preact'
import {useEffect, useContext} from 'preact/hooks'
import {usePrerenderData} from '@preact/prerender-data-provider'
import {marked} from 'marked'
import day from 'dayjs'
import {AppCtx} from "../../store/app-state";
import Comment from "./comment";

import style from './index.scss'
import {VscArrowLeft, VscArrowRight, VscInfo, VscTag} from "react-icons/vsc";

type Props = {
  className?: string;
  date: string;
  slug?: string;
}

declare global {
  interface Window {
    Gitalk: any
  }
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
  const title=ids[blogIdx]?.t

  useEffect(()=> {
    if(title){
      document.title = `${title} | sunnywang`
    }
  }, [blogIdx, ids, props.slug])

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
      <div className={style.header}>
        <h1>{title}</h1>
        <div>
          <div>
            <span><VscTag /></span>
            {(data.tags || []).map(t=> {
              return (
                <a key={t} href={`/tags/${t}`}>{t}</a>
              )
            })}
          </div>
          <span><VscInfo /> {day(data.date).format('YYYY-MM-DD')}</span>
        </div>
      </div>
      <div className={style.article} dangerouslySetInnerHTML={{__html: parsed}} />
      <div className={style.pager}>
        {prev && (
          <a href={prev.u}><VscArrowLeft /> {prev.t}</a>
        )}
        {next && (
          <a href={next.u}>{next.t} <VscArrowRight /></a>
        )}
      </div>
      <Comment id={blogUrl} title={title} />
    </div>
  );
}

export default BlogDetail;