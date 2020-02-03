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
        }
        setVisible(true)
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
    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
      {getFieldDecorator('username', {
        rules: [{ required: true, message: '请输入用户名!' }],
        initialValue:editState.record.username,
      })(
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="用户名"
        />,
      )}
    </Form.Item>
    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
      {getFieldDecorator('fullname', {
        rules: [{ required: true, message: '请输入姓名!' }],
        initialValue:editState.record.fullname,
      })(
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="姓名"
        />,
      )}
    </Form.Item>
    <Item label="用户名" name="username" 
    rules={[{ required: true, message: '请输入姓名!' }]}
    initValue={editState.record.username} form={props.form} editType="text" />
    <Form.Item>
      <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
        保存
      </Button>
    </Form.Item>
  </Form></Drawer>)
}

export default Form.create<DemoFormProps&FormComponentProps>()(DemoForm)
