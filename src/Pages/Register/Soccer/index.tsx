import { useEffect, useRef, useState } from 'react';
import { People } from '../../../assets/index.ts';
import * as S from './style.ts';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import Field from '../../../assets/png/Field.png';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../utils/libs/apiClient.ts';
import { ToastContainer, toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

import 'react-toastify/dist/ReactToastify.css';

const Soccer = () => {
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const formationFieldRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { teamName, selectedMembers, selectedId } = location.state;

  const [participantPositions, setParticipantPositions] = useState<
    { id: number; position_x: number; position_y: number }[]
  >([]);

  const convertedMembers = selectedMembers.map((member: string, index: number) => ({
    id: selectedId[index],
    name: member,
    x: [160, 80, 250, 50, 160, 280, 80, 250][index % 8],
    y: [55, 150, 150, 250, 250, 250, 375, 375][index % 8],
  }));

  useEffect(() => {
    if (formationFieldRef.current) {
      const { left, top, right, bottom } = formationFieldRef.current.getBoundingClientRect();
      setBounds({
        left: 20,
        top: 40,
        right: right - left - 55,
        bottom: bottom - top - 80,
      });
    }
  }, []);

  const handleDragStop = (id: number, _e: DraggableEvent, data: DraggableData) => {
    const participantIndex = convertedMembers.findIndex((participant: { id: number }) => participant.id === id);

    const updatedParticipantPositions: { id: number; position_x: number; position_y: number }[] = [
      ...participantPositions,
    ];
    updatedParticipantPositions[participantIndex] = {
      id,
      position_x: data.x,
      position_y: data.y,
    };

    setParticipantPositions(updatedParticipantPositions);
  };

  const postSoccerTeam = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      const participates = convertedMembers.map((player: { id: number; x: number; y: number }) => {
        const participantPosition = participantPositions.find((p) => p?.id === player.id);
        return {
          user_id: String(player.id),
          position_x: participantPosition?.position_x ?? player.x,
          position_y: participantPosition?.position_y ?? player.y,
        };
      });

      await apiClient.post(
        `/team`,
        {
          team_name: teamName,
          team_type: 'SOCCER',
          participates: participates,
        },
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      navigate(`/matches/soccer`);
      setTimeout(() => {
        successCreateTeam();
      }, 500);
    } catch (e: any) {
      navigate(`/matches/soccer`);
      const errorMessage = e.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
      setTimeout(() => {
        toast.error(errorMessage, { autoClose: 1000 });
      }, 500);
    }
  };

  const successCreateTeam = () => {
    toast.success('팀 등록에 성공하였습니다!', { autoClose: 1000 });
  };

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.ContainerResponse>
            <S.CategoryContainer>
              <S.Category style={{ color: 'var(--White, #FFF)', paddingRight: '1.5rem' }}>
                {teamName}팀 축구 포메이션
              </S.Category>
            </S.CategoryContainer>

            <S.ContainerResponse style={{ paddingBottom: '3.5rem' }}>
              <S.ImgBox ref={formationFieldRef} img={Field} style={{ position: 'relative' }}>
                {convertedMembers.map((player: { id: number; x: number; y: number; name: string }) => (
                  <div key={player.id} style={{ position: 'absolute' }}>
                    <div style={{ position: 'relative' }}>
                      <Draggable
                        defaultPosition={{ x: player.x, y: player.y }}
                        bounds={bounds}
                        nodeRef={formationFieldRef}
                        onStop={(e, data) => handleDragStop(player.id, e, data)}
                      >
                        <S.PlayerContainer style={{ cursor: 'pointer' }}>
                          <People />
                          <S.PlayerText style={{ userSelect: 'none' }}>{player.name}</S.PlayerText>
                        </S.PlayerContainer>
                      </Draggable>
                    </div>
                  </div>
                ))}
              </S.ImgBox>
            </S.ContainerResponse>
          </S.ContainerResponse>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              top: '5rem',
              position: 'relative',
            }}
          >
            <S.BackButton onClick={postSoccerTeam}>
              <S.BackText>등록하기</S.BackText>
            </S.BackButton>
          </div>
        </S.Container>
      </S.Wrapper>
      <ToastContainer autoClose={1000} />
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </>
  );
};

export default Soccer;
