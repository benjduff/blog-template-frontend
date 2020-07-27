import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { FormDiv, FormLabel, LabelDiv, ContentLabelDiv, Wrapper, SubmitButton, CharCounter } from '../../../styles/globalStyles';
import { baseUrl } from '../../../config';
import {toast} from 'react-toastify';

//create blog post form
const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [catagory, setCatagory] = useState("");
    const [content, setContent] = useState("");
    const [postSuccess, setPostSuccess] = useState(false);
    const [charLength, setCharLength] = useState(0);

    useEffect(() => {
        setCharLength(content.length);
    },[content.length]);

    //POST blog content, redirect and set Rerender bool if successful else handle the error
    async function postData(e) {
        const cookies = new Cookie();

        e.preventDefault();

        const res = axios({
            method: 'POST',
            url: baseUrl + 'createpost',
            headers: {
                Authorization: `${cookies.get('admin_auth')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                "title": title,
                "catagory": catagory,
                "content": content
            }
        });
        res
            .then(() => {
                setPostSuccess(true);
                toast.success(`Post "${title}" created successfully.`);
            })
            .catch(res => toast.error(res.response.data.msg));
    }

    if (postSuccess) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Wrapper>
            <FormDiv className="CreatePost">
                <form onSubmit={postData}>
                    <LabelDiv>
                        <FormLabel>Title</FormLabel>
                        <input type="text" data-test="title" value={title} onChange={e => setTitle(e.target.value)} required />
                    </LabelDiv>
                    <LabelDiv>
                        <FormLabel>Catagory</FormLabel>
                        <input type="text" data-test="catagory" value={catagory} onChange={e => setCatagory(e.target.value)} required />
                    </LabelDiv>
                    <ContentLabelDiv>
                        <div>
                            <FormLabel>Content</FormLabel>
                            <CharCounter>Characters: {charLength}</CharCounter>
                        </div>
                        <textarea type="text" data-test="content" value={content} onChange={e => setContent(e.target.value)} required />
                    </ContentLabelDiv>
                    <SubmitButton type="submit" value="CREATE" data-test="submit" />
                </form>
            </FormDiv>
        </Wrapper>
    )
}

export default CreatePost;