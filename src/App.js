import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from './context/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`
const PageHeader = styled.a`
  &:link{
    text-decoration: inherit;
    color: inherit;
    cursor: pointer;
  }
  &:visited{
    text-decoration: inherit;
    color: inherit;
    cursor: pointer;
  }
`

function App() {
  return (
    <React.StrictMode>
      <ToastContainer />
      <Wrapper>
        <PageHeader href="/"><h1 className="page-title">MY FAKE BLOG</h1></PageHeader>
        <Router basename={"/"}>
          <AuthContext />
        </Router>
      </Wrapper>
    </React.StrictMode>
  );
}

export default App;
