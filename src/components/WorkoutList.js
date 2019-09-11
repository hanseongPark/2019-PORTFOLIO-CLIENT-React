import React from 'react';
import { Modal, ModalHeader, ModalBody, Col, Button, Table, ListGroup,ListGroupItem,Badge } from 'reactstrap';

export default class WorkoutList extends React.Component {
    constructor(props){
      super(props)
      this.state = {
          visible: false,
          target: ''
      }
    }

    toggle = () => {
        this.setState(prevState=>({
            visible: !prevState.visible
        }));
    }

    callWorkoutData = (target) =>{
            this.setState({
                target: target,
                visible: true
            })
      }

    delete=(id, target)=>{
      this.props.onDelete(id, target)
    }

    checkWorkList = (arr, type) => {
        return arr.filter(e=> e.target===type).length
    }

    render() {
          const userInfo = this.props.userInfo
          const data = userInfo.filter(e => e.target===this.state.target);
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
            <Col><h2 className="text-center">운동 리스트</h2></Col>
            <ListGroup>
                <ListGroupItem tag="button" onClick={()=>this.callWorkoutData("가슴")} action>
                    {this.checkWorkList(userInfo, "가슴")===0
                        ?<p className="time text-muted h2">가슴</p>
                        :<p className="time text-muted h2">가슴<Badge color="primary">{this.checkWorkList(userInfo, "가슴")}종목 완수</Badge></p>
                    }
                </ListGroupItem>
                <ListGroupItem tag="button" onClick={()=>this.callWorkoutData("등")} action>
                    {this.checkWorkList(userInfo, "등")===0
                    ?(<p className="time text-muted h2">등</p>)
                    :(<p className="time text-muted h2">등<Badge color="primary">{this.checkWorkList(userInfo, "등")}종목 완수</Badge></p>)
                    }
                </ListGroupItem>
                <ListGroupItem tag="button" onClick={()=>this.callWorkoutData("어깨")} action>
                    {this.checkWorkList(userInfo, "어깨")===0
                    ?(<p className="time text-muted h2">어깨</p>)
                    :(<p className="time text-muted h2">어깨<Badge color="primary">{this.checkWorkList(userInfo, "어깨")}종목 완수</Badge></p>)
                    }
                </ListGroupItem>
                <ListGroupItem tag="button" onClick={()=>this.callWorkoutData("하체")} action>
                    {this.checkWorkList(userInfo, "하체")===0
                    ?(<p className="time text-muted h2">하체</p>)
                    :(<p className="time text-muted h2">하체<Badge color="primary">{this.checkWorkList(userInfo, "하체")}종목 완수</Badge></p>)
                    }
                </ListGroupItem>
                <ListGroupItem tag="button" onClick={()=>this.callWorkoutData("코어")} action>
                    {this.checkWorkList(userInfo, "코어")===0
                    ?(<p className="time text-muted h2">코어</p>)
                    :(<p className="time text-muted h2">코어<Badge color="primary">{this.checkWorkList(userInfo, "코어")}종목 완수</Badge></p>)
                    }
                </ListGroupItem>
            </ListGroup>
            <Modal isOpen={this.state.visible} toggle={this.toggle} size="lg">
                <ModalHeader className="text-muted" toggle={this.toggle}><h4>{this.props.date}<small>{this.state.time}</small></h4></ModalHeader>
                <ModalBody className="text-muted text-center">
                    <Table>
                    <thead>
                        <tr>
                        <th>운동이름</th>
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