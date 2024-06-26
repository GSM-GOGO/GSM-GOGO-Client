import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from 'react';
import { People } from '../../../assets/index.ts';
import * as S from './style.ts';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import VolleyField from '../../../assets/png/VolleyField.png';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../utils/libs/apiClient.ts';
import { ToastContainer, toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

import 'react-toastify/dist/ReactToastify.css';

const Volleyball = () => {
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const formationFieldRef = useRef<HTMLDivElement>(null);

  interface ParticipantPosition {
    id: number;
    position_x: number;
    position_y: number;
  }
  const [participantPositions, setParticipantPositions] = useState<ParticipantPosition[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const { teamName, selectedMembers, selectedId } = location.state;

  const convertedMembers = selectedMembers.map((member: string, index: number) => ({
    id: selectedId[index],
    name: member,
    x: [90, 185, 280, 90, 185, 280, 90, 185, 280][index % 9],
    y: [30, 30, 30, 130, 130, 130, 215, 215, 215][index % 9],
  }));

  useEffect(() => {
    if (formationFieldRef.current) {
      const { left, top, right, bottom } = formationFieldRef.current.getBoundingClientRect();
      setBounds({
        left: 20,
        top: 20,
        right: right - left - 55,
        bottom: bottom - top - 65,
      });
    }
  }, []);

  const handleDragStop = (id: any, _e: DraggableEvent, data: DraggableData) => {
    const participantIndex = convertedMembers.findIndex((participant: { id: any }) => participant.id === id);

    if (participantIndex !== -1) {
      const updatedParticipantPositions = [...participantPositions];
      updatedParticipantPositions[participantIndex] = {
        id,
        position_x: data.x,
        position_y: data.y,
      };
      setParticipantPositions(updatedParticipantPositions);
    }
  };

  const postVolleyballTeam = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      const participates = convertedMembers.map((player: { id: any; x: any; y: any }) => {
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
          team_type: 'VOLLEYBALL',
          participates: participates,
        },
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      navigate(`/matches/volleyball`);
      setTimeout(() => {
        successCreateTeam();
      }, 500);
    } catch (e: any) {
      navigate(`/matches/volleyball`);
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
              <S.ImgBox ref={formationFieldRef} img={VolleyField} style={{ position: 'relative' }}>
                {convertedMembers.map(
                  (player: {
                    id: Key | null | undefined;
                    x: any;
                    y: any;
                    name:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | null
                      | undefined;
                  }) => (
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
                  )
                )}
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
            <S.BackButton onClick={postVolleyballTeam}>
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

export default Volleyball;
