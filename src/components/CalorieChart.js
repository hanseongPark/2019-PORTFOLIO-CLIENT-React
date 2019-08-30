import React from 'react';
import { Doughnut } from 'react-chartjs-2'
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';


export default class Calculrater extends React.Component{
    
    render(){
        const data = {
            labels: [
              "carb", "protein", "fat"
            ],
            datasets: [{
                data: [this.props.carb, this.props.protein, this.props.fat],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        }
        return(
            <React.Fragment>
                {this.props.visible===true
                ?(<ListGroup>
                        <ListGroupItem>
                            <ListGroupItemText>
                            <Doughnut 
                            data={data}
                            option={{maintainAspectRatio: false}}
                            />
                            </ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Goal and Calorie</ListGroupItemHeading>
                                <ListGroupItemText>
                                    현재 당신의 목표는 {this.props.goal} 이며, 그에 따른 칼로리는 {this.props.calorie}kcal 입니다.
                                </ListGroupItemText>
                            </ListGroupItem>
                        <ListGroupItem>
                        <ListGroupItemHeading>Carb, Protein and Fat</ListGroupItemHeading>
                            <ListGroupItemText>
                                하루 목표 영양성분은 탄수화물 {this.props.carb}g, 단백질 {this.props.protein}g, 지방 {this.props.fat}g 입니다.
                            </ListGroupItemText>
                        </ListGroupItem>
                    </ListGroup>
                )
                :(<div></div>)
                }
            </React.Fragment>
            )
        }
    }