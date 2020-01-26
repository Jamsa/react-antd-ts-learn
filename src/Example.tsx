import { useState, useEffect, useContext } from "react"
import React from "react"
import Button from 'antd/es/button'
import { GlobalContext } from "./Main";

export interface ExampleProps{
    name: string;
}

const Example: React.FC<ExampleProps> = (props)=>{
    const [count,setCount] = useState(0);

    useEffect(()=>{
        document.title = `you clicked ${count} times`
    })

    let {state,dispatch} = useContext(GlobalContext)
    //globalState.username='AAA'
    //dispatch({type:'SET_USERNAME',payload:'AAAA'})

    function handleClick(count:number){
        setCount(count)
        dispatch({type:'SET_USERNAME',payload:'AAAA'})
    }

    return (
        <div>
            <p>{props.name}</p>
            <p>{state.username}</p>   
            <p>You clicked {count} times</p>
            <Button type="primary" onClick={()=>handleClick(count+1)}>Click me</Button>
        </div>
    )
}

export default Example