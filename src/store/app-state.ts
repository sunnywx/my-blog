// global app state
import {createContext} from 'preact'
import {signal} from '@preact/signals'

type StateType={
  // sideMenu: boolean | {value: boolean}
  sideMenu: any
}

const AppCtx=createContext<StateType>({} as StateType)

function createAppState(){
  const sideMenu=signal(false)

  return {sideMenu}
}

export {AppCtx, createAppState}
