// global app state
import {createContext} from 'preact'
import {signal} from '@preact/signals'

type SignalVal<T> = {value: T}

type StateType ={
  hideSider: SignalVal<boolean>,
  theme: SignalVal<string>,
  pageIds: SignalVal<Array<{t: string, u: string}>>
}

const AppCtx=createContext<StateType>({} as StateType)

function createAppState(){
  const hideSider=signal(false)
  const theme=signal('light')
  const pageIds=signal([])

  return {hideSider, theme, pageIds}
}

export {AppCtx, createAppState}
