import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Input, Label, Form, FormGroup, Button, InputGroup, InputGroupAddon, Col} from 'reactstrap'

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
    
    handleTimeChange=(e)=>{
        this.setState({time: e.target.value})
    }
    handleFoodChange=(e)=>{
        this.setState({food: e.target.value})
    }
    handleGramChange=(e)=>{
        this.setState({gram: e.target.value})
    }
    handleCalorieChange=(e)=>{
        this.setState({calorie: e.target.value})
    }
    handleCarbChange=(e)=>{
        this.setState({carb: e.target.value})
    }
    handleProteinChange=(e)=>{
        this.setState({protein: e.target.value})
    }
    handleFatChange=(e)=>{
        this.setState({fat: e.target.value})
    }
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