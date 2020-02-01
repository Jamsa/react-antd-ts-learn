import { useState } from "react";
import fetch from "../api/fetch";

interface ListState{
    page:number;
    pageSize:number;
    conditions:object;
    data:Array<any>;
    loading:boolean;
    delRows:Array<any>;
    addRows:Array<any>;
    updateRows:Array<any>;
}

interface QueryPageOptions{
    code:string;
    keyName:string;
    queryUrl?:string;
    pageable?:boolean;
}

interface QueryOptions{
    queryUrl?:string;
}
interface DelOptions{
    autoRefresh?:boolean;
    delUrl?:string;
}
interface SaveOptions{
    autoRefresh?:boolean;
    saveUrl?:string;
}

export function useQuery(options:QueryPageOptions){
    const [listState,setListState] = useState<ListState>({page:1,pageSize:10,conditions:{},data:[],loading:false,delRows:[],addRows:[],updateRows:[]})
    

    const defaultQueryOptions = {
        queryUrl:`/${options.code}/query`,
        success:function(data:any){}
    }
    async function query(conditions:object,queryOpts?:QueryOptions){
        const opts = {...defaultQueryOptions,...queryOpts}

        setListState({...listState,loading:true})
        try{
            const result = await fetch.post(opts.queryUrl)
            opts.success(result)
            setListState({...listState,data:result.data,loading:false,addRows:[],delRows:[],updateRows:[]})
            return result;
        }catch(err){
            setListState({...listState,loading:false})
            throw err
        }
    }

    const defaultDelOptions = {
        autoRefresh:true,
        delUrl:`/${options.code}/delete`,
    }
    async function del(id:any,delOpts?:DelOptions){
        const opts = {...defaultDelOptions,...delOpts}
        
        setListState({...listState,loading:true})
        try{
            const result = await fetch.delete(opts.delUrl+'/'+id)
            if(opts.autoRefresh){
                query({})
            }
            setListState({...listState,data:result.data,loading:false})
            return result;
        }catch(err){
            setListState({...listState,loading:false})
            throw err
        }
    }

    const defaultSaveOptions = {
        autoRefresh:true,
        saveUrl:`/${options.code}/save`,
    }
    async function save(saveOpts?:SaveOptions){
        const opts = {...defaultSaveOptions,...saveOpts}
        
        setListState({...listState,loading:true})
        try{
            const result = await fetch.post(opts.saveUrl,{addRows:listState.addRows,updateRows:listState.updateRows,delRows:listState.delRows})
            if(opts.autoRefresh){
                query({})
            }
            setListState({...listState,data:result.data,loading:false})
            return result;
        }catch(err){
            setListState({...listState,loading:false})
            throw err
        }
    }

    function localDel(id:any){
        const data = listState.data.filter((value,index,arr)=>{
            const result = value[options.keyName]!==id
            if(!result) listState.delRows.push(value)
            return result
        })
        setListState({...listState,data:data})
    }

    function localAdd(record:any){
        if(!record[options.keyName]){
            record[options.keyName] = 'new_'+Math.random()
            record['key'] = record[options.keyName]
        }
        const data = [record,...listState.data]
        listState.addRows.push(data)
        setListState({...listState,data:data})
    }

    function localUpdate(record:any){
        listState.data.find((value)=>{
            if(value[options.keyName]===record[options.keyName]){
                Object.assign(value,record)
                listState.updateRows.push(value)
                setListState({...listState})
                return;
            }
        })
    }

    return {listState,setListState,query,del,save,localDel,localAdd,localUpdate}
}

