import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 29.125rem;
  height: 40.625rem;
`;

export const ContainerResponse = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5rem;
`;

export const ImgBox = styled.img`
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const LoadingText = styled.p`
  font-family: Pretendard;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.9375rem;

  color: #23f69a;
`;
