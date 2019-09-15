import React from 'react';
import {Navbar,NavbarBrand, Nav, NavLink, NavItem,Collapse,NavbarToggler, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Media} from 'reactstrap';
import logo from '../img/logo.png'
import kakaoButton from '../img/kakaoButton.png'
import naverButton from '../img/naverButton.PNG'
import testerButton from '../img/testerButton.png'
import LoginAlert from './LoginAlert';

//NavMenu.js는 화면 상단의 네비게이션 메뉴를 제공하는 컴포넌트 입니다. 
//속성값으로 내려오는 this.props.user의 상태에 따라 웹 어플리케이션 이용자의
//메뉴 접근을 허용하거나 차단합니다.
export default class NavMenu extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            visible: false,
            isOpen: false
        };
    };
    //NavMenu의 visible 상태는 경고창을 보여주거나 닫습니다. Health Scheduler는 기본적으로
    //사용자의 개인 계획표이기에 사용자 정보를 위해 로그인이 선행되어야 합니다. 그렇기에 visible의 상태에
    //따라 사용자에게 로그인이 필요하다는 경고창을 띄우거나 닫습니다. isOpen 상태는 반응형웹의 메뉴창을 열거나
    //닫습니다. Health Scheduler는 반응형 웹 어플리케이션입니다. 그렇기에 화면이 작아지면 메뉴창은 숨겨집니다.
    //이때 사용자가 네비메뉴를 열기 원하면 isOpen의 상태가 true 로 바뀌며 네비메뉴가 보이게 됩니다.

    //toggle 메뉴는 작아진 상태의 메뉴바를 다시 보여주거나 숨겨주는 함수입니다.
    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
        }
    
    //onDismiss 함수는 경고창을 닫는 함수입니다.
    onDismiss = () => {
        this.setState({ visible: false });
    };
    
    //toIntro는 네비메뉴의 Home을 클릭했을 때 호출됩니다. NavMenu의 NavLink들은 <a>태그이기에 
    //클릭하면 페이지를 새로고침하게 됩니다. 새로고침을 방지하고 React의 기능인 상태변화가 된 부분만
    //변경하기 위해 event.preventDefault를 통해 페이지 새로고침을 막습니다. 이후 네비메뉴가 열려있다면
    //닫고 상위 컨테이너인 Header.js의 toIntro 함수를 호출하게 됩니다. 
    toIntro = (e) =>{
        e.preventDefault();
        this.setState({isOpen:false})
        this.props.toIntro()
    };
 
    //toLink는 네비메뉴를 각 메뉴버튼을 클릭했을 때 호출됩니다. 우선 속성값으로 받은 유저의 상태에
    //따라 경고창을 보여줄지 메뉴로 이동할지를 판단합니다. 만약 유저의 상태가 undefined라면 로그인
    //이 필요하다는 경고창을 보여주며 유저가 로그인 상태라면 this.props.toLink의 인자에 event.target.href의
    //주소정보를 담아 호출하게 됩니다.
    toLink = (e) =>{
        e.preventDefault();
        if(this.props.user!==undefined){
            this.props.toLink(e.target.href)
            this.setState({
                isOpen: false,
            })
        }else{
            this.setState({
                visible: true,
            })
        }
    };

    //toLogout은 로그아웃 버튼을 클릭할 시 호출되며 상위 컴포넌트의 toLogout 함수를 호출합니다.
    toLogout = (e) =>{
        e.preventDefault()
        this.props.toLogout()
    };

    //toLogin 함수는 테스터로그인 버튼을 누를 시 발생하며 상위 컴포넌트의 toLogin 함수를
    //호출합니다.
    toLogin = (e) =>{
        e.preventDefault()
        this.props.toLogin()
    };

    render() {
        return (
            <div>
                {/* Navbar는 reactstrap 의 Navbar 컴포넌트를 사용하였습니다. fixed속성을 통해 상단에 고정시켰으며 lg 속성을 통해 화면 반경이
                일정 픽셀 이하로 줄어들면 접히도록 설정하였습니다. */}
                <Navbar color="dark" dark expand="lg" fixed="top">
                    <NavbarBrand href="/">
                        <img src={logo} height="50px"/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            {this.props.user=== undefined?(<div></div>):(<NavLink>{this.props.user} 님 안녕하세요</NavLink>)}
                        </NavItem>
                        <NavItem>
                            <NavLink href="/" onClick={this.toIntro}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/calorie" onClick={this.toLink}>Calorie Calculator</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/dietmanage" onClick={this.toLink}>Diet Management</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/workout" onClick={this.toLink}>Workout Scheduler</NavLink>
                        </NavItem>
                        <NavItem>
                            {this.props.user===undefined
                            ?(<UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                  Log in
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <DropdownItem>
                                      {/* 네이버 로그인 버튼을 누를 시에는 새로고침이 되어야 하기에 <a> 태그를 사용하여 사용자가 네이버 로그인 과정을 거치도록 하였습니다. */}
                                    <a href="/auth/naver"><Media src={naverButton} alt="naverButton" width='121px'></Media></a>
                                  </DropdownItem>
                                  <DropdownItem>
                                      {/* 카카오 로그인 버튼을 누를 시에도 역시 새로고침이 되어야 하기에 <a> 태그를 사용하여 사용자가 카카오 로그인 과정을 거치도록 하였습니다. */}
                                    <a href="/auth/kakao"><Media src={kakaoButton} alt="kakaoButton"></Media></a>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <a href="/auth/login" onClick={this.toLogin}><Media src={testerButton} alt="testerButton" width='121px'></Media></a>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>)
                            :(<NavLink href="/auth/logout" onClick={this.toLogout}>Log Out</NavLink>)
                            }
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Navbar>
                {/* LoginAlert 는 하위 컴포넌트로서 경고창을 띄우는 용도입니다. */}
                <LoginAlert visible={this.state.visible} modalToggle={this.onDismiss}/>
            </div>
        );
    };
};
