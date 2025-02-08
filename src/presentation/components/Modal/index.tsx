import React, { PropsWithChildren, ReactNode } from 'react';
import { Wrapper } from './style';
import Modal from 'react-bootstrap/Modal';

type Props = {
  visible: boolean,
  onHide: () => void,
  title: string,
}

export const CustomModal = ({ title, visible, children, onHide }: PropsWithChildren<Props>) => {
  return (
    <Wrapper style={visible ? { display: 'flex' } : { display: 'none' }}>
       <Modal
          backdrop="static"
          show={visible} 
          onHide={onHide}
        >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </Wrapper>
  );
}