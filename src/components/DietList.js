import React from 'react';
import { Modal, ModalHeader, ModalBody, Col, Row, Button, Table } from 'reactstrap';
import axios from 'axios'

export default class DietList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            time: '',
            data: []
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.userInfo!=prevProps.userInfo){
            axios.post('/user/dietmanage/time', {
                time: this.state.time,
                date: this.props.date
            })
            .then((res)=>{
                this.setState({
                    data: res.data
                })
            })
        }
    }

    toggle = () => {
        this.setState(prevState=>({
            visible: !prevState.visible
        }));
    }

    delete=(id, time)=>{
        this.setState({
            data:[]
        })
        this.props.onDelete(id, time)
    }

    callDietData = (time) =>{
        axios.post('/user/dietmanage/time', {
        time: time,
        date: this.props.date

    })
    .then((res)=>{
        this.setState({
            time: time,
            visible: true,
            data: res.data
        })
    })
  }

  render() {
    const {data} = this.state
    const list = data.map((info)=>
        <tbody key={info.id}>
            <td>{info.food}</td>
            <td>{info.gram}g</td>
            <td>{info.calorie}kcal</td>
            <td>{info.carb}g</td>
            <td>{info.protein}g</td>
            <td>{info.fat}g</td>
            <td><Button value={info.id} onClick={()=>this.delete(info.id, info.time)}>삭제</Button></td>
        </tbody>
    )
    return (
        <React.Fragment>
            <Col><h3 className="text-muted text-center">식단 리스트</h3></Col>
            <Row>
                <Col lg={4} md={6} xs={6} onClick={()=>this.callDietData("아침")}><p className="time text-muted h4">아침</p></Col>
                <Col lg={4} md={6} xs={6} onClick={()=>this.callDietData("오전 간식")}><p className="time text-muted h4">오전 간식</p></Col>
                <Col lg={4} md={6} xs={6} onClick={()=>this.callDietData("점심")}><p className="time text-muted h4">점심</p></Col>
                <Col lg={4} md={6} xs={6} onClick={()=>this.callDietData("오후 간식")}><p className="time text-muted h4">오후 간식</p></Col>
                <Col lg={4} md={6} xs={6} onClick={()=>this.callDietData("저녁")}><p className="time text-muted h4">저녁</p></Col>
                <Col lg={4} md={6} xs={6} onClick={()=>this.callDietData("야식")}><p className="time text-muted h4">야식</p></Col>
            </Row>
            <Modal isOpen={this.state.visible} toggle={this.toggle} size="lg">
                <ModalHeader className="text-muted" toggle={this.toggle}><h4>{this.props.date}<small>{this.state.time}</small></h4></ModalHeader>
                <ModalBody className="text-muted text-center">
                    <Table>
                    <thead>
                        <tr>
                        <th>음식 이름</th>
                        <th>음식의 양</th>
                        <th>칼로리</th>
                        <th>탄수화물</th>
                        <th>단백질</th>
                        <th>지방</th>
                        <th>삭제</th>
                        </tr>
                    </thead>
                    {list}
                    </Table>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
  }
}