import React from 'react';
import styled from 'styled-components';

const ErrDiv = styled.div`
    width: 100%;
    height: 400px;
    padding: 10px;
    color:#0D1317;

    p{
        font-family:'Roboto',sans-serif;
        font-weight:600;
    }
`

const ErrComponent = () => {

    return (
        <ErrDiv>
            <h1>OOPS.. There was an error getting the page content.</h1>
            <p>Please contact the site administrator for help!</p>
        </ErrDiv>
    )
}

export default ErrComponent;