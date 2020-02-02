import { useState } from "react"
import fetch from "../api/fetch";

export interface EditProps{
    record:any
}

//hook的参数
interface EditPageOptions{
    code:string
    keyName:string
    form:any //Form高阶组件注入的属性
    /*ajaxLoad:boolean
    createUrl:string
    loadUrl:string
    saveUrl:string*/
}

//编辑功能状态数据
interface EditState{
    record:any
    loading:boolean
    visible:boolean
    isNew:boolean
    subGrids?:{
        code:string
        rows:Array<any>
        addRows:Array<any>
        delRows:Array<any>
        updateRows:Array<any>
    }
}

interface CreateOptions{
    url?:string
}

interface LoadOptions{
    url?:string
}

interface SaveOptions{
    wfOperation?:'SUBMIT'|'CANCEL'|'REJECT'|'NONE'
    extraParams?:any
    url?:string
    validate?:boolean
}

export function useEdit(options:EditPageOptions){
    const [editState,setEditState] = useState<EditState>({record:{},isNew:true,loading:false,visible:false})

    const defaultCreateOptions:CreateOptions = {
        url:`/${options.code}/create`
    }
    async function create(createOpts?:CreateOptions){
        const opts = {...defaultCreateOptions,...createOpts||{}}

        setEditState({...editState,isNew:false,loading:true,visible:true})
        try{
            const data = await fetch.get(`${opts.url}`)
            setEditState({...editState,...data,loading:false})
        }catch(err){
            setEditState({...editState,loading:false})
            throw err
        }
    }

    const defaultLoadOptions:LoadOptions = {
        url:`/${options.code}`
    }
    async function load(id:string,loadOpts?:LoadOptions){
        const opts = {...defaultLoadOptions,...loadOpts||{}}

        setEditState({...editState,isNew:false,loading:true,visible:true})
        try{
            const data = await fetch.get(`${opts.url}/${id}`)
            setEditState({...editState,...data,loading:false})
        }catch(err){
            setEditState({...editState,loading:false})
            throw err
        }
    }

    const defaultSaveOptions:SaveOptions = {
        wfOperation:'NONE',
        url:`/${options.code}`,
        validate:true
    }
    async function save(saveOpts?:SaveOptions){
        const opts = {...defaultSaveOptions,...saveOpts||{}}

        setEditState({...editState,loading:true})
        try{
            const data = await fetch.post(`${opts.url}`,editState)
            setEditState({...editState,...data,isNew:false,loading:false,visible:false})
        }catch(err){
            setEditState({...editState,loading:false})
            throw err
        }
    }

    function validate(){
        return true
    }

    //本地保存，只返回数据
    function localSave(){
        setEditState({...editState,isNew:false,visible:false})
        return editState
    }

    function localLoad(data:any){
        setEditState({record:data,isNew:false,loading:false,visible:true})
    }
    return {create,save,load,localLoad,localSave,validate,editState}
}