import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import CalorieForm from '../components/CalorieForm';
import CalorieChart from '../components/CalorieChart';
import axios from 'axios';

//Caluratre.js는 칼로리 계산기 페이지를 보여주는 컴포넌트들을 담고 있는 컨테이너 파일입니다.
//우선 상태값으로 유저의 나이, 몸무게, 키, 성별, 활동량 등의 정보로 하루 칼로리, 영양성분을
//파악하여 저장합니다. visible 속성은 그래프 차트를 나타내는 속성입니다.
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

    //컴포넌트가 마운트된 후 axios를 통해 서버에 user/calorie 정보를 요청합니다.
    //이후 이전 계산 정보가 있다면 visible의 상태값을 true로 만들며 그래프와 정보를
    //보여줍니다. 만약 이전 데이터가 없다면 그래프는 숨김 상태로 유지합니다. 
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

    //calculrate 는 계산하기 버튼을 클릭했을 때 호출되는 메소드입니다.
    //POST:/user/calorie 요청을 통해 데이터를 서버로 보내 저장하거나
    //새로운 정보로 업데이트 한 후 성공한 정보를 다시 렌더링합니다.
    calculrate = (data) =>{
        axios.post('/user/calorie', data)
        .then((res)=>{
            this.setState(res.data)
        })
        .then(this.setState({visible: true}))
    }
    
    //valueChange 는 폼의 사용자 value 값이 변경되면 그래프를 숨깁니다.
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
