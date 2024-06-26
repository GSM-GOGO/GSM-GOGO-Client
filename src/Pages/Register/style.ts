import styled from 'styled-components';

export const Wrapper = styled.div`
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
  box-sizing: border-box;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const CategoryContainer = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
`;

export const Category = styled.div`
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.9375rem;
  margin: 0;
`;

export const SubjectContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 4rem;
`;

export const SubjectText = styled.div`
  color: var(--White, #fff);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
`;

export const SubjectBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  @media screen and (max-width: 445px) {
    gap: 0.5rem;
  }
  @media screen and (max-width: 420px) {
    gap: 0.3rem;
  }
`;

export const SubjectOne = styled.div<{ selectedSport?: boolean }>`
  display: flex;
  padding: 0.5rem 1.25rem;
  @media screen and (max-width: 380px) {
    padding: 0.5rem 1rem;
  }
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  border: 1px solid var(--Gray2, #6f6f7b);
  cursor: pointer;
  border: ${(props) => (props.selectedSport ? '1px solid var(--Main, #23F69A)' : '')};
  background: ${(props) => (props.selectedSport ? 'rgba(35, 246, 154, 0.10)' : '')};
`;

export const SubjectOneText = styled.p<{ selectedSport?: boolean }>`
  color: var(--Gray2, #6f6f7b);
  font-family: Pretendard;
  font-size: 1rem;
  @media screen and (max-width: 445px) {
    font-size: 0.8rem;
  }
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  margin: 0;
  color: ${(props) => (props.selectedSport ? 'var(--Main, #23F69A)' : 'var(--Gray2, #6F6F7B)')};
`;

export const TeamInputContainer = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const TeamInputBox = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 1.5rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.75rem;
  border: 1px solid var(--colors-gray-gray-800, #44444b);
  box-sizing: border-box;
  &:focus-within {
    border: 1px solid var(--Main, #23f69a);
  }
`;

export const TeamInput = styled.input`
  width: 100%;
  color: var(--White, #fff);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  outline: none;
  background: var(--Black, #1c1c1f);
  border: none;
`;

export const TeamInputText = styled.span`
  color: var(--White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
`;

export const FormationBtn = styled.button`
  display: flex;
  position: fixed;
  bottom: 7.5%;
  width: 20rem;
  height: 3.25rem;
  padding: 0.75rem 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: var(--colors-gray-gray-800, #44444b);
  border: none;
  cursor: pointer;
`;

export const FormationText = styled.p`
  color: var(--Gray1, #b7b7be);
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.625rem;
`;

export const NormalTeamContainer = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const TeamAssign = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const TeamAssignSpan = styled.span`
  color: var(--Gray2, #6f6f7b);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
`;

export const MapTeamMember = styled.div<{ Border?: boolean }>`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 1.5rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: var(--colors-gray-gray-900, #26262a);
  margin-bottom: 1rem;
  cursor: pointer;
  border: ${({ Border }) => (Border ? ' 1px solid var(--Main, #23F69A)' : '')};
`;

export const MemberList = styled.span`
  width: 200px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
`;

export const MemberSelected = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const MemberSelectList = styled.div`
  display: flex;
  padding: 0.5rem 0.75rem 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  border: 1px solid var(--colors-gray-gray-800, #44444b);

  @media (max-width: 500px) {
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  }
`;

export const MemberName = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  color: var(--Gray1, #b7b7be);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.375rem;

  @media (max-width: 500px) {
    font-weight: 400;
    font-size: 0.6rem;
  }
`;

export const overScroll = styled.div`
  width: 100%;
  height: 30rem;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const clickedNormal = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 100%;
  flex-wrap: wrap;
  justify-content: right;
`;

export const NormalObject = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 0.75rem;
`;

export const OneNormalObj = styled.div`
  display: flex;
  padding: 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.5rem;
  background: rgba(183, 183, 190, 0.2);
  cursor: pointer;
`;

export const OneNormalText = styled.span`
  color: var(--Gray1, #b7b7be);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem;
`;

export const MappingText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const OneNormalContainer = styled.div`
  display: flex;
  padding: 0.25rem 0.5rem 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.5rem;
  background: rgba(183, 183, 190, 0.1);
`;

export const OneNormalWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 100%;
  flex-wrap: wrap;
  justify-content: right;
`;
