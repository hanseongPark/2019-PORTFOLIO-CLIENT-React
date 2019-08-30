import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import CalorieForm from '../components/CalorieForm';
import CalorieChart from '../components/CalorieChart';
import axios from 'axios';



export default class Calculrater extends React.Component{
    constructor(props){
        super(props)       
        this.state ={
            visible: false,
            age: '',
            height: '',
            weight: '',
            gender: '',
            activity: '1.2',
            goal: 'diet',
            calorie: '',
            fat: '',
            carb: '',
            protein: '',
        }
    }

    componentDidMount(){
        axios.get('/user/calorie')
        .then((res)=>{
            if(res.data!==null){
                this.setState(res.data)
                this.setState({visible: true})
            }else{
                this.setState({visible: false})
            }
        })
    }

    calculrate = (data) =>{
        axios.post('/user/calorie', data)
        .then((res)=>{
            this.setState(res.data)
        })
        .then(this.setState({visible: true}))
    }

    valueChange = () =>{
        this.setState({visible: false})
    }
    
    render(){
        return(
            <Container className="body" fluid>
                <header>
                    <h3 className="text-center">칼로리 계산기</h3>
                </header>
                <Row>
                    <Col lg={{size:4, offset:2}} md={6}>
                        <CalorieForm onValueChange={this.valueChange} onCreate={this.calculrate}/>
                    </Col>
                    <Col lg={4} md={6}>
                        <CalorieChart {...this.state}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}
