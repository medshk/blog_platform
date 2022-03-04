import item1 from '../../images/item1.jpg';
import item2 from '../../images/item2.jpg';
import item3 from '../../images/item3.jpg';
import item4 from '../../images/item4.jpg';
import item5 from '../../images/item5.jpg';
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
                <span>TECHNOLOGY</span>
                <a href="">Express of Node Js or Laravel</a>
                </div>
               
            </div>
            <div className="post">
                <div>
                    <a href="">
                        <img src={item2} alt="" />
                    </a>
                </div>
                <span>TECHNOLOGY</span>
                <a href="">Express of Node Js or Laravel</a>
            </div>
            <div className="post">
                <div>
                    <a href="">
                        <img src={item3} alt="" />
                    </a>
                </div>
                <span>TECHNOLOGY</span>
                <a href="">Express of Node Js or Laravel</a>
            </div>
            <div className="post">
                <div>
                    <a href="">
                        <img src={item4} alt="" />
                    </a>
                </div>
                <span>TECHNOLOGY</span>
                <a href="">Express of Node Js or Laravel</a>
            </div>
            <div className="post">
                <div>
                    <a href="">
                        <img src={item5} alt="" />
                    </a>
                </div>
                <span>TECHNOLOGY</span>
                <a href="">Express of Node Js or Laravel</a>
            </div>
        </div>
     );
}
 
export default MostViewedPosts;