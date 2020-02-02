import React, { useState } from "react"
import Button from 'antd/es/button'
import { Table, Divider, Popconfirm, Spin, Row, Col } from "antd";
import {useQuery} from "./hooks";
import { EditableFormRow, EditableCell } from "./components/CellEditTable";
import DemoForm from "./DemoForm";


export interface DemoProps{
    name: string;
}

const Demo: React.FC<DemoProps> = (props)=>{
    const {listState,query,del,save,localDel,localAdd,localUpdate} = useQuery({code:'demo',keyName:'userId'});
    const dataSource = listState.data
    
    const [formProps,setFormProps] = useState({visible:false,record:{}})

    const formEdit = (data:any)=>{
        //record.visible=true
        setFormProps({visible:true,record:data})
    }
    const columns = [
        {title:'主键',dataIndex:'userId',key:'userId'},
        //{title:'ID',dataIndex:'userId',key:'userId'},
        {title:'用户名',dataIndex:'username',key:'username',editable:true,onCell:(record:any)=>({
            record,editable:true,dataIndex:'username',handleSave:localUpdate,title:'用户名'
        })},
        {title:'姓名',dataIndex:'fullname',key:'fullname',onCell:(record:any)=>({
            record,editable:true,dataIndex:'fullname',handleSave:localUpdate,title:'姓名'
        })},
        {title:'生日',dataIndex:'birthday',key:'birthday',onCell:(record:any)=>({
            record,editable:true,dataIndex:'birthday',handleSave:localUpdate,title:'生日',editType:'date'
        })},
        {
            title: '操作',
            key: 'action',
            render: (text:string, record:any) => (
              <span>
                {/*<a>操作 {record.fullname}</a>
                <Divider type="vertical" />*/}
                <Popconfirm
                    placement="topRight"
                    title="删除确认?"
                    onConfirm={()=>del(record.userId)}
                    okText="是"
                    cancelText="否"
                >
                    <a>删除</a>
                </Popconfirm>
                <Divider type="vertical" />
                <Popconfirm
                    placement="topRight"
                    title="删除确认?"
                    onConfirm={()=>localDel(record.userId)}
                    okText="是"
                    cancelText="否"
                >
                    <a>本地删除</a>
                </Popconfirm>
                <Divider type="vertical" />
                <a onClick={()=>localUpdate({userId:record.userId,fullname:'aaaa'})}>本地修改</a>
                <Divider type="vertical" />
                <a onClick={()=>formEdit(record)}>弹窗修改</a>
              </span>
            ),
          },
    ]
    const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };

    return (
        <div>
            <Row>
            <Col span={24}>
                
            <Button type="primary" onClick={(e)=>query({})}>获取数据</Button>
            <Button type="default" onClick={(e)=>save({})}>批量保存</Button>
                <Button type="default" onClick={(e)=>localAdd({username:'aaaa'})}>添加一行</Button>
                    <Spin spinning={listState.loading}/>
                
                </Col>
            </Row>
            <Col span={24}>
            <Table components={components} dataSource={dataSource} columns={columns} loading={listState.loading} />
                {/*listState.data.map((value,index)=>{
                    return <li key={index}>{value['userId']}</li>
                }){listState.loading ?(
                <Spin/>
            ):(
            )}*/}
            
            </Col>
            <DemoForm record={formProps.record} onSave={(data)=>localUpdate(data)}/>
        </div>
    )
}

export default Demo