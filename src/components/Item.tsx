import React from 'react'
import Input, { InputProps } from 'antd/lib/input'
import Form, { FormItemProps } from 'antd/lib/form'
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form'
import { Icon } from 'antd'

export interface ItemProps{
    name:string
    label?:string
    inputType:string
    renderType?:'inline'|'cell'|'form'
    inputProps?:any
    rules:Array<any>
    initValue:any
    itemProps?:FormItemProps
    fieldOptions?:GetFieldDecoratorOptions
    form:WrappedFormUtils
}
type RenderItemProps = Pick<ItemProps,'renderType'|'inputType'>

const Item: React.FC<ItemProps> = (props)=>{
    return (renderFormItem(props));
}

export default Item

type RenderFunction=(itemProps:RenderItemProps,props: any)=>JSX.Element

const registry = new Map<string,RenderFunction>()

export function registItem(itemType:string,render:RenderFunction){
    registry.set(itemType,render)
}

//function renderItem(itemType:string,props:any){
function renderItem(itemProps:RenderItemProps,props:any){  
    let renderFunction = registry.get(itemProps.inputType)
    if(renderFunction===undefined){
      renderFunction = registry.get("_default_")
        //未注册的按文本项渲染
        //return (<Input {...props}/>)
    }
    if(renderFunction){
      return renderFunction(itemProps,props)
    }
}

function renderFormItem(props:ItemProps){
    const {inputProps,name,label,rules,initValue,itemProps,form,fieldOptions} = props

    const error = form.getFieldError(name)
    let itmProps:FormItemProps = {
        label:label,
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
        renderItem(props as RenderItemProps,inputProps),
      )}
    </Form.Item>)
}

const defaultRenderFunction:RenderFunction=(itemProps:RenderItemProps,props:any)=>{
  if(itemProps.renderType==='cell'){
    props.onPressEnter = props.onBlur //认为onBlur会从表格中传过来
  }
  return (<Input {...props}/>)
}

registItem('_default_',defaultRenderFunction)

//registItem('date',dateRenderFunction);