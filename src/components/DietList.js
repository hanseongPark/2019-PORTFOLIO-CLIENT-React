import React from 'react';
import { Modal, ModalHeader, ModalBody, Col, Button, Table, Badge, ListGroup, ListGroupItem } from 'reactstrap';

export default class DietList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            time: '',
        }
    }

    toggle = () => {
        this.setState(prevState=>({
            visible: !prevState.visible
        }));
    }

    delete=(id, time)=>{
        this.props.onDelete(id, time)
    }

    callDietData = (time) =>{
        this.setState({
            time: time,
            visible: true,
        })
    }

    sumCalorie = (arr, type) => {
       return arr.filter(e=> e.time===type).reduce((total, obj) => {
          return total + obj["calorie"];
        }, 0);
    }

  render() {
    const userInfo = this.props.userInfo
    const data = userInfo.filter(e => e.time===this.state.time);
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
            <Col><h2 className="text-center">식단 리스트</h2></Col>
            <ListGroup>
                <ListGroupItem tag="button" onClick={()=>this.callDietData("아침")} action>
                    {this.sumCalorie(userInfo, "아침")===0
                        ?<p className="time text-muted h2">아침</p>
                        :<p className="time text-muted h2">아침<Badge color="primary">{this.sumCalorie(userInfo, "아침")}kcal</Badge></p>
                    }
                </ListGroupItem>
                <ListGroupItem tag="button" onClick={()=>this.callDietData("오전 간식")} action>
                    {this.sumCalorie(userInfo, "오전 간식")===0
                    ?(<p className="time text-muted h2">오전 간식</p>)
                    :(<p className="time text-muted h2">오전 간식<Badge color="primary">{this.sumCalorie(userInfo, "오전 간식")}kcal</Badge></p>)
                    }
                </ListGroupItem>
                <ListGroupItem tag="button" onClick={()=>this.callDietData("점심")} action>
                    {this.sumCalorie(userInfo, "점심")===0
                    ?(<p className="time text-muted h2">점심</p>)
                    :(<p className="time text-muted h2">점심<Badge color="primary">{this.sumCalorie(userInfo, "점심")}kcal</Badge></p>)
                    }
                </ListGroupItem>
                <ListGroupItem tag="button" onClick={()=>this.callDietData("오후 간식")} action>
                    {this.sumCalorie(userInfo, "오후 간식")===0
                    ?(<p className="time text-muted h2">오후 간식</p>)
                    :(<p className="time text-muted h2">오후 간식<Badge color="primary">{this.sumCalorie(userInfo, "오후 간식")}kcal</Badge></p>)
                    }
                </ListGroupItem>
                <ListGroupItem tag="button" onClick={()=>this.callDietData("저녁")} action>
                    {this.sumCalorie(userInfo, "저녁")===0
                    ?(<p className="time text-muted h2">저녁</p>)
                    :(<p className="time text-muted h2">저녁<Badge color="primary">{this.sumCalorie(userInfo, "저녁")}kcal</Badge></p>)
                    }
                </ListGroupItem>
                <ListGroupItem tag="button" onClick={()=>this.callDietData("야식")} action>
                    {this.sumCalorie(userInfo, "야식")===0
                    ?(<p className="time text-muted h2">야식</p>)
                    :(<p className="time text-muted h2">야식<Badge color="primary">{this.sumCalorie(userInfo, "야식")}kcal</Badge></p>)
                    }
                </ListGroupItem>
            </ListGroup>
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