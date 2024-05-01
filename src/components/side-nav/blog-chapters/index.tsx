import {h, Fragment} from 'preact'
import {useEffect, useState} from "preact/hooks";
import MonthSection from "./month-section";
import style from "./index.scss";

type Props = {
  className?: string;
}

// dec sort
function compare(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

function BlogChapters(props: Props) {
  const [chapters, setChapters] = useState({})

  useEffect(() => {
    fetch('/chapters.json')
      .then(res => res.json())
      .then(data => {
        // console.log('chapters: ', data)
        setChapters(data)
      })
  }, [])

  return (
    <>
      {Object.keys(chapters).sort(compare).map(year => {
        return (
          <div key={year} className={style.year}>
            <p>{year}年</p>
            {Object.keys(chapters[year]).sort(compare).map((mon, idx) => {
              return <MonthSection month={mon} items={chapters[year][mon]} key={idx} />
            })}
          </div>
        )
      })}
    </>

  );
}

export default BlogChapters;