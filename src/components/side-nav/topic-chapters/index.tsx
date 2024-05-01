import {h} from 'preact'
import {useEffect, useState} from "preact/hooks";
import Tree, {Schema} from './tree'

type Props = {
  className?: string;
}

function TopicChapters(props: Props) {
  const [chapters, setChapters]=useState<Schema>({root: true, child: []})

  useEffect(()=> {
    fetch('/topic-chapters.json')
      .then(res=> res.json())
      .then(d=> {
        setChapters(d)
      })
  }, [])

  return (
    <Tree schema={chapters} />
  );
}

export default TopicChapters;