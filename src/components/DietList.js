import React from 'react';
import { Modal, ModalHeader, ModalBody, Col, Button, Table, Badge, ListGroup, ListGroupItem } from 'reactstrap';

//DietList는 사용자에게 식단을 보여주며 사용자가 식단리스트의 시간을 클릭했을 때,
//Modal 을 이용해 식단 리스트를 새창을 통해 보여줍니다. 상태값으로는 Modal을 보이고,
//숨기기 위해 visible과 시간별 식단을 분류하기 위하여 time을 가집니다.
export default class DietList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            time: '',
        }
    }

    //토글 함수는 모달창의 닫기버튼을 사용자가 클릭했을 때 상태값을 변경합니다.
    toggle = () => {
        this.setState(prevState=>({
            visible: !prevState.visible
        }));
    }

    //delete 함수는 사용자가 식단리스트에서 삭제 버튼을 클릭할 때 발생합니다.
    //상위 컴포넌트의 onDelete 함수를 호출하며 id와 time을 인자값으로 보냅니다.
    delete=(id, time)=>{
        this.props.onDelete(id, time)
    }

    //callData는 사용자가 식단리스트의 시간을 클릭했을 때 호출됩니다. 모달창을 보여주기 위해
    //visible을 true로 만들고 속성값의 user 식단리스트를 시간대별로 분류하기 위해 time을 상태값으로
    //저장합니다.
    callDietData = (time) =>{
        this.setState({
            time: time,
            visible: true,
        })
    }

    //sumCalorie는 식단리스트에서 사용자가 이 시간대에 얼만큼의 칼로리를 섭취했는지 파악하기 위해 
    //각 시간대별 칼로리를 합산한 후 Badge를 통해 사용자에게 보여줍니다. 우선 배열 filter 를 이용해
    //식단을 분류합니다. 이후 reduce 함수를 통해 각 식단의 칼로리 값을 모두 더한 후 반환합니다.
    sumCalorie = (arr, type) => {
       return arr.filter(e=> e.time===type).reduce((total, obj) => {
          return total + obj["calorie"];
        }, 0);
    }

  render() {
    const userInfo = this.props.userInfo
    //우선 상위 컴포넌트의 속성값을 userInfo 로 받습니다. 이후에는 filter 함수를 이용하여 식단 리스트를 
    //현재의 상태값에 맞게 분류 합니다. 이후 분류된 식단을 map 함수를 이용하여 table의 data로 렌더링합니다.
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
                {/* 각 리스트에는 삼항연산자를 이용하여 해당 식단 리스트가 없다면 그냥 시간대를 표시하지만 식단리스트가 존재한다면
                해당 시간대별 식단을 sumCalorie 를 이용하여 해당 시간대의 총 섭취 칼로리를 Badge를 이용하여 표시해줍니다. */}
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