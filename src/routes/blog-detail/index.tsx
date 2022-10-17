import {h} from 'preact'
import {useEffect} from 'preact/hooks'
import {usePrerenderData} from '@preact/prerender-data-provider'
import {marked} from 'marked'
// import html from 'htm'

import style from './index.scss'

type Props = {
  className?: string;
  slug?: string;
}

function BlogDetail(props: Props) {
  const [data, loading, error] = usePrerenderData(props);

  useEffect(()=> {
    console.log('preload data: ', data)
  }, [data])

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const raw=data?.content?.match(/---\n(.+)\n---(.+)/ms)

  if(!raw || raw.length < 3) return null

  const parsed=marked.parse(raw[2])

  return (
    <div className={style.wrap} dangerouslySetInnerHTML={{__html: parsed}} />
  );
}

export default BlogDetail;