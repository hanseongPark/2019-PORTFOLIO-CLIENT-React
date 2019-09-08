import React from 'react';
import { Modal, ModalHeader, Alert } from 'reactstrap';

//LoginAlert는 로그인하지 않은 사용자가 메뉴 이동을 할 시 경고창을 보여줍니다.
export default class LoginAlert extends React.Component {

  //toggle 함수를 통해 상위 컴포넌트인 NavMenu 컴포넌트의 visible 상태를 변화 시킵니다.
  toggle = () => {
    this.props.modalToggle();
  }

  render() {
    return (
        <Modal isOpen={this.props.visible} toggle={this.toggle}>
          <ModalHeader className="text-muted" toggle={this.toggle}>
            <Alert color='light'>Helth Scheduler의 서비스를 이용하기 위해서는 로그인이 필요합니다</Alert>
          </ModalHeader>
        </Modal>
    );
  }
}