import React from 'react'
import Input, { InputProps } from 'antd/lib/input'
import Form, { FormItemProps } from 'antd/lib/form'
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form'
import { Icon } from 'antd'

export interface ItemProps{
    name:string
    label?:string
    inputType:'text'|'date'|'number'
    inputProps?:any
    rules:Array<any>
    initValue:any
    itemProps?:FormItemProps
    fieldOptions?:GetFieldDecoratorOptions
    form:WrappedFormUtils
}
const Item: React.FC<ItemProps> = (props)=>{
    return (renderFormItem(props));
    /*const {inputProps,name,label,rules,initValue,itemProps,form} = props
    const error = form.getFieldError(name)
    return (
        <Form.Item label={label} validateStatus={error? 'error' : ''} help={error || ''}>
      {form.getFieldDecorator(name, {
        rules: rules,
        initialValue:initValue,
      })(
        <Input {...inputProps}/>,
      )}
    </Form.Item>)*/
}

export default Item

type RenderFunction=(props: any)=>React.Component

const registry = new Map<string,RenderFunction>()

export function registItem(itemType:string,render:RenderFunction){
    registry.set(itemType,render)
}

function renderItem(itemType:string,props:any){
    const renderFunction = registry.get(itemType)
    if(renderFunction){
        return renderFunction(props)
    }else{
        //未注册的按文本项渲染
        return (<Input {...props}/>)
    }
}

function renderFormItem(props:ItemProps){
    const {inputProps,name,label,rules,initValue,itemProps,form,fieldOptions} = props

    const error = form.getFieldError(name)
    let itmProps:FormItemProps = {label:label,
        validateStatus:error? 'error' : '',
        help:error||''
    }
    //label={label} validateStatus={error? 'error' : ''} help={error || ''}
    itmProps={...itmProps,...itemProps}
    let fieldOpts:GetFieldDecoratorOptions = {
        rules:rules||[],
        initialValue:initValue
    }
    fieldOpts = {...fieldOpts,...fieldOptions}
    return (
    <Form.Item {...itmProps}>
      {form.getFieldDecorator(name, fieldOpts)(
        renderItem(props.inputType,inputProps),
      )}
    </Form.Item>)
}