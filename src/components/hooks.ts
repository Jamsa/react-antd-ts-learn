import { useState } from "react";
import fetch from "./fetch";

interface ListState{
    page:number;
    pageSize:number;
    conditions:object;
    data:Array<object>;
    loading:boolean;
}

function useApi(){
    const [listState,setListState] = useState({page:1,pageSize:10,conditions:{},data:[],loading:false})
    
    async function query(conditions:object){
        setListState({...listState,loading:true})
        try{
        const result = await fetch.post('/demo/query')
        setListState({...listState,data:result.data,loading:false})
        }catch(err){
            setListState({...listState,loading:false})
            throw err
        }
    }
    return {listState,setListState,query}
}

export default useApi