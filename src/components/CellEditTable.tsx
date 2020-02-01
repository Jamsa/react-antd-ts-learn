import { Form, DatePicker } from "antd";
import React, { useState, useRef, useEffect } from "react";
import Input, { InputProps } from "antd/lib/input";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

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
    const { children, dataIndex, record, title, handleSave } = props;

    const save = (e:any)=> {
      form.validateFields((error:any, values:any) => {
        if (error && error[e.currentTarget.id]) {
          return;
        }
        toggleEdit();
        handleSave({ ...record, ...values });
      });
    }

    const renderElement = (props:any)=>{
      if(props.editType==='date'){
        return <DatePicker ref={input} onChange={save} onBlur={save} />
      }else{
        return <Input ref={input} onPressEnter={save} onBlur={save} />
      }
    }
    
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} 不允许为空`,
            },
          ],
          initialValue: record[dataIndex],//moment(record[dataIndex],'YYYY-MM-DD'),
        })(renderElement(props))}
      </Form.Item>
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
