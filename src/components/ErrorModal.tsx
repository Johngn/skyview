import React from 'react';
import styled from 'styled-components';

const ErrorDiv = styled.div`
  position: fixed;
  top: 25vh;
  left: calc(50% - 15rem);
  width: 30rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  z-index: 100;
  border-radius: 7px;
`;

const H2 = styled.h2`
  margin: 0;
  padding: 1rem;
  background: #ff2058;
  color: white;
  border-radius: 7px 7px 0 0;
`;

const ErrorModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 0.5rem;
`;

const Button = styled.button`
  padding: 5px;
  margin: 3px;
`;

import Backdrop from './Backdrop';

const ErrorModal = React.memo((props: any) => {
  return (
    <>
      <Backdrop onClick={props.onClose} />
      <ErrorDiv>
        <H2>An Error Occurred!</H2>
        <p style={{ padding: '1rem' }}>{props.children}</p>
        <ErrorModalActions>
          <Button type="button" onClick={props.onClose}>
            Okay
          </Button>
        </ErrorModalActions>
      </ErrorDiv>
    </>
  );
});

export default ErrorModal;
