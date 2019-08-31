import React from 'react';
import axios from 'axios'
import {Progress, Col, Row} from 'reactstrap'

export default class DietChart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: true,
            goalCalorie: '',
            goalCarb:'',
            goalProtein : '',
            goalFat: '',
        }
    }

    componentDidMount(){
        axios.get('/user/calorie')
        .then((res)=>{
            if(res.data!==null){
                this.setState({
                    goalCalorie: res.data.calorie,
                    goalCarb: res.data.carb,
                    goalProtein : res.data.protein,
                    goalFat: res.data.fat,
                    visible: true
                })
            }else{
                this.setState({
                    visible: false
                })
            }
        })
    }

    sumProperty = (arr, type) => {
        return arr.reduce((total, obj) => {
          return total + obj[type];
        }, 0);
    }
      
    render(){
        
        const {userInfo} = this.props;

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
                    <Col md={12}>
                        <h3 className="h2"><small className="small">Calorie  </small>{calorie}<small className="small">/{this.state.goalCalorie}kcal</small></h3>
                    </Col>
                    <Col md={12}>
                        <Progress animated color="success" value={calorie} max={this.state.goalCalorie}>{calorie} of {this.state.goalCalorie}</Progress>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div><h3 className="h2"><small className="small">Carb   </small>{carb}<small className="small">/{this.state.goalCarb}g</small></h3></div>
                    </Col>
                    <Col md={12}>
                        <Progress animated color= "danger" value={carb} max={this.state.goalCarb}>{carb} of {this.state.goalCarb}</Progress>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h3 className="h2"><small className="small">Protein  </small>{protein}<small className="small">/{this.state.goalProtein}g</small></h3>
                    </Col>
                    <Col md={12}>
                        <Progress animated color= "info" value={protein} max={this.state.goalProtein}>{protein} of {this.state.goalProtein}</Progress>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h3 className="h2"><small className="small">Fat  </small>{fat}<small className="small">/{this.state.goalFat}g</small></h3>
                    </Col>
                    <Col md={12}>
                        <Progress animated color= "warning" value={fat} max={this.state.goalFat}>{fat} of {this.state.goalFat}</Progress>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}