import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main, Minigame, Ranking, Signin, Signup } from './Pages';
import { GlobalStyles } from './style/Globalstyles.ts';
import Soccer from './Pages/Category/Soccer/index.tsx';
import Basketball from './Pages/Category/Basketball/index.tsx';
import Volleyball from './Pages/Category/Volleyball/index.tsx';
import SoccerForm from './Pages/Formation/SoccerForm/index.tsx';
import BasketForm from './Pages/Formation/BasketForm/index.tsx';
import VolleyForm from './Pages/Formation/VolleyForm/index.tsx';
import NomalMatch from './Pages/Category/Nomal/index.tsx';
import NomalForm from './Pages/Formation/NomalForm/index.tsx';
import Register from './Pages/Register/index.tsx';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/minigame" element={<Minigame />} />
          <Route path="/matches/soccer" element={<Soccer />} />
          <Route path="/matches/soccer/form" element={<SoccerForm />} />

          <Route path="/matches/basketball" element={<Basketball />} />
          <Route path="/matches/basketball/form" element={<BasketForm />} />

          <Route path="/matches/volleyball" element={<Volleyball />} />
          <Route path="/matches/volleyball/form" element={<VolleyForm />} />

          <Route path="/matches/NomalMatch" element={<NomalMatch />} />
          <Route path="/matches/NomalMatch/form" element={<NomalForm />} />

          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
