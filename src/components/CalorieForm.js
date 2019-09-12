import React from 'react';
import {Col, Button, Form, FormGroup, Input, Label, InputGroup, InputGroupAddon, CustomInput, Card, CardBody, CardFooter } from 'reactstrap'

//CalorieForm 은 칼로리 계산기의 폼 양식을 렌더링합니다.
//자신의 상태값으로 사용자의 정보를 담고 있으며 이를 상위 컴포넌트에
//전달합니다.
export default class CalorieForm extends React.Component{
    constructor(props){
        super(props)       
        this.state ={
            age: '',
            height: '',
            weight: '',
            gender: '',
            activity: '1.2',
            goal: '다이어트',
        }
    }

    //상위 컴포넌트의 props 값이 변할 시 변경사항을 바로 자신의
    //상태값으로 다시 저장하게 됩니다.
    componentDidUpdate(prevProps){
        if(this.props!==prevProps){
            this.setState(this.props)
        }
    }

    //나이 입력창의 값을 상태값으로 저장하는 메소드입니다. 이때 값이 변하면
    //상위 컴포넌트의 valueChange를 호출하여 calorieChart를 숨깁니다.
    handleAgeChange = (event) => {
        this.props.onValueChange()
        this.setState({age: event.target.value})
    }
    //몸무게 입력창의 값을 상태값으로 저장하는 메소드입니다. 이때 값이 변하면
    //상위 컴포넌트의 valueChange를 호출하여 calorieChart를 숨깁니다.
    handleWeightChange = (event) => {
        this.props.onValueChange()
        this.setState({weight: event.target.value})
    }
    //키 입력창의 값을 상태값으로 저장하는 메소드입니다. 이때 값이 변하면
    //상위 컴포넌트의 valueChange를 호출하여 calorieChart를 숨깁니다.
    handleHeightChange = (event) => {
        this.props.onValueChange()
        this.setState({height: event.target.value})
    }
    //성별 입력창의 값을 상태값으로 저장하는 메소드입니다. 이때 값이 변하면
    //상위 컴포넌트의 valueChange를 호출하여 calorieChart를 숨깁니다.
    handleGenderChange = (event) => {
        this.props.onValueChange()
        this.setState({gender: event.currentTarget.value})
    }
    //활동량 입력창의 값을 상태값으로 저장하는 메소드입니다. 이때 값이 변하면
    //상위 컴포넌트의 valueChange를 호출하여 calorieChart를 숨깁니다.
    handleActivityChange = (event) => {
        this.props.onValueChange()
        this.setState({activity: event.target.value})
    }
    //목표 입력창의 값을 상태값으로 저장하는 메소드입니다. 이때 값이 변하면
    //상위 컴포넌트의 valueChange를 호출하여 calorieChart를 숨깁니다.
    handleGoalChange = (event) => {
        this.props.onValueChange()
        this.setState({goal: event.currentTarget.value})
    }

    //calculrate 버튼을 누를 시 호출되는 메소드입니다. e.preventDefault 를 통해
    //submit 시 페이지가 새로고침되는 것을 방지합니다. 이후 사용자의 상태값을 담아 
    //상위 컴포넌트의 onCreate 메소드를 호출합니다.
    calculrate = (e) =>{
        e.preventDefault();
        this.props.onCreate(this.state)
    }
    
    render(){
        return(
                <Card className="text-muted text-center">
                <Form method="post" onSubmit={this.calculrate}>
                    <CardBody>
                        <FormGroup row> 
                            <Label for="age" md={3} xs={4}>나이</Label>
                            <Col md={9} xs={8}>
                                <InputGroup>
                                <InputGroupAddon addonType="prepend">만</InputGroupAddon>
                                    <Input type="text" name="age" id="age" value={this.state.age} placeholder="만으로 기입" onChange={this.handleAgeChange}></Input>
                                    <InputGroupAddon addonType="append">세</InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="weight"  md={3} xs={4}>체중</Label>
                            <Col md={9} xs={8}>
                                <InputGroup>
                                <Input type="text" name="weight" id="weight" value={this.state.weight} placeholder="kg단위" onChange={this.handleWeightChange}></Input>
                                <InputGroupAddon addonType="append">kg</InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="height" md={3} xs={4}>키</Label>
                            <Col md={9} xs={8}>
                                <InputGroup>
                                <Input type="text" name="height" id="height" value={this.state.height} placeholder="cm단위" onChange={this.handleHeightChange}></Input>
                                <InputGroupAddon addonType="append">cm</InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label md={3} xs={4}>성별</Label>
                            <Col  md={9} xs={8}>
                                <CustomInput type="radio" id="male" name="gender" value="male" onChange={this.handleGenderChange} label="남자" inline/>
                                <CustomInput type="radio" id="female" name="gender" value="female" onChange={this.handleGenderChange} label="여자" inline />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                        <Label for="activity" md={3} xs={4}>활동량</Label>
                        <Col md={9} xs={8}>
                            <CustomInput type="select" name="activity" id="activity" value={this.state.activity} onChange={this.handleActivityChange}>
                                <option value="1.2">사무직, 주로 앉은 활동</option>
                                <option value="1.375">주 1-3회 운동</option>
                                <option value="1.55">주 3-5회 운동</option>
                                <option value="1.755">주 6-7회 운동</option>
                                <option value="1.9">운동선수</option>
                            </CustomInput>
                        </Col>
                        </FormGroup>
                        <FormGroup row>
                        <Label md={3} xs={4}>목표</Label>
                        <Col md={9} xs={8}>
                            <CustomInput type="radio" id="다이어트" name="goal" value="다이어트" onChange={this.handleGoalChange} label="다이어트" inline/>
                            <CustomInput type="radio" id="체중유지" name="goal" value="체중유지" onChange={this.handleGoalChange} label="체중유지" inline/>
                            <CustomInput type="radio" id="체중증가" name="goal" value="체중증가" onChange={this.handleGoalChange} label="체중증가" inline /> 
                        </Col>
                        </FormGroup>
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button type="submit" onClick={this.calculrate}>Calculrate</Button>
                    </CardFooter>
                </Form>
                </Card>
            )
        }
    }