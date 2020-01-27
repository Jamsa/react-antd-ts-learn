import React from "react"
import Button from 'antd/es/button'
import { Table, Divider, Popconfirm } from "antd";
import {useQuery} from "./hooks";

export interface DemoProps{
    name: string;
}

const Demo: React.FC<DemoProps> = (props)=>{
    const {listState,query,del} = useQuery({code:'demo'});

    function handleClick(){
        query({})
    }
    const dataSource = listState.data
    const columns = [
        {title:'主键',dataIndex:'userId',key:'userId'},
        //{title:'ID',dataIndex:'userId',key:'userId'},
        {title:'用户名',dataIndex:'username',key:'username'},
        {title:'姓名',dataIndex:'fullname',key:'fullname'},
        {title:'生日',dataIndex:'birthday',key:'birthday'},
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
              </span>
            ),
          },
    ]
    return (
        <div>
            <Button type="primary" onClick={(e)=>handleClick()}>获取数据</Button>
            <Table dataSource={dataSource} columns={columns} />;
            {/*listState.data.map((value,index)=>{
                return <li key={index}>{value['userId']}</li>
            })*/}
        </div>
    )
}

export default Demo