import forest from "../../images/forest.jpg";
import profile from "../../images/profile.jpg";
import post from "../../images/post5.jpg";
import PostCard from "../post/postCard";
import { useParams } from "react-router-dom";
import { getAuthor, getPost, getPostByAuthor } from "../../firebaseConfig";
import { useMemo, useEffect, useState } from "react";
import Loader from "../layout/loader";

const AuthorProfileView = () => {
  const params = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const result = useMemo(() => getPostByAuthor(params.id), [params.id]);

  useEffect(() => {
    setIsPending(true);
    getAuthor(params.id).then((response) => {
      setAuthor(response);
      setIsPending(false);
    });
  }, []);

  useEffect(() => {
    console.log("posts", result);
    setPosts(result);
    return () => {
      setPosts(null);
    };
  }, []);

  return (
    <div className="profile-view">
      {isPending && <Loader />}
      <div className="bg-image">
        <img src={forest} alt="" />
      </div>
      {author && (
        <div className="container">
          <div className="author-info">
            <img src={author.photoURL} alt="" />
            <h4>{author.displayName}</h4>
            <p>{author.niche}</p>
            <p>{author.email}</p>
            <div className="stats">
              <div>
                <p>301K</p>
                <p>View</p>
              </div>
              <div>
                <p>{author.posts.length}</p>
                <p>Post</p>
              </div>
            </div>
            <p className="desc">{author.bio}</p>
          </div>
          <div className="post-grid">
            {posts &&
              posts.map((post) => {
                return <PostCard post={post} author={author}></PostCard>;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorProfileView;
