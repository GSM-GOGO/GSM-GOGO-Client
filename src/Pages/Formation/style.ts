import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 40.5rem;
`;

export const ContainerResponse = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const CategoryContainer = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 4rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1800px) {
    padding: 0.5rem 2rem;
  }
  @media (max-width: 700px) {
    margin-bottom: 2rem;
  }
  @media (max-width: 500px) {
    margin-bottom: 0rem;
    margin-top: 0rem;
  }
`;

export const Category = styled.div`
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.9375rem;
  margin: 0;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const BackButton = styled.button`
  display: flex;
  width: 20rem;
  height: 3.25rem;
  padding: 0.75rem 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 1px solid var(--Main, #23f69a);
  background: var(--Black, #1c1c1f);
  cursor: pointer;
`;

export const BackText = styled.p`
  color: var(--Main, #23f69a);
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.625rem;
`;
