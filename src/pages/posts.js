import post1 from '../images/post1.jpg';
import post2 from '../images/post2.jpg';
import post3 from '../images/post3.jpg';
import post4 from '../images/post4.jpg';
import post5 from '../images/post5.jpg';
import profile from '../images/profile.jpg';
import paris from '../images/paris.jpg';
import forest from '../images/forest.jpg';
import house from '../images/house.jpg';
import subway from '../images/subway.jpg'
import PostCard from '../components/post/postCard';
import { getPosts, getAuthor } from '../firebaseConfig';
import { useCallback, useEffect, useState } from 'react/cjs/react.development';
import { useAuth } from '../contexts/authContext';
import Loader from '../components/layout/loader';
const result = getPosts()
const Posts = () => {
    const [posts, setPosts] = useState(null)
    const user  = useAuth()
    
    useEffect(() =>{
        if(result) {
            const array = result.map((item)=>{
                return getAuthor(item.author)
            })
            Promise.all(array).then(values =>{
                const array = result.map((item,index)=>{
                   return {...item, author : values[index]}
                })
                setPosts(array)
            })
           
            return () =>{
                setPosts(null)
            }
        }
    },[result])
    return ( 
        <div className="posts">
            {!posts && <Loader/>}
            <div className="most-read-posts container">
                <div className="post post1">
                    <a href=""><img src={post1} alt="" /></a>
                    <div className="image-overlay">
                        <span>freelance</span>
                        <p>Apple's M1 the future of laptop</p>
                        <div className="date">19 June 2021</div>
                    </div>
                </div>

                <div className="post post2">
                    <a href=""><img src={post2} alt="" /></a>
                    <div className="image-overlay">
                        <span>tech</span>
                        <p>Apple's M1 the future of laptop</p>
                        <div className="date">19 June 2021</div>
                    </div>
                </div>
                <div className="post post3">
                    <a href=""><img src={post3} alt="" /></a>
                    <div className="image-overlay">
                        <span>design</span>
                        <p>Apple's M1 the future of laptop</p>
                        <div className="date">19 June 2021</div>
                    </div>
                </div>
                <div className="post post4">
                    <a href=""><img src={post4} alt="" /></a>
                    <div className="image-overlay">
                        <span>photography</span>
                        <p>Apple's M1 the future of laptop</p>
                        <div className="date">19 June 2021</div>
                    </div>
                </div>
                <div className="post post5">
                    <a href=""><img src={post5} alt="" /></a>
                    <div className="image-overlay">
                        <span>nature</span>
                        <p>Apple's M1 the future of laptop</p>
                        <div className="date">19 June 2021</div>
                    </div>
                </div>
            </div>
            <div className="recent-posts container">
                <h1>Recent Posts</h1>
                <div className="posts-container">
                  {posts && posts.map(post =>{return (
                      <PostCard post={post} author={post.author}/>
                  )})}
                </div>
            </div>
            <div class="pagination">
                <a href="#">&laquo;</a>
                <a href="#">1</a>
                <a href="#" class="active">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">6</a>
                <a href="#">&raquo;</a>
            </div>
            <div className="topic-grid">
            <div className="post post1">
                    <a href=""><img src={forest} alt="" /></a>
                    <div className="image-overlay">
                        <span>freelance</span>
                        <p>Apple's M1 the future of laptop</p>
                        <div className="date">19 June 2021</div>
                    </div>
                </div>

                <div className="post post2">
                    <a href=""><img src={paris} alt="" /></a>
                    <div className="image-overlay">
                        <span>tech</span>
                        <p>Apple's M1 the future of laptop</p>
                        <div className="date">19 June 2021</div>
                    </div>
                </div>
                <div className="post post3">
                    <a href=""><img src={house} alt="" /></a>
                    <div className="image-overlay">
                        <span>design</span>
                        <p>Apple's M1 the future of laptop</p>
                        <div className="date">19 June 2021</div>
                    </div>
                </div>
                <div className="post post4">
                    <a href=""><img src={subway} alt="" /></a>
                    <div className="image-overlay">
                        <span>photography</span>
                        <p>Apple's M1 the future of laptop</p>
                        <div className="date">19 June 2021</div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Posts;