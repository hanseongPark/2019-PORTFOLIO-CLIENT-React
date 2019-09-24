import React from 'react';
import { Line } from 'react-chartjs-2';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, Col} from 'reactstrap';
import axios from 'axios';

export default class WorkoutGraph extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dropdownOpen: false,
            visible: true,
            target: '가슴',
            data: [],
        }
    }

    componentDidMount(){
        axios.post('/user/workout/chartdata', {date: this.props.date, target: this.state.target})
        .then((res)=>{
            if(res.data!==null){
                const data=res.data.reverse()
                this.setState({
                    data: data
                })
            }else{
                this.setState({
                    visible: false
                })
            }
        })
    }

    componentDidUpdate(prevPops){
        if(this.props.date!==prevPops.date|| this.props.userInfo!==prevPops.userInfo){
            axios.post('/user/workout/chartdata', {date: prevPops.date, target: this.state.target})
            .then((res)=>{
                if(res.data!==null){
                    const data=res.data.reverse()
                    this.setState({
                        data: data
                    })
                }else{
                    this.setState({
                        visible: false
                    })
                }
            })
        }
    }

    toggle= () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    callData = (e) =>{
        this.setState({target: e.target.value})
        axios.post('/user/workout/chartdata', {date: this.props.date, target: e.target.value})
            .then((res)=>{
                if(res.data!==null){
                    const data=res.data.reverse()
                    this.setState({
                        data: data
                    })
                }else{
                    this.setState({
                        visible: false
                    })
                }
            })
    }

    render(){
        const data = this.state.data
        const listDate = data.map((src)=>{
            let list = []
            list.push(src.date)
            return list
        })
        const listVolume = data.map((src)=>{
            let list = []
            list.push(src.volume)
            return list
        })
        const LineData = {
        labels: 
            listDate
          ,
          datasets: [
            {
              label: "Workout Volume",
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              data: 
                  listVolume
                
            }
          ]
        };
      
        return(
            <React.Fragment>
                {this.state.visible===true
                ?( <div>
                    <Row>
                        <Col md={8} xs={8}>
                            <h3 className="text-right">Volume Chart</h3>
                        </Col>
                        <Col md={4} xs={4}>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret outline color="secondary">
                                {this.state.target}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem value="가슴" onClick={this.callData}>가슴</DropdownItem>
                                    <DropdownItem value="등" onClick={this.callData}>등</DropdownItem>
                                    <DropdownItem value="어깨" onClick={this.callData}>어깨</DropdownItem>
                                    <DropdownItem value="하체" onClick={this.callData}>하체</DropdownItem>
                                    <DropdownItem value="코어" onClick={this.callData}>코어</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                    </Row>
                    <Line 
                    data={LineData}
                    option={{maintainAspectRatio: false}}
                    />
                </div>
                )
                :(<div></div>)
                }
            </React.Fragment>
        )
    }
}