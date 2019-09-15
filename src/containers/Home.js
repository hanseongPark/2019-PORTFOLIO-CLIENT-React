import React from 'react';
import IntroCarousel from '../components/IntroCarousel'
import {Container,Row,Col, Button} from 'reactstrap'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import Calorie from '../img/Calorie.jpg'
import Workout from '../img/Workout.jpg'
import Diet from '../img/Diet.png'
import LoginAlert from '../components/LoginAlert'

//Home.js 페이지는 웹 어플리케이션의 메인화면 컨테이너 입니다. 메인화면의 캐러셀과
//설명 부분의 Get Started 버튼을 통해 각 메뉴 페이지로 이동하는 기능을 가집니다.
//visible의 상태는 로그인 경고창을 보여주거나 숨겨줍니다.
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
    }

    //onDismiss 함수는 로그인 경고창의 close 버튼을 누를 시, this.state.visible의 상태를 false 
    //로 만들어 창이 닫히도록 해줍니다.
    onDismiss = () => {
        this.setState({ visible: false });
    };
    
    //toLink는 NavMenu의 각 링크이동과 동일한 메커니즘을 가집니다. 메인 페이지의 상세 설명 구간의
    //Get Started 버튼을 누를 시 axios를 통해 사용자가 로그인 상태인지를 판별합니다. 이후 사용자가
    //로그인 상태라면 화면을 각 페이지로 이동시키고, 로그인 상태가 아니라면 로그인 경고창의 상태를 
    //true 로 만들며 경고창을 띄웁니다.
    toLink = (e) =>{
        e.preventDefault();
        const link = e.target.href
        axios.get('/user')
        .then((res)=>{
        if(res.data!==null){
            this.props.history.push('/'.concat(link.split('/')[3]))
        }else{
            this.setState({
                visible: true,
            })
        }})
    };

    render(){
        return(
            <React.Fragment>
                <Container fluid>             
                    <IntroCarousel/>
                </Container>
                <Container className="intro">
                    <Row>
                        <Col className="text-center" md={4}>
                            <img className="img-circle" src={Calorie} alt="Generic placeholder image" width="140" height="140"/>
                            <h4>Calorie Calculrator</h4>
                            <p className="intro text-muted">모든 관리의 시작은 현재의 상태를 파악하고, 그에 알맞은 목표를 설정하는 것으로 시작한다. 이 웹사이트에서는 칼로리 계산기를 통해 사용자의 상태를 파악해 정확한 하루 칼로리와 영양성분을 제공한다.</p>
                            <Button outline color="secondary" href="/calorie" onClick={this.toLink}>Get Started</Button>
                        </Col>
                        <Col className="text-center" md={4}>
                            <img className="img-circle" src={Diet} alt="Generic placeholder image" width="140" height="140"/>
                            <h4>Diet Management</h4>
                            <p className="intro text-muted">정확한 칼로리와 영양성분을 파악했다고 해도 지켜지지 않으면 당신의 몸은 변함이 없을 것이다. 식단관리에서는 하루 먹은 음식을 입력하고 그를 바탕으로 목표 칼로리와 영양성분의 달성률을 파악할 수 있다.</p>
                            <Button outline color="secondary" href="/dietmanage" onClick={this.toLink}>Get Started</Button>
                        </Col>
                        <Col className="text-center" md={4}>
                            <img className="img-circle" src={Workout} alt="Generic placeholder image" width="140" height="140"/>
                            <h4>Workout scheduler</h4>
                            <p className="intro text-muted">식단관리와 더불어 아름다운 몸매를 원한다면 운동은 필수불가결한 요소이다. 당신의 근육은 과부하의 원리에 성장하며 체계적인 운동관리를 위해 각 운동 부위별 퍼포먼스 볼륨을 확인 할 수 있다.</p>
                            <Button outline color="secondary" href="/workout" onClick={this.toLink}>Get Started</Button>
                        </Col>
                    </Row>
                </Container>
                <LoginAlert visible={this.state.visible} modalToggle={this.onDismiss}/>
            </React.Fragment>
            )
        }
    }

    //Home 화면 역시 this.props.history에 접근하여 페이지를 이동시킬 수 있어야하므로
    //withRouter의 인자로 export 하였습니다.
export default withRouter(Home)