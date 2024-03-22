import { useLocation } from 'react-router-dom';
import * as S from './style.ts';

const Category = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <S.CategoryContainer>
      <S.CategoryLink to="/" style={currentPath === '/' ? { color: '#fff' } : null}>
        경기
      </S.CategoryLink>
      <S.CategoryLink to="/matches/soccer" style={currentPath === '/matches/soccer' ? { color: '#fff' } : null}>
        축구
      </S.CategoryLink>
      <S.CategoryLink to="/matches/basketball" style={currentPath === '/matches/basketball' ? { color: '#fff' } : null}>
        농구
      </S.CategoryLink>
      <S.CategoryLink to="/matches/volleyball" style={currentPath === '/matches/volleyball' ? { color: '#fff' } : null}>
        배구
      </S.CategoryLink>
    </S.CategoryContainer>
  );
};

export default Category;