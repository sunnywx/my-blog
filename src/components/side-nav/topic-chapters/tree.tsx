import {h} from 'preact'
import cs from 'classnames'

import Node, {NodeItem} from './node'
import {dirFirst} from './util'
import style from './index.scss'

export type Schema={
  root: boolean,
  child: Array<NodeItem>
}

type Props = {
  className?: string;
  schema: Schema;
}

function Tree({schema, className}: Props) {
  return (
    <div className={cs(style.tree, className)}>
      {schema.child.sort(dirFirst).map(c=> <Node {...c} key={c.url} />)}
    </div>
  );
}

export default Tree;