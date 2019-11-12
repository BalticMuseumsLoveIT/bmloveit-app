import styled from 'styled-components';

const StyledWrapper = styled.button`
  border: none;
  background: none;
  padding: 20px 15px;
  z-index: 1;
`;

export const InnerHamburger = styled.div`
  position: relative;
  width: 25px;
  height: 4px;
  background-color: ${({ theme }) => theme.color.dark};

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: inherit;
    left: 0;
  }

  ::before {
    top: -8px;
  }

  ::after {
    top: 8px;
  }
`;

export default StyledWrapper;
