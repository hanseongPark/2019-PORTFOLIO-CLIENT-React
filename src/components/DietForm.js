import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Input, Label, Form, FormGroup, Button, InputGroup, InputGroupAddon, Col} from 'reactstrap'

//DietForm은 사용자가 자신의 식단을 입력할 때 쓰이는 컴포넌트입니다.
//상태값으로 음식 이름, 시간, 음식의 양, 영양성분을 가지며 이를 submit을
//통해 상위컴포넌트로 보냅니다.
export default class DietForm extends React.Component{
    constructor(props){
        super(props)
        this. state = {
            food: '',
            time: '아침',
            gram:'',
            calorie: '',
            fat: '',
            carb: '',
            protein: '',
        }
    }
    
    //handleTimeChange 함수는 사용자가 음식의 섭취 시간을 변경할 때 호출되어
    //변경사항을 상태값으로 저장합니다.
    handleTimeChange=(e)=>{
        this.setState({time: e.target.value})
    }
    //handleFoodChange 함수는 사용자가 음식의 이름을 변경할 때 호출되어
    //변경사항을 상태값으로 저장합니다.
    handleFoodChange=(e)=>{
        this.setState({food: e.target.value})
    }
    //handleGramChange 함수는 사용자가 음식의 양을 변경할 때 호출되어
    //변경사항을 상태값으로 저장합니다.
    handleGramChange=(e)=>{
        this.setState({gram: e.target.value})
    }
    //handleCalorieChange 함수는 사용자가 음식의 칼로리를 변경할 때 호출되어
    //변경사항을 상태값으로 저장합니다.
    handleCalorieChange=(e)=>{
        this.setState({calorie: e.target.value})
    }
    //handleCarbChange 함수는 사용자가 탄수화물 양을 변경할 때 호출되어
    //변경사항을 상태값으로 저장합니다.
    handleCarbChange=(e)=>{
        this.setState({carb: e.target.value})
    }
    //handleProteinChange 함수는 사용자가 음식의 단백질량을 변경할 때 호출되어
    //변경사항을 상태값으로 저장합니다.
    handleProteinChange=(e)=>{
        this.setState({protein: e.target.value})
    }
    //handleFatChange 함수는 사용자가 음식의 지방량을 변경할 때 호출되어
    //변경사항을 상태값으로 저장합니다.
    handleFatChange=(e)=>{
        this.setState({fat: e.target.value})
    }

    //handleSubmit은 사용자가 음식을 추가할 때 호출됩니다. event.preventDefault를 통해
    //페이지가 새로 고침되는 것을 방지한 후 상위 컴포넌트의 onCreate 함수에 상태값을 넣어
    //전송합니다. 이후에는 상태값을 다시 초기화합니다.
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.onCreate(this.state)
        this.setState({
                food: '',
                gram:'',
                calorie: '',
                fat: '',
                carb: '',
                protein: '',
        })
    }

    render(){
        return(
            <Card className="text-muted text-center">
                <CardHeader><h3>{this.props.date}</h3></CardHeader>
                <Form method="post" onSubmit={this.handleSubmit}>
                    <CardBody>
                        <FormGroup row>
                            <Label for="time" md={4} xs={4}>섭취 시간</Label>
                            <Col md={8} xs={8}>
                                <Input type="select" name="time" id="time" value={this.state.time} onChange={this.handleTimeChange}>
                                    <option value="아침">아침</option>
                                    <option value="오전 간식">오전 간식</option>
                                    <option value="점심">점심</option>
                                    <option value="오후 간식">오후 간식</option>
                                    <option value="저녁">저녁</option>
                                    <option value="야식">야식</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="food" md={4} xs={4}>음식 이름</Label>
                            <Col md={8} xs={8}>
                                <Input type="text" name="food" id="food" placeholder="음식 이름" value={this.state.food} onChange={this.handleFoodChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="gram" md={4} xs={4}>음식의 양</Label>
                            <Col md={8} xs={8}>
                                <InputGroup>
                                    <Input type="text" name="gram" id="gram" placeholder="음식의 양" value={this.state.gram} onChange={this.handleGramChange}/>
                                    <InputGroupAddon addonType="append">g</InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="calorie" md={4} xs={4}>칼로리</Label>
                            <Col md={8} xs={8}>
                                <Input type="text" name="calorie" id="calorie" placeholder="칼로리" value={this.state.calorie} onChange={this.handleCalorieChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={4} xs={4}>
                                <Label for="carb">탄수화물</Label>
                                <InputGroup>
                                    <Input type="text" name="carb" id="carb"  value={this.state.carb} onChange={this.handleCarbChange} />
                                    <InputGroupAddon addonType="append">g</InputGroupAddon>
                                </InputGroup>  
                            </Col>
                            <Col md={4} xs={4}>
                                <Label for="protein" >단백질</Label>   
                                <InputGroup>
                                    <Input type="text" name="protein" id="protein"  value={this.state.protein} onChange={this.handleProteinChange} />
                                    <InputGroupAddon addonType="append">g</InputGroupAddon>
                                </InputGroup>
                            </Col>
                            <Col md={4} xs={4}>
                                <Label for="fat">지방</Label>
                                <InputGroup>
                                    <Input type="text" name="fat" id="fat"  value={this.state.fat} onChange={this.handleFatChange}/>
                                    <InputGroupAddon addonType="append">g</InputGroupAddon>
                                </InputGroup>           
                            </Col>
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button type="submit">입력</Button>
                    </CardFooter>
                </Form>
            </Card>
        )
    }
}