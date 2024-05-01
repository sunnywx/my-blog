import {h} from 'preact'
import {useEffect, useContext} from 'preact/hooks'
import {usePrerenderData} from '@preact/prerender-data-provider'
import {marked} from 'marked'

type Props = {
  className?: string;
  slug: string
}

function TopicDetail(props: Props) {
  const [data, loading, error] = usePrerenderData(props);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const parsed=marked.parse(data.content)

  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: parsed}} />
    </div>
  );
}

export default TopicDetail;