import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  width: 40.5rem;
  padding: 1rem 41.25rem;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1800px) {
    padding: 1rem 2rem;
    font-size: 1.5rem;
  }
`;

export const GoGoText = styled.h1`
  color: var(--Main, #23f69a);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.9375rem;
  margin: 0;
`;

export const TextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

export const GoGoMiniText = styled.p`
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  margin: 0;
`;

export const GoGoMiniLink = styled(Link)`
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  margin: 0;
  color: #b7b7be;
  text-decoration: none;
`;
