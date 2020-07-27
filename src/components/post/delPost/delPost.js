import React, { useState, useEffect } from 'react';
import Cookie from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { baseUrl } from '../../../config';
import { SubmitButton, FormLabel, LabelDiv, FormDiv, ContentLabelDiv, Wrapper } from '../../../styles/globalStyles';
import styled from 'styled-components';
import Axios from 'axios';
// import {HomepageRefresh} from '../../../context/contexts';
import {toast} from 'react-toastify';

//warning message div
const DeleteWarning = styled(LabelDiv)`
    & label {
        align-self: center;
        font-size: 22px;
        padding-right: 30px;
    }

    & input {
        width: 20%;
        margin-left: auto;
        font-size: 24px;
    }

    & small {
        font-size: 18px;
    }
`
//selected blog post information div
const PostInfoDiv = styled(ContentLabelDiv)`
    margin-top: 50px;
    max-width: 500px;
    box-sizing: border-box;
    overflow-wrap: anywhere;
`
//Delete blog post confirmation
const DelPost = ({ match }) => {
    const [delSuccess, setDelSuccess] = useState(false);
    const [postContent, setPostContent] = useState({});

    //make delete request to api using postId in the parameters & set result actions
    function delPost(e) {
        e.preventDefault();
        const cookies = new Cookie();
        const res = Axios.delete(baseUrl + `delpost/${match.params.postId}`, {
            headers: {
                Authorization: `${cookies.get('admin_auth')}`
            }
        });
        res
            .then( (res) => {
                setDelSuccess(true);
                toast.info(`Post "${postContent.title}" has been deleted.`);
            })
            .catch(res => toast.error(res.response.data.msg));
    }

    //get post data to display in delete confirmation message
    async function fetchPost() {
        const cookies = new Cookie();

        const res = Axios.get(baseUrl + `getpost/${match.params.postId}`, {
            headers: {
                Authorization: `${cookies.get('admin_auth')}`
            }
        });
        res
            .then((res) => {
                setPostContent(res.data.post);
            })
            .catch(res => toast.error(res.response.data.msg));
    }

    useEffect(() => {
        fetchPost();
    }, []);

    if (delSuccess) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Wrapper>
            <FormDiv className="DelPost">
                <form onSubmit={delPost}>
                    <DeleteWarning>
                        <FormLabel>WARNING: <small>Deleted posts can not be recovered. Are you sure you want to delete the selected post?</small></FormLabel>
                        <SubmitButton type="submit" value="DELETE" />
                    </DeleteWarning>
                </form>
            </FormDiv>
            <PostInfoDiv>
                <div>
                    <FormLabel>id: {postContent._id}</FormLabel>
                    <FormLabel>title: {postContent.title}</FormLabel>
                    <FormLabel>date created: {postContent.dateCreated}</FormLabel>   
                </div>
            </PostInfoDiv>
        </Wrapper>
    )
}

export default DelPost;