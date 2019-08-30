import React from 'react';
import {Calendar} from 'react-calendar';
import {Col, Row, Container} from 'reactstrap';
import WorkoutList from '../components/WorkoutList';
import WorkoutForm from '../components/WorkoutForm'
import WorkoutGraph from '../components/WorkoutChart';
import axios from 'axios'


export default class WorkoutPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date: new Date(),
            userInfo: []
        }
    }

    componentDidMount(){
        axios.get('/user/workout', {params: {date: this.state.date.toLocaleDateString()}})
        .then((res)=>{
            this.setState({
                userInfo: res.data
            })
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.date!==prevState.date){
            axios.get('/user/workout', {params: {date: this.state.date.toLocaleDateString()}})
            .then((res)=>{
                this.setState({
                    userInfo: res.data
                })
            })
        }
    }

    dateChange = (date) => {
        this.setState({date})
    }
    
    create=(data)=>{
        data.date=this.state.date.toLocaleDateString()
        axios.post('/user/workout', data)
        .then((res)=>{
            const {userInfo} = this.state
            this.setState({
                userInfo: userInfo.concat(res.data)
            })
        })
    }

    delete = (id, target) =>{
        axios.delete('/user/workout',
        {
            data: {
                id: id,
                target: target,
                date: this.state.date.toLocaleDateString()
            }
        })
        .then((res)=>{
            this.setState({
                userInfo: res.data
            })
        })
    }

    render(){
        return(
            <div>
                <Container className="body" fluid>
                    <header>
                        <h3 className="text-center">운동관리</h3>
                    </header>
                    <Row>
                        <Col lg={{size:4, offset:2}} md={6}>
                            <Calendar
                                onChange={this.dateChange}
                                value={this.state.date}
                            />
                        </Col>
                        <Col lg={4} md={6}>
                            <br></br>
                            <WorkoutGraph date={this.state.date.toLocaleDateString()} userInfo={this.state.userInfo}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{size:4, offset:2}} md={6}>
                            <WorkoutForm onCreate={this.create} date={this.state.date.toLocaleDateString()}/>
                            </Col>
                        <Col lg={4} md={6}>
                            <WorkoutList userInfo={this.state.userInfo} date={this.state.date.toLocaleDateString()} onDelete={this.delete}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}