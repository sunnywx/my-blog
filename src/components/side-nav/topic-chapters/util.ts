import {NodeItem} from './node'

export function dirFirst(d1: NodeItem, d2: NodeItem): number{
  if(d1.child){
    if(d2.child) return 0
    if(!d2.child) return -1
  }
  if(!d1.child){
    if(d2.child) return 1
    if(!d2.child) return 0
  }
  return 0
}