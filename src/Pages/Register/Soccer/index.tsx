import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { People } from "../../../assets/index.ts";
import HeaderContainer from "../../../components/HeaderContainer/index.tsx";
import * as S from "./style.ts";
import Draggable from "react-draggable";
import Field from "../../../assets/png/Field.png";
import { useLocation } from "react-router-dom";
import apiClient from "../../../utils/libs/apiClient.ts";

const Soccer = () => {
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const formationFieldRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const { teamName, selectedMembers } = location.state;

  const [participantPositions, setParticipantPositions] = useState([]);

  const convertedMembers = selectedMembers.map((member, index) => ({
    id: index + 1,
    name: member.split(" ")[1],
    x: [160, 80, 250, 50, 160, 280, 80, 250][index % 8],
    y: [55, 150, 150, 250, 250, 250, 375, 375][index % 8],
  }));

  useEffect(() => {
    if (formationFieldRef.current) {
      const { left, top, right, bottom } =
        formationFieldRef.current.getBoundingClientRect();
      setBounds({
        left: 20,
        top: 40,
        right: right - left - 55,
        bottom: bottom - top - 80,
      });
    }
  }, []);

  const handleDragStop = (id, e, data) => {
    const participantIndex = convertedMembers.findIndex(
      (participant) => participant.id === id
    );

    const updatedParticipantPositions = [...participantPositions];
    updatedParticipantPositions[participantIndex] = {
      id,
      position_x: data.x,
      position_y: data.y,
    };
    setParticipantPositions(updatedParticipantPositions);

    console.log(`${id}, X: ${data.x}, ${data.y}`);
  };

  const postSoccerTeam = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const participates = convertedMembers.map((player) => ({
        user_id: player.id,
        position_x: participantPositions[player.id - 1]?.position_x ?? player.x,
        position_y: participantPositions[player.id - 1]?.position_y ?? player.y,
      }));

      await apiClient.post(
        `/team`,
        {
          team_name: teamName,
          team_type: "SOCCER",
          participates: participates,
        },
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
    } catch (e) {
      console.log("error");
    } finally {
      alert(1);
    }
  };

  return (
    <>
      <HeaderContainer />
      <S.Wrapper>
        <S.Container>
          <S.ContainerResponse>
            <S.CategoryContainer>
              <S.Category
                style={{ color: "var(--White, #FFF)", paddingRight: "1.5rem" }}
              >
                {teamName}팀 축구 포메이션
              </S.Category>
            </S.CategoryContainer>

            <S.ContainerResponse style={{ paddingBottom: "3.5rem" }}>
              <S.ImgBox
                ref={formationFieldRef}
                img={Field}
                style={{ position: "relative" }}
              >
                {convertedMembers.map((player) => (
                  <div key={player.id} style={{ position: "absolute" }}>
                    <div style={{ position: "relative" }}>
                      <Draggable
                        defaultPosition={{ x: player.x, y: player.y }}
                        bounds={bounds}
                        nodeRef={formationFieldRef}
                        onStop={(e, data) => handleDragStop(player.id, e, data)}
                      >
                        <S.PlayerContainer style={{ cursor: "pointer" }}>
                          <People />
                          <S.PlayerText style={{ userSelect: "none" }}>
                            {player.name}
                          </S.PlayerText>
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
              display: "flex",
              justifyContent: "center",
              top: "5rem",
              position: "relative",
            }}
          >
            <S.BackButton onClick={postSoccerTeam}>
              <S.BackText>등록하기</S.BackText>
            </S.BackButton>
          </div>
        </S.Container>
      </S.Wrapper>
    </>
  );
};

export default Soccer;
