import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import NavMeue from '../components/NavMenu';

class Header extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            user: undefined,
        };
    };
    
    componentDidMount(){
        axios.get('/user')
        .then((res)=>{
            if(res.data!==null){
                this.setState({user: res.data.name})
            }
        })
    };

    toIntro = () =>{
        this.props.history.push('/')
    };

    toLink = (link)=>{
        this.props.history.push('/'.concat(link.split('/')[3]))
    }
    
    toLogin = () =>{
        axios.post('/auth/login', {email: "tester", password: "tester"})
        .then((res)=>{
            this.setState({user: res.data.name})
        })

    };
        
    toLogout = () =>{
        axios.get('/auth/logout')
        .then((res)=>{
            this.setState({user: undefined})
            this.props.history.push(res.data.url)
        })
    };

    render() {
        return (
            <React.Fragment>
                <NavMeue {...this.state} toIntro={this.toIntro} toLink={this.toLink} toLogin={this.toLogin} toLogout={this.toLogout}/>
            </React.Fragment>
            
        );
    };
};

export default withRouter(Header);