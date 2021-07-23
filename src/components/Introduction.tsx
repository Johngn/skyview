import styled from 'styled-components';

const IntroductionContainer = styled.div`
  color: #fff;
  margin: 10px 20px 20px 20px;
`;

const IntroductionParagraph = styled.p`
  text-align: justify;
  line-height: 21px;
`;

const Introduction = () => {
  return (
    <>
      <IntroductionContainer>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Skyview</h2>
        <IntroductionParagraph>
          Skyview will find the cloud cover percentage, the humidity, and the
          wind speed for any location on the planet for the next five nights.
          Use this to find suitable times for astronomical viewing.
        </IntroductionParagraph>
      </IntroductionContainer>
    </>
  );
};

export default Introduction;
