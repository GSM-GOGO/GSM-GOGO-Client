import { useNavigate } from "react-router-dom";
import { ThreeDot } from "../../assets";
import * as S from "./style";
import { useState } from "react";

interface TextTypeProps {
  mainText: string,
  miniText: string[],
  point: string,
}

const numberWithCommas = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Header: React.FC<TextTypeProps> = ({ mainText, miniText, point }) => {
  const navigate= useNavigate();
  const [rankingClicked, setRankingClicked] = useState(false);
  const [miniClicked, setMiniClicked] = useState(false);

  const toMain = () => {
    setMiniClicked(false)
    setRankingClicked(false)
    navigate(`/`);
  }

  const toRanking = () => {
    setRankingClicked(true);
    setMiniClicked(false)
    navigate(`/ranking`);
  }

  const toMiniGame = () => {
    setMiniClicked(true)
    setRankingClicked(false)
    navigate(`/minigame`);
  }

  return (
    <S.HeaderWrapper>

      <S.GoGoText 
        onClick={toMain}
        style={{cursor: "pointer"}}
      >
        {mainText}
      </S.GoGoText>

      <S.TextBox>
        <S.GoGoMiniText 
          onClick={toRanking}
          style={{
            color: rankingClicked ? "var(--Main, #23F69A)" : "var(--Gray1, #B7B7BE)",
            cursor: "pointer"
          }}
        >
          {miniText[0]}
        </S.GoGoMiniText>

        <S.GoGoMiniText 
          onClick={toMiniGame}
          style={{
            color: miniClicked ? "var(--Main, #23F69A)" : "var(--Gray1, #B7B7BE)",
            cursor: "pointer"
          }}
        >
          {miniText[1]}
        </S.GoGoMiniText>

        <S.GoGoMiniText 
          style={{ 
            color: "var(--Main, #23F69A)" 
            }}
        >
          {numberWithCommas(point)}
          P
        </S.GoGoMiniText>

        <div style={{cursor: "pointer"}}>
          <ThreeDot/>
        </div>

      </S.TextBox>
    </S.HeaderWrapper>
  )
}

export default Header;