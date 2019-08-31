import React from 'react';
import { Modal, ModalHeader, ModalBody, Col, Row, Button, Table } from 'reactstrap';
import axios from 'axios';

export default class WorkoutList extends React.Component {
    constructor(props){
      super(props)
      this.state = {
          visible: false,
          target: '',
          data: []
      }
    }
    
    componentDidUpdate(prevProps){
      if(this.props.userInfo!==prevProps.userInfo){
          axios.post('/user/workout/target', {
            target: this.state.target,
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

    delete=(id, target)=>{
      this.setState({
        data:[]
      })
      this.props.onDelete(id, target)
    }

    callDietData = (target) =>{
        axios.post('/user/workout/target', {
        target: target,
        date: this.props.date
        })
        .then((res)=>{
            this.setState({
                target: target,
                visible: true,
                data: res.data
            })
        })
      }

    delete=(id, target)=>{
      this.props.onDelete(id, target)
    }

    render() {
          const {data} = this.state
          const list = data.map((info)=>
              <tbody key={info.id}>
                  <td>{info.workname}</td>
                  <td>{info.workweight}kg</td>
                  <td>{info.sets}set</td>
                  <td>{info.reps}rep</td>
                  <td><Button value={info.target} onClick={()=>this.delete(info.id, info.target)}>삭제</Button></td>
              </tbody>
          )
      return (
        <React.Fragment>
            <Col><h3 className="text-muted text-center">운동 리스트</h3></Col>
            <Row>
                <Col lg={4} md={6} xs={6} onClick={()=>this.callDietData("가슴")}><p className="time text-muted h4">가슴</p></Col>
                <Col lg={4} md={6} xs={6} onClick={()=>this.callDietData("등")}><p className="time text-muted h4">등</p></Col>
                <Col lg={4} md={12} xs={6} onClick={()=>this.callDietData("어깨")}><p className="time text-muted h4">어깨</p></Col>
                <Col lg={{size: 4, offset: 2}} md={{size: 4, offset: 2}} xs={6} onClick={()=>this.callDietData("하체")}><p className="time text-muted h4">하체</p></Col>
                <Col lg={4} md={4} xs={6} onClick={()=>this.callDietData("코어")}><p className="time text-muted h4">코어</p></Col>
            </Row>
            <Modal isOpen={this.state.visible} toggle={this.toggle} size="lg">
                <ModalHeader className="text-muted" toggle={this.toggle}><h4>{this.props.date}<small>{this.state.time}</small></h4></ModalHeader>
                <ModalBody className="text-muted text-center">
                    <Table>
                    <thead>
                        <tr>
                        <th>무게</th>
                        <th>세트 수</th>
                        <th>반복 수</th>
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