import React from 'react';
import {Card, CardBody, CardHeader, CardFooter, Input, Label, Form, FormGroup, Button, InputGroup, InputGroupAddon, Col} from 'reactstrap'

export default class WorkoutForm extends React.Component{
    constructor(props){
        super(props)
        this. state = {
            workname: '',
            target: '가슴',
            workweight:'',
            sets: '',
            reps: '',
        }
    }
    
    handleWorknameChange=(e)=>{
        this.setState({workname: e.target.value})
    }
    handleTargetChange=(e)=>{
        this.setState({target: e.target.value})
    }
    handleWorkweightChange=(e)=>{
        this.setState({workweight: e.target.value})
    }
    handleSetsChange=(e)=>{
        this.setState({sets: e.target.value})
    }
    handleRepsChange=(e)=>{
        this.setState({reps: e.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.onCreate(this.state)
        this.setState({
                workname: '',
                sets:'',
                reps: '',
                workweight: '',
        })
    }

    render(){
        return(
            <Card className="text-muted text-center">
                <CardHeader><h3>{this.props.date}</h3></CardHeader>
                <Form method="post" onSubmit={this.handleSubmit}>
                    <CardBody>  
                    <FormGroup row>
                        <Label for="target" md={4} xs={4}>운동 부위</Label>
                        <Col md={8} xs={8}>
                            <Input type="select" name="target" id="target" value={this.state.target} onChange={this.handleTargetChange}>
                                <option value="가슴">가슴</option>
                                <option value="등">등</option>
                                <option value="어깨">어깨</option>
                                <option value="하체">하체</option>
                                <option value="코어">코어</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="workname" md={4} xs={4}>운동 이름</Label>
                        <Col md={8} xs={8}>
                            <Input type="text" name="workname" id="workname" placeholder="운동 이름" value={this.state.workname} onChange={this.handleWorknameChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="workweight" md={4} xs={4}>무게</Label>
                        <Col md={8} xs={8}>
                            <InputGroup>
                                <Input type="text" name="workweight" id="workweight" placeholder='맨몸일 시 본인 몸무게' value={this.state.workweight} onChange={this.handleWorkweightChange} />
                                <InputGroupAddon addonType="append">Kg</InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={6} xs={6}>
                            <Label for="sets" >세트 수</Label>
                            <InputGroup>
                                <Input type="text" name="sets" id="sets" placeholder="세트" value={this.state.sets} onChange={this.handleSetsChange}/>
                                <InputGroupAddon addonType="append">sets</InputGroupAddon>
                            </InputGroup>
                        </Col>
                        <Col md={6} xs={6}>
                            <Label for="reps" >반복 수</Label>
                            <InputGroup>
                                <Input type="text" name="reps" id="reps" placeholder="반복 수" value={this.state.reps} onChange={this.handleRepsChange} />
                                <InputGroupAddon addonType="append">reps</InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button type="submit">입력</Button>
                    </CardFooter>
                </Form>
            </Card>
        )
    }
}