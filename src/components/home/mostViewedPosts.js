import { Link } from "react-router-dom";
import item1 from "../../images/item1.jpg";
import item2 from "../../images/item2.jpg";
import item3 from "../../images/item3.jpg";
import item4 from "../../images/item4.jpg";
import item5 from "../../images/item5.jpg";
const MostViewedPosts = () => {
  return (
    <div className="top-posts">
      <div className="post item1">
        <div>
          <a href="">
            <img src={item1} alt="" />
          </a>
        </div>
        <div className="post-content">
          <span>TRAVEL</span>
          <a href="">Best destinations for summer 2024</a>
        </div>
      </div>
      <div className="post">
        <div>
          <Link to="">
            <img src={item2} alt="" />
          </Link>
        </div>
        <span>DIY</span>
        <a href="">You will be amazed by these life hacks!</a>
      </div>
      <div className="post">
        <div>
          <Link to="/post/mQ4P6E44PKdDbkp2KbWF">
            <img src={item3} alt="" />
          </Link>
        </div>
        <span>Music</span>
        <a href="">How to learn playing drums</a>
      </div>
      <div className="post">
        <div>
          <Link to="/post/mQ4P6E44PKdDbkp2KbWF">
            <img src={item5} alt="" />
          </Link>
        </div>
        <span>Career</span>
        <a href="">the importance of digital networking </a>
      </div>
      <div className="post">
        <div>
          <Link to="/post/mQ4P6E44PKdDbkp2KbWF">
            <img src={item4} alt="" />
          </Link>
        </div>
        <span>TECHNOLOGY</span>
        <a href="">Express of Node Js or Laravel</a>
      </div>
    </div>
  );
};

export default MostViewedPosts;
