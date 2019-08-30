import React from 'react';
import {Col, Button, Form, FormGroup, Input, Label, InputGroup, InputGroupAddon, CustomInput, Card, CardBody, CardFooter } from 'reactstrap'

export default class Calculrater extends React.Component{
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

    componentDidUpdate(prevProps){
        if(this.props!==prevProps){
            this.setState(this.props)
        }
    }

    handleAgeChange = (event) => {
        this.props.onValueChange()
        this.setState({age: event.target.value})
    }
    handleWeightChange = (event) => {
        this.props.onValueChange()
        this.setState({weight: event.target.value})
    }
    handleHeightChange = (event) => {
        this.props.onValueChange()
        this.setState({height: event.target.value})
    }
    handleGenderChange = (event) => {
        this.props.onValueChange()
        this.setState({gender: event.currentTarget.value})
    }
    handleActivityChange = (event) => {
        this.props.onValueChange()
        this.setState({activity: event.target.value})
    }
    handleGoalChange = (event) => {
        this.props.onValueChange()
        this.setState({goal: event.currentTarget.value})
    }

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