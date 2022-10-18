import {h, Fragment} from 'preact'
import {useEffect, useState, useContext} from 'preact/hooks'
import {route} from "preact-router";
import dayjs from 'dayjs'
import cs from 'classnames'
import {AppCtx} from "../../store/app-state";
import style from './index.scss'

type Props = {
  className?: string;
  pn?: string; // page number
}

const pageSize=5

function BlogList({pn}: Props) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading]=useState(true)
  const {pageIds}=useContext(AppCtx)
  const pageNo=parseInt(pn || '1')
  const total=Math.ceil(pageIds.value.length / pageSize)

  useEffect(()=> {
    document.title = 'Blogs | Thinking in X'
  }, [])

  useEffect(() => {
    if(pageIds === undefined) return

    if(pageNo > 0 && pageNo <= total){
      fetch(`/page-${pageNo}.json`)
        .then(res => res.json())
        .then(blogs => {
          setBlogs(blogs)
          setLoading(false)
        }).catch(err=> setLoading(false))
    }
  }, [pageIds.value, pageNo])

  if(loading) {
    return (
      <div className={style.wrap}>Loading..</div>
    )
  }

  // @ts-ignore
  if(pageNo <=0 || pageNo > total){
    return (
      <div className={style.page404}>page not found</div>
    )
  }

  function renderPager(){
    if(total <= 1){
      return null;
    }
    let prev, next;

    if (pageNo > 1 && pageNo < total) {
      prev=<button onClick={()=> route(`/blogs/${pageNo - 1}`)}>Prev</button>
      next=<button onClick={()=> route(`/blogs/${pageNo + 1}`)}>Next</button>
    }
    if (pageNo === 1) {
      next=<button onClick={()=> route(`/blogs/${pageNo + 1}`)}>Next</button>
    }
    if(pageNo === total){
      prev=<button onClick={()=> route(`/blogs/${pageNo - 1}`)}>Prev</button>
    }

    return (
      <div className={style.paginator}>
        {prev}
        {
          Array(total).fill(0).map((v, idx) => {
            return (
              <button
                key={idx}
                onClick={()=> route(`/blogs/${idx + 1}`)}
                className={cs({[style.active]: pageNo === idx+1})}
              >
                {idx + 1}
              </button>
            )
          })
        }
        {next}
      </div>
    )
  }

  return (
    <div className={style.wrap}>
      {blogs.map(({url, title, date, desc}) => {
        return (
          <div key={url} className={style.pg} onClick={()=> route(url)}>
            <div>
              <span>{title}</span>
              <span>{dayjs(date).format('YYYY-MM-DD')}</span>
            </div>
            {/*<p>{desc}</p>*/}
            <p dangerouslySetInnerHTML={{__html: desc}} />
          </div>
        )
      })}
      {renderPager()}

    </div>
  );
}

export default BlogList;