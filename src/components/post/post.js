import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Wrapper, CtrlButton, FilterSelector } from '../../styles/globalStyles';
import { baseUrl } from '../../config';
import ErrComponent from '../error';
import { Logout } from '../../context/auth';
import { UserContext } from '../../context/contexts';

const PostDiv = styled.div`
    min-height: 100px;
    width: 80%;
    border: 2px solid black;
    border-radius: 10px;
    margin: 0px 0px 40px 0px;
    color: #0D1317;
    box-sizing: border-box;
`

const PostTitle = styled.h3`
    width: 400px;
    text-transform: uppercase;
    padding: 20px 40px;
    margin: 0;
`

const PostContent = styled.div`
    padding: 10px 20px;
    white-space: pre-wrap;
`

const PostDetails = styled(PostContent)`
    display: flex;
    justify-content: space-between;
`

const PostHeaderDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const AdminControls = styled.div`
    width: 239px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
`

const ToolBar = styled.div`
    width: 80%;
    display: flex;
    justify-content: flex-end;
    margin: 0 0 10px 0;
`

const Posts = () => {
    const [hasErr, setErr] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [postOrder, setPostOrder] = useState("newest");
    const filterOptions = [
        { value: 'newest', label: 'NEW-OLD' },
        { value: 'oldest', label: 'OLD-NEW' }
    ]
    const { isAuthenticated } = useContext(UserContext);

    
    //add blog post catagories to list of filter selector options unless catagory already exists in filterOptions
    data.map((post) => {    
        const foundVal = filterOptions.findIndex(i => i.value[0] == post.catagory);
        if(foundVal < 0 ) filterOptions.push({value: post.catagory, label: 'catagory - ' + post.catagory});
    });

    //fetch all posts from api
    async function fetchPosts() {
        const res = axios.get(baseUrl);
        res
            .then((res) => {
                setData(res.data.posts.reverse());
            })
            .catch(res => setErr(true));
    }

    //filter selector - filter posts by catagory
    function filter(e){
        if(e.value === "newest" || e.value === "oldest"){ 
            orderByDate(e.value);
        } else {
            let filterArr = [];
            data.forEach((post) => {
                // eslint-disable-next-line eqeqeq
                if(e.value[0] == post.catagory){
                   filterArr.push(post); 
                } 
            })
            setFilteredData(filterArr);
        }
    }

    //filter selector - order posts by date created
    function orderByDate(e) {
        switch (e) {
            case "oldest":  
                setFilteredData([]);
                if (postOrder === "newest") {
                    setData(data.reverse());
                    setPostOrder("oldest");
                }
                break;
            case "newest":
                setFilteredData([]); 
                if (postOrder === "oldest") {   
                    setData(data.reverse());
                    setPostOrder("newest");
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Wrapper>
            <ToolBar>
                {data.length >= 1 && <FilterSelector isSearchable={false} options={filterOptions} placeholder="FILTER BY:" onChange={e => filter(e)} />}
                {isAuthenticated && <CtrlButton to="/createpost">CREATE POST</CtrlButton>}
                {isAuthenticated && <Logout />}
            </ToolBar>
            {hasErr && <ErrComponent />}
            {filteredData.length >= 1 ? filteredData.map((post) =>
                <PostDiv key={post._id}>
                    <PostHeaderDiv>
                        <PostTitle>{post.title}</PostTitle>
                        {isAuthenticated &&
                            <AdminControls>
                                <CtrlButton to={`/editpost/${post._id}`}>EDIT</CtrlButton>
                                <CtrlButton to={`/delpost/${post._id}`} data={post.title}>DELETE</CtrlButton>
                            </AdminControls>
                        }
                    </PostHeaderDiv>
                    <PostContent>{post.content}</PostContent>
                    <PostDetails>
                        <small>Catagory: {post.catagory}</small>
                        <small>{post.dateCreated}</small>
                    </PostDetails>
                </PostDiv>
            ) : data.map((post) =>
                <PostDiv key={post._id}>
                    <PostHeaderDiv>
                        <PostTitle>{post.title}</PostTitle>
                        {isAuthenticated &&
                            <AdminControls>
                                <CtrlButton to={`/editpost/${post._id}`}>EDIT</CtrlButton>
                                <CtrlButton to={`/delpost/${post._id}`} data={post.title}>DELETE</CtrlButton>
                            </AdminControls>
                        }
                    </PostHeaderDiv>
                    <PostContent>{post.content}</PostContent>
                    <PostDetails>
                        <small>Catagory: {post.catagory}</small>
                        <small>{post.dateCreated}</small>
                    </PostDetails>
                </PostDiv>
            )}
        </Wrapper>
    )
}

export default Posts;