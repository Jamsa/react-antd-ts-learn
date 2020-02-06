import { Form, DatePicker } from "antd";
import React, { useState, useRef, useEffect } from "react";
//import Input, { InputProps } from "antd/lib/input";
import Item,{ItemProps} from "./Item";

const EditableContext = React.createContext({} as any);

function EditableRow(props:any){
  const {form,index,...restProps} = props
  return (<EditableContext.Provider value={form}>
      <tr {...restProps} />
    </EditableContext.Provider>)
}

export const EditableFormRow = Form.create()(EditableRow);

export function EditableCell(props:any){
  const [editing,setEditing] = useState<boolean>(false)
  const input:any = useRef()

  useEffect(()=>{
    if(editing)
      input.current.focus()
  },[editing])
  
  const toggleEdit = ()=> {
    setEditing(!editing)
    /*无法保证此处值一定变更了
    if (editing)
      input.current.focus();*/
  }

  const renderCell = (form:any) => {
    const { children, dataIndex, record, title, handleSave,inputType,rules } = props;

    const save = (e:any)=> {
      form.validateFields((error:any, values:any) => {
        if (error && error[e.currentTarget.id]) {
          return;
        }
        toggleEdit();
        handleSave({ ...record, ...values });
      });
    }

    const itemProps:ItemProps = {
      //label:"用户名",
      //label:'',
      name:dataIndex,
      rules:rules,
      initValue:record[dataIndex],
      form:form, 
      inputType:inputType,
      renderType:'cell',
      inputProps:{
        ref:input, 
        //onPressEnter:(e:any)=>save(e),
        onBlur:(e:any)=>save(e)
      }
    };
    
    return editing ? (
      <Item {...itemProps}/>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  
  const {
    editable,
    dataIndex,
    title,
    record,
    index,
    handleSave,
    children,
    inputType,
    renderType,
    ...restProps
  } = props;

  
  return (
    <td {...restProps}>
      {editable ? (
        <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>
      ) : (
        children
      )}
    </td>
  )
}
