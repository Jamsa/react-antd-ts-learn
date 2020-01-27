import React from "react"
import Button from 'antd/es/button'
import useApi from './components/hooks'
import { Table } from "antd";

export interface DemoProps{
    name: string;
}

const Demo: React.FC<DemoProps> = (props)=>{
    const {listState,query} = useApi();

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