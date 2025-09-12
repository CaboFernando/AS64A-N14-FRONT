import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Aside from './components/Aside';
import Footer from './components/Footer';
import BoasVindas from './components/BoasVindas';
import GradeNova from './components/GradeNova';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header className="header" />
      <Nav className="nav" />
      <div className="content">        
        <div className="main">
          <BoasVindas className="boas-vindas" />
          <GradeNova className="grade-nova" />
          <Main />
        </div>
        <Aside className="aside" />
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default App;
