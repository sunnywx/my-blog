// global app state
import {createContext} from 'preact'
import {signal} from '@preact/signals'

type SignalVal<T> = {value: T}

type StateType ={
  // sideMenu: boolean | {value: boolean}
  sideMenu: SignalVal<boolean>,
  theme: SignalVal<string>,
  pageIds: SignalVal<Array<{t: string, u: string}>>
}

const AppCtx=createContext<StateType>({} as StateType)

function createAppState(){
  const sideMenu=signal(false)
  const theme=signal('light')
  const pageIds=signal([])

  return {sideMenu, theme, pageIds}
}

export {AppCtx, createAppState}
