import styled from 'styled-components';

interface DateContainerProps {
  selected?: boolean;
}
export const WeatherWrapper = styled.div`
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
  gap: 1.75rem;

  margin-bottom: 2.5rem;
  @media (max-width: 650px) {
    gap: 1.25rem;
  }
  @media (max-width: 550px) {
    gap: 0.75rem;
  }
  @media (max-width: 450px) {
    gap: 0.35rem;
  }
`;

export const DateContainer = styled.div<DateContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  color: ${(props) => (props.selected ? 'var(--White, #FFF)' : 'var(--Gray2, #6F6F7B)')};
`;

export const DayText = styled.p`
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4rem;
  margin: 0;
  width: 2.1rem;
  @media (max-width: 550px) {
    font-size: 0.8rem;
    width: 1.75rem;
  }
  @media (max-width: 450px) {
    font-size: 0.7rem;
    width: 1.75rem;
  }
`;
