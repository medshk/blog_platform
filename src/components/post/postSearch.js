import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import { db, getAuthor, getPosts, GetSwrPosts } from '../../firebaseConfig';
import PostCard from './postCard';



const PostSearch = () => {
  const parmas = useParams()
  //const { data: posts, update, error } = useCollection(`posts`)
 
  console.log("posts")
    return (
      <div className="posts">
          <div className="recent-posts container">
              <h1>Search</h1>
              {/* {posts && posts.map((post)=>{
                <PostCard post={post} author={author}/>
              })} */}
          </div>
      </div>
    );
}

export default PostSearch;
