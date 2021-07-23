import BounceLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

import Backdrop from './Backdrop';

const SpinnerWrapper = styled.div`
  position: fixed;
  left: 50%;
  margin-left: -50px;
  top: 400px;
  color: #fff;
  z-index: 100;
`;

const LoadingSpinner = () => {
  return (
    <>
      <Backdrop />
      <SpinnerWrapper>
        <BounceLoader color="#fff" size="100px" />
      </SpinnerWrapper>
    </>
  );
};

export default LoadingSpinner;
