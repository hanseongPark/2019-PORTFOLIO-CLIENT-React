import React from 'react';
import { Modal, ModalHeader, Alert } from 'reactstrap';

export default class LoginAlert extends React.Component {

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