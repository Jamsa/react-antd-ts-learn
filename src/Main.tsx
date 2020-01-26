import React, { useEffect, ReducerAction, useReducer, Dispatch, useContext } from "react"
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import App from "./App"
import Button from 'antd/es/button'

export interface GlobalState{
    token:string;
    username:string;
}

type Action = {
    type:'SET_USERNAME'|'SET_TOKEN',
    payload:string
}



function reducer(state:GlobalState, action:Action){
    switch(action.type){
        case 'SET_TOKEN':
            return {token:action.payload,username:state.username}
        case 'SET_USERNAME':
            return {token:state.token,username:action.payload}
        default:
            return state
    }
}
type IContextProps={
    state:GlobalState
    dispatch:Dispatch<Action>;
}
export const GlobalContext = React.createContext({} as IContextProps)

function Main(){
    const defaultState = {token:'token',username:"none"};
    const [state,dispatch] = useReducer(reducer,defaultState)    
    return (
        <GlobalContext.Provider value={{state:state,dispatch:dispatch}}>
            <Router>
                <Switch>
                    <Route path="/hello"><Hello/></Route>
                    <Route path="/"><App/></Route>
                </Switch>
            </Router>
        </GlobalContext.Provider>
    )
}
export default Main

export function Hello(){
    useEffect(()=>{
        document.title = 'Hello'
    })
    let {state} = useContext(GlobalContext)
return (<div><Button type="primary">Button</Button><Link to="/">{state.username}根目录</Link></div>)
}