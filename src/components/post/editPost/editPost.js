import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import {Wrapper, LabelDiv, FormLabel, ContentLabelDiv, CharCounter, SubmitButton, FormDiv} from '../../../styles/globalStyles';
import { baseUrl } from '../../../config';
import {toast} from 'react-toastify';

//Edit selected blog post
const EditPost = ({ match }) => {
    const [title, setTitle] = useState("");
    const [catagory, setCatagory] = useState("");
    const [content, setContent] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [charLength, setCharLength] = useState(0);

    useEffect(() => {
        setCharLength(content.length);
    }, [content.length])

    //fetch the selected post data
    async function fetchPost() {
        const cookies = new Cookie();

        const res = axios.get(baseUrl + `getpost/${match.params.postId}`, {
            headers: {
                Authorization: `${cookies.get('admin_auth')}`
            }
        });
        res
            .then((res) => {
                setTitle(res.data.post.title);
                setCatagory(res.data.post.catagory);
                setContent(res.data.post.content);
            })
            .catch(res => toast.error(res.response.data.msg))
    }

    useEffect(() => {
        fetchPost();
    }, [])

    //post edited data to api & set result actions
    async function updatePost(e) {
        const cookies = new Cookie();
        e.preventDefault();

        const res = axios({
            method: 'POST',
            url: baseUrl + `editpost/${match.params.postId}`,
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
                setUpdateSuccess(true);
                toast.success(`Post "${title}" updated successfully.`);
            })
            .catch(res => toast.error(res.response.data.msg));
    }

    function charLengthErr(){
        toast.error('Post content must be 1000 characters or less.');
    }

    if (updateSuccess) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Wrapper>
            <FormDiv className="EditPost">
                <form onSubmit={updatePost}>
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
                    {charLength < 1000 ? <SubmitButton type="submit" value="CREATE" data-test="submit"/> : <SubmitButton onClick={charLengthErr} value="CREATE" />}
                </form>
            </FormDiv>
        </Wrapper>
    )
}

export default EditPost;