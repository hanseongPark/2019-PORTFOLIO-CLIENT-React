import React from 'react';
import {Navbar,NavbarBrand, Nav, NavLink, NavItem,Collapse,NavbarToggler, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Media} from 'reactstrap';
import kakaoButton from '../img/kakaoButton.png'
import naverButton from '../img/naverButton.PNG'
import testerButton from '../img/testerButton.png'
import LoginAlert from './LoginAlert';

export default class NavMenu extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            visible: false,
            isOpen: false
        };
    };

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
        }

    onDismiss = () => {
        this.setState({ visible: false });
    };
    
    toIntro = (e) =>{
        e.preventDefault();
        this.setState({isOpen:false})
        this.props.toIntro()
    };
 
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

    toLogout = (e) =>{
        e.preventDefault()
        this.props.toLogout()
    };

    toLogin = (e) =>{
        e.preventDefault()
        this.props.toLogin()
    };

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="lg" fixed="top">
                    <NavbarBrand href="/">
                    <div className="logo">
                        Health Scheduler
                    </div>
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
                            <NavLink href="/calorie" onClick={this.toLink}>Calorie Calculater</NavLink>
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
                                    <a href="/auth/naver"><Media src={naverButton} alt="naverButton" width='121px'></Media></a>
                                  </DropdownItem>
                                  <DropdownItem>
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
                <LoginAlert visible={this.state.visible} modalToggle={this.onDismiss}/>
            </div>
        );
    };
};
