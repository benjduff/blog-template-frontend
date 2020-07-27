import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import React from 'react';

//shared page wrapper
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
//react-router-dom link styled as button
export const CtrlButton = styled(Link)`
    display:flex;
    align-items: center;
    padding:0.35em 1.2em;
    border:0.15em solid #0D1317;
    margin:0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    font-weight:600;
    color:#0D1317;
    transition: all 0.2s;
    background-color: transparent;
    cursor: pointer;

    &:hover{
         background-color:#ca860c;
    }
`
//form parent div
export const FormDiv = styled.div`
    display: flex;
    flex-flow: column;
    min-height: 100px;
    width: 80%;
    align-items: center;

    > form {
        display: flex;
        flex-flow: column;
        width: 80%;
    }
`
//labels on blog post form
export const FormLabel = styled.label`
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    padding-top: 20px;
    margin-right: auto;
`
//form input styled as button
export const SubmitButton = styled.input`
    width: 150px;
    height: 50px;
    padding:0.35em 1.2em;
    border:0.15em solid #0D1317;
    margin: 1em 0 0.3em auto;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    font-weight:600;
    color:#0D1317;
    text-align:center;
    transition: all 0.2s;
    background-color: transparent;
    cursor: pointer;

    &:hover{
         background-color:#ca860c;
    }
`
//form labels parent div
export const LabelDiv = styled.div`
    display: flex;
    margin-top: 25px;

    & input {
        width: 80%;
        margin-left: auto;
        background: transparent;
        border: 2px solid black;
        font-size: 24px;
    }

    & textarea {
        min-width: 80%;
        max-width: 80%;
        min-height: 150px;
        margin-left: auto;
        padding: 0;
        height: 200px;
        background: transparent;
        border: 2px solid black;
        font-size: 20px;
    }
`
//blog post content parent div
export const ContentLabelDiv = styled(LabelDiv)`
    > div {
        display: flex;
        flex-flow: column;
    }
`
//character counter
export const CharCounter = styled(FormLabel)`
    font-size: 15px;
    font-weight: 400;
`

//style react-select dropdown here
const ReactSelectElement = styled(Select)`

    > .react-select__control {
        width: 200px;
        border:0.15em solid #0D1317;
        margin:0 0.3em 0.3em 0;
        border-radius:0.12em;
        box-sizing: border-box;
        text-decoration: none;
        font-family:'Roboto',sans-serif;
        font-weight: 600;
        color: #0D1317;
        text-align:center;
        transition: all 0.2s;      
        background-color: transparent;
        cursor: pointer;

        &:hover{
            background-color: #ca860c;
            border:0.15em solid #0D1317;
        }

        > .react-select__value-container{

            > .react-select__placeholder{
                color: #0D1317;
            }
        }

        > .react-select__indicators{

            > .react-select__indicator-separator{
                background-color: #0D1317;
            }
            
            > .react-select__indicator{
                color: #0D1317;
            }
        }
    }

    > .react-select__control--is-focused{
        border-color: #0D1317;
        box-shadow: none;
    }

    > .react-select__menu{
        background-color: #e29f25;
        border:0.15em solid #0D1317;

        > .react-select__menu-list{ 
            padding: 0;

            > .react-select__option{
                background-color: transparent;
                text-decoration: none;
                font-family:'Roboto',sans-serif;
                font-weight: 600;

                &:hover{
                    background-color: #ca860c;
                }
            }

            > .react-select__option--is-selected{
                background-color: #ca860c;
                color: #0D1317;
            }
        }
    }
`
//export ReactSelectElement styled component 
export const FilterSelector = (props) => <ReactSelectElement classNamePrefix="react-select" {...props} />