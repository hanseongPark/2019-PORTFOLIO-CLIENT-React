import React from 'react';
import axios from 'axios';
import {Col, Container, Row} from 'reactstrap'
import DietList from '../components/DietList';
import DietForm from '../components/DietForm'
import DietChart from '../components/DietChart';
import Calendar from 'react-calendar'

//DietPage 는 사용자에게 식단관리를 위한 페이지를 보여줍니다.
//상태값으로 date를 가지며 date의 변화에 따라 다른 식단 정보를 보여줍니다.
//또한 userInfo에 저장된 유저의 식단 정보를 하위 컴포넌트에 속성값으로
//제공합니다.
export default class DietPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date: new Date(),
            userInfo: []
        }
    };

    //우선 컴포넌트가 Mount 된 후 ajax요청을 통해 유저가 해당 일에 저장해 놓은 정보가 있는지를
    //확인합니다.
    componentDidMount(){
        axios.get('/user/dietmanage', {params: {date: this.state.date.toLocaleDateString()}})
        .then((res)=>{
            this.setState({
                userInfo: res.data
            })
        })
    };
 
    //componentDidUpdate 함수를 통해 컴포넌트의 date 속성이 변할 때마다 userInfo의 값을 서버로부터
    //새로 불러와 세팅하도록 하였습니다.
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

    //dateChange 함수는 사용자가 달력 UI를 통해 날짜를 변경할 시 새로운 date를 상태값으로
    //저장합니다.
    dateChange = (date) => {
        this.setState({
            date: date
        })
    }
    
    //create 함수는 사용자가 Dietform 을 통해 식단 정보를 입력한 후 추가 버튼을 클릭했을 때 
    //호출되는 함수입니다. POST:/user/dietmanage 를 통해 서버 DB에 식단 정보를 저장하고
    //그와 동시에 userInfo에도 식단정보를 추가함으로써 하위 컴포넌트들이 식단 정보의 변경을
    //반영할 수 있도록 하였습니다.
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
    
    //delete 함수는 유저가 식단 리스트에서 삭제 버튼을 클릭했을 시 호출되는 함수입니다.
    //DELETE:/user/dietmanage 요청을 통해 우선 id, date, time 값을 바탕으로 정보를 삭제합니다.
    //이후에는 서버에서 변경된 데이터를 res로 받아 다시 상태값으로 저장하게 됩니다.
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