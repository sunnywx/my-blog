import {h} from 'preact'

type Props = {
  className?: string;
  pn?: number; // page number
}

function BlogList({pn=0}: Props) {
  return (
    <div>
      page: {pn || 0}
    </div>
  );
}

export default BlogList;