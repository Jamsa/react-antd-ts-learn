import React, { useEffect, useState } from "react";
import { Form, Button, Input, Icon, Drawer } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { EditProps, useEdit } from "./hooks/useEdit";
import Item from "./components/Item";

//import { WrappedFormUtils } from "antd/lib/form/Form";

interface DemoFormProps extends EditProps{
    onSave?:(record:any)=>void
}

function hasErrors(fieldsError:any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const DemoForm: React.FC<DemoFormProps & FormComponentProps> = (props)=>{
//function DemoForm(props:DemoFormProps & FormComponentProps){
    const {record,onSave} = props
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,setFieldsValue } = props.form
    const [visible,setVisible] = useState(false)
    const {localLoad,editState} = useEdit({code:'demo',keyName:'userId',form:props.form})

    //加载数据
    useEffect(()=>{
        if(record && record.userId){/*&& record.userId!==*/
            props.form.resetFields()
            localLoad(record)
            //setFieldsValue(editState.record)
            setVisible(true)
        }else{
          setVisible(false)
        }
        
    },[record])

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setVisible(false)
        props.form.validateFields((err:any, values:any) => {
          if (!err) {
            console.log('接收的表单值: ', values);
            values.userId=editState.record.userId
            if(onSave)onSave(values)
          }
        });
    }

    const onClose = (e:any)=>{
        setVisible(false)
    }

    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
        <Drawer
          destroyOnClose={false}
          title="编辑"
          placement="right"
          closable={true}
          onClose={onClose}
          visible={visible}
        >
    <Form layout="inline" onSubmit={handleSubmit}>
    <Item label="用户名" name="username" 
    rules={[{ required: true, message: '请输入用户名!' }]}
    initValue={editState.record.username} form={props.form} inputType="text" />
    <Item label="姓名" name="fullname" 
    rules={[{ required: true, message: '请输入姓名!' }]}
    initValue={editState.record.fullname} form={props.form} inputType="text" />
    
    <Form.Item>
      <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
        保存
      </Button>
    </Form.Item>
  </Form></Drawer>)
}

export default Form.create<DemoFormProps&FormComponentProps>()(DemoForm)
