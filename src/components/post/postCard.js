import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";

const PostCard = ({post,author}) => {
    const {id, createdAt, topic, title,coverImage} = post
    const date = new Date(createdAt)
    const joinDate = date.toDateString().slice(3)
    return ( 
        <div className="post">
        <div className="image-container">
            <Link to={`/post/${id}`}><img src={coverImage} alt="" /></Link>
        </div>
        <div className="info-box">
            <span>{topic}</span>
            <h2>{title}</h2>
            <div className="profile-info">
                <div className="profile-pic"><img src={author.photoURL} alt="" /></div>
                <p>By<div>{author.displayName}</div>{joinDate}</p>
            </div>
        </div>
    </div>
     );
}
 
export default PostCard;