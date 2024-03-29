/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import HeaderContainer from "../../../components/HeaderContainer/index.tsx";
import * as S from "./style.ts";
import Category from "../../../components/Category/index.tsx";
import { useNavigate, useParams } from "react-router-dom";
import TeamAddButton from "../../../assets/svg/TeamAddButton.tsx";
import apiClient from "../../../utils/libs/apiClient.ts";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "react-hot-toast";

import "react-toastify/dist/ReactToastify.css";
import { EmptyPlaying } from "../../../assets/index.ts";

const Sports = () => {
  const { sport } = useParams();
  if (
    !(sport === "soccer" || sport === "badminton" || sport === "volleyball")
  ) {
    return <h1>Not Found</h1>;
  }
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);

  const [cheer, setCheer] = useState(false);
  const [addteam, setAddteam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const sportName = sport.toUpperCase();
    const getTeamList = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await apiClient.get(`/team?type=${sportName}`, {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        });
        console.log(response);

        setTeams(response.data);
      } catch (e) {
        console.log("error");
      }
    };

    getTeamList();
  }, [sport]);

  const postFavoriteTeam = async (teamId) => {
    try {
      const token = localStorage.getItem("accessToken");

      await apiClient.post(
        `/team/follow`,
        {
          team_id: teamId,
        },
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      registerFollow();
    } catch (e) {
      console.log("error");
      alreadyFollow();
    }
  };

  const GoToForm = (sport: string) => {
    navigate(`/matches/${sport}/form`);
  };

  const GoRegister = () => {
    navigate(`/register`);
  };

  const handleCheerClick = (teamId, teamName) => {
    setSelectedTeam({ id: teamId, name: teamName });
    setCheer(true);
  };

  const alreadyFollow = () => {
    toast.error("이미 팀을 등록하였습니다!", { autoClose: 1000 });
  };

  const registerFollow = () => {
    toast.success("팀이 등록되었습니다!", { autoClose: 1000 });
  };

  return (
    <>
      <HeaderContainer />
      {teams.length !== 0 ? (
        <S.Wrapper>
          {cheer && selectedTeam && (
            <S.ModalBackground>
              <S.ModalContainer>
                <S.ModalTextContainer>
                  <S.ModalTitle>
                    <S.ModalTitleContainer>
                      {selectedTeam.name}팀을
                      <br />
                      응원 하시겠습니까?
                    </S.ModalTitleContainer>
                  </S.ModalTitle>
                  <S.ModalNovelContainer>
                    <S.ModalNovel>
                      해당 팀의 경기 때 문자 알림을 받게 됩니다. <br />
                    </S.ModalNovel>
                  </S.ModalNovelContainer>
                </S.ModalTextContainer>
                <S.ModalButtonContainer>
                  <S.ModalCencleButton onClick={() => setCheer(false)}>
                    아니오
                  </S.ModalCencleButton>
                  <S.ModalCheerButton
                    onClick={() => postFavoriteTeam(selectedTeam.id)}
                  >
                    응원하기
                  </S.ModalCheerButton>
                </S.ModalButtonContainer>
              </S.ModalContainer>
            </S.ModalBackground>
          )}
          {addteam ? (
            <S.ModalBackground>
              <S.ModalContainer>
                <S.ModalTextContainer style={{ gap: "0" }}>
                  <S.ModalTitle>
                    <S.ModalTitleContainer style={{ alignItems: "center" }}>
                      팀을 등록하시겠습니까?
                    </S.ModalTitleContainer>
                  </S.ModalTitle>
                  <S.ModalNovelContainer>
                    <S.ModalNovel style={{ color: "var(--Error, #DF454A)" }}>
                      경기에 참여한 선수는 자신이 참여한 경기에
                      <br /> 투표할 수 없습니다
                    </S.ModalNovel>
                  </S.ModalNovelContainer>
                </S.ModalTextContainer>
                <S.ModalButtonContainer>
                  <S.ModalCencleButton onClick={() => setAddteam(!addteam)}>
                    아니오
                  </S.ModalCencleButton>
                  <S.ModalCheerButton onClick={GoRegister}>
                    팀구성하기
                  </S.ModalCheerButton>
                </S.ModalButtonContainer>
              </S.ModalContainer>
            </S.ModalBackground>
          ) : null}
          <S.Container>
            <S.ContainerResponse>
              <Category />
              <S.ListWrapper>
                {teams.map((team: any) => (
                  <>
                    {team.my_team === true ? (
                      <>
                        <S.ListContainer key={team.team_id}>
                          <S.List>
                            <S.TextContainer>
                              <S.TeamTextContainer>
                                <S.TeamName
                                  style={{
                                    color: team.follow
                                      ? "var(--Main, #23F69A)"
                                      : "",
                                  }}
                                >
                                  {team.team_name}팀
                                </S.TeamName>
                                <S.TeamClass>
                                  {team.team_grade === "ONE"
                                    ? "1학년"
                                    : team.team_grade === "TWO"
                                      ? "2학년"
                                      : "3학년"}
                                  {team.team_class_type === "SW"
                                    ? "소개과"
                                    : "임베과"}
                                </S.TeamClass>
                              </S.TeamTextContainer>
                              <S.WinText>{team.win_count}승</S.WinText>
                            </S.TextContainer>
                            <S.FormationButton
                              onClick={() => GoToForm(sport)}
                              style={{
                                border: team.follow
                                  ? "1px solid var(--Main, #23F69A)"
                                  : "",
                                color: team.follow
                                  ? "1px solid var(--Main, #23F69A)"
                                  : "",
                              }}
                            >
                              포메이션
                            </S.FormationButton>
                          </S.List>
                        </S.ListContainer>
                        <S.Stroke />
                      </>
                    ) : (
                      <S.ListContainer key={team.team_id}>
                        <S.List>
                          <S.TextContainer>
                            <S.TeamTextContainer>
                              <S.TeamName
                                style={{
                                  color: team.follow
                                    ? "var(--Main, #23F69A)"
                                    : "",
                                }}
                              >
                                {team.team_name}팀
                              </S.TeamName>
                              <S.TeamClass>
                                {team.team_grade === "ONE"
                                  ? "1학년"
                                  : team.team_grade === "TWO"
                                    ? "2학년"
                                    : "3학년"}
                                {team.team_class_type === "SW"
                                  ? "소개과"
                                  : "임베과"}
                              </S.TeamClass>
                            </S.TeamTextContainer>
                            <S.WinText>{team.win_count}승</S.WinText>
                          </S.TextContainer>
                          <S.ButtonContainer>
                            <S.FormationButton
                              onClick={() => GoToForm(sport)}
                              style={{
                                border: team.follow
                                  ? "1px solid var(--Main, #23F69A)"
                                  : "",
                                color: team.follow
                                  ? "var(--Main, #23F69A)"
                                  : "",
                              }}
                            >
                              포메이션
                            </S.FormationButton>
                            {team.follow === true ? (
                              <></>
                            ) : (
                              <S.CheerButton
                                onClick={() =>
                                  handleCheerClick(team.team_id, team.team_name)
                                }
                              >
                                응원하기
                              </S.CheerButton>
                            )}
                          </S.ButtonContainer>
                        </S.List>
                      </S.ListContainer>
                    )}
                  </>
                ))}

                <S.AddButton onClick={() => setAddteam(!addteam)}>
                  <TeamAddButton />
                </S.AddButton>
              </S.ListWrapper>
            </S.ContainerResponse>
          </S.Container>
        </S.Wrapper>
      ) : (
        <S.Wrapper>
          <S.Container>
            <Category />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "15rem",
              }}
            >
              <EmptyPlaying />
            </div>
          </S.Container>
        </S.Wrapper>
      )}

      <ToastContainer autoClose={1000} />
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </>
  );
};

export default Sports;
