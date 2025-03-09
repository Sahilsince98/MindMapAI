import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Adventures } from './pages/Adventures';
import { Friends } from './pages/Friends';
import { Games } from './pages/Games';
import  Chart  from './pages/Chart';
import { Test } from './pages/Test';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { useAuthStore } from './store/authStore';
import Quiz from './pages/Quiz';
import Landing from './pages/Landing';
import { Motivation } from './pages/Motivation';
import {Profile} from './pages/Profile';
import UnpaidTest from './components/UnpaidTest';

export default function App() {
  const { token } = useAuthStore();

  return (
    <>
    <Router>
      <div className="flex flex-col min-h-screen">
        {token && (
          <>
            <Navbar />
            <div className="flex pt-16">
              <Sidebar />
              <div className="flex-1 ml-[80px] transition-all duration-300">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/chart" element={<Chart />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/adventures" element={<Adventures />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/quiz" element={<Quiz/>} />
                  <Route path="/motivation" element={<Motivation />} />
                  <Route path="/profile" element={<Profile />} />
                 
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </div>
          </>
        )}
        {!token && (
          <Routes>
              <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unpaidTest" element={<UnpaidTest />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
           
      </div>
    </Router>
   
  </>
  );
}