import { useLocation, useNavigate } from 'react-router-dom';
import { ThreeDot } from '../../assets';
import * as S from './style';
import { useEffect, useState } from 'react';
import apiClient from '../../utils/libs/apiClient';
import useStorePoint from '../../utils/libs/storePoint';

interface TextTypeProps {
  mainText: string;
  miniText: string[];
}

const Header: React.FC<TextTypeProps> = ({ mainText, miniText }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [showModal, setShowModal] = useState(false);
  const userPoint = useStorePoint((state) => state.userPoint);
  const setUserPoint = useStorePoint((state) => state.setUserPoint);
  const [hasFetchedUserPoint, setHasFetchedUserPoint] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    Navigate('/signin');
  };

  useEffect(() => {
    if (!hasFetchedUserPoint) {
      const getUserPoint = async () => {
        try {
          const token = localStorage.getItem('accessToken');

          const response = await apiClient.get(`/user/my-point`, {
            headers: {
              Authorization: token,
            },
            withCredentials: true,
          });

          setUserPoint(formatPoint(response.data.point));
          setHasFetchedUserPoint(true);
        } catch (e) {}
      };

      getUserPoint();
    }
  }, [hasFetchedUserPoint, setUserPoint]);

  const formatPoint = (point: string) => {
    return parseInt(point).toLocaleString();
  };

  return (
    <>
      <S.HeaderWrapper>
        {showModal && <S.ModalWrapper onClick={handleLogout}>로그아웃</S.ModalWrapper>}
        <S.GoGoText onClick={() => navigate(`/`)} style={{ cursor: 'pointer' }}>
          {mainText}
        </S.GoGoText>

        <S.TextBox>
          <S.GoGoMiniLink to="/ranking" style={currentPath === '/ranking' ? { color: '#23F69A' } : undefined}>
            {miniText[0]}
          </S.GoGoMiniLink>

          <S.GoGoMiniLink to="/minigame" style={currentPath === '/minigame' ? { color: '#23F69A' } : undefined}>
            {miniText[1]}
          </S.GoGoMiniLink>

          <S.GoGoMiniText
            style={{
              color: 'var(--Main, #23F69A)',
            }}
          >
            {userPoint}P
          </S.GoGoMiniText>

          <S.SvgContainer style={{ cursor: 'pointer' }} onClick={toggleModal}>
            <ThreeDot />
          </S.SvgContainer>
        </S.TextBox>
      </S.HeaderWrapper>
    </>
  );
};

export default Header;
