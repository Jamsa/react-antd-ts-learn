import { useState } from "react";
import fetch from "../components/fetch";

interface ListState{
    page:number;
    pageSize:number;
    conditions:object;
    data:Array<object>;
    loading:boolean;
}

interface QueryPageOptions{
    code:string;
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

export function useQuery(options:QueryPageOptions){
    const [listState,setListState] = useState({page:1,pageSize:10,conditions:{},data:[],loading:false})
    

    const defaultQueryOptions = {
        queryUrl:`/${options.code}/query`
    }
    async function query(conditions:object,queryOpts?:QueryOptions){
        const opts = {...defaultQueryOptions,...queryOpts}

        setListState({...listState,loading:true})
        try{
            const result = await fetch.post(opts.queryUrl)
            setListState({...listState,data:result.data,loading:false})
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

    return {listState,setListState,query,del}
}

