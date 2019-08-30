import React from 'react';
import axios from 'axios';
import {Col, Container, Row} from 'reactstrap'
import DietList from '../components/DietList';
import DietForm from '../components/DietForm'
import DietChart from '../components/DietChart';
import Calendar from 'react-calendar'

export default class DietPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date: new Date(),
            userInfo: []
        }
    };

    componentDidMount(){
        axios.get('/user/dietmanage', {params: {date: this.state.date.toLocaleDateString()}})
        .then((res)=>{
            this.setState({
                userInfo: res.data
            })
        })
    };
    
    componentDidUpdate(prevProps, prevState){
        if(this.state.date!==prevState.date){
            axios.get('/user/dietmanage', {params: {date: this.state.date.toLocaleDateString()}})
            .then((res)=>{
                this.setState({
                    userInfo: res.data
                })
            })
        }
      };

    dateChange = (date) => {
        this.setState({
            date: date
        })
    }
 
    create=(data)=>{
        data.date = this.state.date.toLocaleDateString()
        axios.post('/user/dietmanage', data)
        .then((res)=>{
            const {userInfo} = this.state
            this.setState({
                userInfo: userInfo.concat(res.data)
            })
        })
    };
    
    delete = (id, time) =>{
        axios.delete('/user/dietmanage',
            {
                data: {
                    id: id,
                    date: this.state.date.toLocaleDateString(),
                    time: time
                }
            })
        .then((res)=>{
            this.setState({
                userInfo: res.data
            })
        })
    };
    
 
    render(){
        return(
            <Container className="body" fluid>
                <header>
                    <h3 className="text-center">Diet Management</h3>
                </header>
                <Row>
                    <Col lg={{size:4, offset:2}} md={6}>
                        <Calendar
                        onChange={this.dateChange}
                            value={this.state.date}
                        />
                    </Col>
                    <Col lg={4} md={6}>
                        <DietChart date={this.state.date.toLocaleDateString()} userInfo={this.state.userInfo}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{size:4, offset:2}} md={6}>
                        <DietForm onCreate={this.create} date={this.state.date.toLocaleDateString()}/>
                    </Col>
                    <Col lg={4} md={6}>
                        <DietList userInfo={this.state.userInfo} date={this.state.date.toLocaleDateString()} onDelete={this.delete}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}