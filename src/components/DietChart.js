import React from 'react';
import axios from 'axios'
import {Progress, Col, Row} from 'reactstrap'

//DietChart는 사용자의 식단 칼로리, 영양성분을 목표 칼로리와 목표 영양성분을 그래프로 비교해주며
//사용자에게 하루 달성치를 제공합니다. 상태값으로는 사용자가 영양소 계산기를 통해 파악한 칼로리와 
//영양성분을 goalCalorie, goalCarb, goalProtein, goalFat의 이름으로 상태값을 가집니다.
export default class DietChart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            goalCalorie: '',
            goalCarb:'',
            goalProtein : '',
            goalFat: '',
        }
    }

    //사용자 데이터간 비교를 위하여 이 컴포넌트가 마운트될 때 ajax 서버 요청을 통해 사용자의 목표 칼로리와
    //영양성분을 받아와 상태값으로 저장합니다. 만약 데이터가 없다면 0을 값으로 가집니다.
    componentDidMount(){
        axios.get('/user/calorie')
        .then((res)=>{
            if(res.data!==null){
                this.setState({
                    goalCalorie: res.data.calorie,
                    goalCarb: res.data.carb,
                    goalProtein : res.data.protein,
                    goalFat: res.data.fat,
                })
            }else{
                this.setState({
                    goalCalorie: 0,
                    goalCarb: 0,
                    goalProtein : 0,
                    goalFat: 0,
                })
            }
        })
    }

    //sumProperty는 사용자의 식단을 상위 컴포넌트로 부터 속성값으로 받아와 각 입력 식단을 칼로리, 탄수화물
    //단백질, 지방으로 각각 분류하여 값을 모두 더해 하루 총 칼로리와 영양성분을 구합니다.
    sumProperty = (arr, type) => {
        return arr.reduce((total, obj) => {
          return total + obj[type];
        }, 0);
    }
      
    render(){
        
        const {userInfo} = this.props;
        //상위컴포넌트의 속성을 userInfo 로 받은 후 sumProperty함수를 이용하여 각 식단의 값을 모두 더해줍니다.
        let calorie = 0;
        calorie += this.sumProperty(userInfo, "calorie");

        let carb = 0;
        carb +=this.sumProperty(userInfo, "carb");

        let protein = 0;
        protein +=this.sumProperty(userInfo, "protein");

        let fat = 0;
        fat +=this.sumProperty(userInfo, "fat");

        return(
            <React.Fragment>
                <header>
                    <p className="h1 text-center">Diet Progress</p>
                </header>
                <Row>
                    {/* 이후 상태값의 목표칼로리와 영양성분을 하루 식단의 칼로리, 영양성분과 비교하여
                    Progress바를 이용해 시각적으로 표현해주었습니다. */}
                    <Col md={12}>
                        <h3 className="h2"><small className="small">Calorie  </small>{calorie}<small className="small">/{this.state.goalCalorie}kcal</small></h3>
                    </Col>
                    <Col md={12}>
                        <Progress animated color="success" value={calorie} max={this.state.goalCalorie}></Progress>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div><h3 className="h2"><small className="small">Carb   </small>{carb}<small className="small">/{this.state.goalCarb}g</small></h3></div>
                    </Col>
                    <Col md={12}>
                        <Progress animated color= "danger" value={carb} max={this.state.goalCarb}></Progress>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h3 className="h2"><small className="small">Protein  </small>{protein}<small className="small">/{this.state.goalProtein}g</small></h3>
                    </Col>
                    <Col md={12}>
                        <Progress animated color= "info" value={protein} max={this.state.goalProtein}></Progress>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h3 className="h2"><small className="small">Fat  </small>{fat}<small className="small">/{this.state.goalFat}g</small></h3>
                    </Col>
                    <Col md={12}>
                        <Progress animated color= "warning" value={fat} max={this.state.goalFat}></Progress>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}