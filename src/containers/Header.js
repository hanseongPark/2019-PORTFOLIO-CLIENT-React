import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import NavMeue from '../components/NavMenu';

//Header.js 는 페이지의 header를 구성하는 컴포넌트를 담은 컨테이너입니다.
//네비 메뉴 컴포넌트를 담으며 사용자가 로그인 상태인지 아닌지를 판별합니다.
class Header extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            user: undefined,
        };
    };

    //컴포넌트가 마운트될 때 axios를 사용하여 서버로 GET:/user 요청을 보내게 됩니다.
    //서버는 요청을 받은 후 req의 상태를 확인하고 req가 로그인 상태일시 req.user의 정보를
    //json 파일로 보내게 됩니다. 이후 응답받은 res.data의 정보를 활용해 state.user의 상태를
    //사용자의 이름으로 저장하게 됩니다. 
    componentDidMount(){
        axios.get('/user')
        .then((res)=>{
            if(res.data!==null){
                this.setState({user: res.data.name})
            }
        })
    };
    //toIntro 함수는 하위 컴포넌트인 NavMenu에서 Home메뉴가 클릭되었을 때 호출
    //됩니다. Header 컨테이너는 라우터가 브라우저의 history에 접근할 수 있도록
    //withRouter 함수의 인자로 export됩니다. 그렇기에 함수의 속성 this.props.history를
    //사용하여 주소를 바꿉니다.
    toIntro = () =>{
        this.props.history.push('/')
    };

    //toLink 함수는 하위 컴포넌트의 NavMenu에서 각 메뉴를 클릭했을 때 호출됩니다.
    //하위 컴포넌트는 href의 주소를 인자로 보내며 이를 "/" 기준으로 분할해 마지막
    //인자에 담겨있는 주소로 사용자의 url을 변경시킵니다.
    toLink = (link)=>{
        this.props.history.push('/'.concat(link.split('/')[3]))
    }
    
    //toLogin 함수는 하위 컴포넌트의 NavMenu에서 테스터로그인 버튼을 클릭했을 시
    //호출됩니다. POST:/auth/login 으로 서버 요청을 하며, 
    //로컬 로그인이 있다면 요청시 이메일과 비밀번호를 body에 담아 보내게 
    //됩니다. 하지만 이 웹 어플리케이션은 관리 목적이므로 로컬 로그인을 구현하지 않았습니다.
    //따라서 이 어플리케이션을 테스트 하기 쉽도록 임의의 계정 이메일과 비밀번호를 사용해
    //테스터 자격으로 로그인할 수 있도록 구현하였습니다.
    toLogin = () =>{
        axios.post('/auth/login', {email: "tester", password: "tester"})
        .then((res)=>{
            this.setState({user: res.data.name})
        })

    };
    
    //toLogout 함수는 하위 컴포넌트에서 로그아웃 버튼을 클릭하였을 때 호출됩니다.
    //axios를 통해 서버로 GET:/auth/logout 으로 요청을 보냅니다. 요청받은 서버는
    //req.logout을 통해 req의 user정보를 제거하며 로그아웃 과정을 마치고 json으로 
    //url정보를 보냅니다. res를 받아 클라이언트의 유저 상태를 undefined로 변경하고
    //사용자를 메인화면으로 이동시킵니다.
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
                {/* 하위 컴포넌트인 네비메뉴로 user의 상태를 속성값으로 내려줍니다. 이를 바탕으로 네비메뉴는 사용자의 상태에 따라
                식단관리, 영양소관리, 운동관리 페이지를 보여주거나 차단하게 됩니다. */}
                <NavMeue {...this.state} toIntro={this.toIntro} toLink={this.toLink} toLogin={this.toLogin} toLogout={this.toLogout}/>
            </React.Fragment>
            
        );
    };
};

//withRouter 함수의 인자로 컨테이너를 담아 Header의 메소드가 history에 접근할 수 있도록 해줍니다.
export default withRouter(Header);