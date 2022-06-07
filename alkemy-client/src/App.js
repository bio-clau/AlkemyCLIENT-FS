import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from './context/auth'
import Home from "./pages/Home";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Profile from './pages/Profile';
import Register from './pages/Register'
import Records from "./pages/Records";
import Error from './pages/Error'
import NotUser from './middlewares/NotUser';
import AuthUser from './middlewares/AuthUser'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={
              <NotUser>
                <Home />
              </NotUser>
            } />
            <Route path="/login" element={
              <NotUser>
                <Login />
              </NotUser>
            } />
            <Route path="/profile" element={
              <AuthUser>
                <Profile />
              </AuthUser>
            } />
            <Route path="/register" element={
              <NotUser>
                <Register />
              </NotUser>
            } />
            <Route path="/records" element={
              <AuthUser>
                <Records />
              </AuthUser>
            } />
            <Route path="/*" element={<Error message='Esa pagina no existe' mistake={true} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
