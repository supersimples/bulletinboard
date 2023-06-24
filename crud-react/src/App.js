import './App.css';
import { Routes, Route } from 'react-router-dom';

import AuthProvider from './AuthContext';
import Header from './components.js/Header';
import CreateBulletin from './bulletin.js/CreateBulletin';
import ReadBulletin from './bulletin.js/ReadBulletin';
import LoginPage from './loginAndRegister.js/LoginPage';
import RegisterPage from './loginAndRegister.js/RegisterPage';
import UserPage from './userPage.js/UserPage';
import NotFound from './components.js/NotFound';
import MainPage from './components.js/MainPage';
import BulletinContainer from './bulletin.js/BulletinContainer';

function App() {

  return (
      <AuthProvider>
        <Routes>
          <Route element={<Header />}>
            <Route path='/' element={<MainPage />} />
            <Route path='/bulletin/:type' element={<BulletinContainer />} />
            <Route path='/bulletin/:type/create' element={<CreateBulletin />} />
            <Route path='/bulletin/:type/:id' element={<ReadBulletin />} />
            <Route path='/users/:nickname' element={<UserPage />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
