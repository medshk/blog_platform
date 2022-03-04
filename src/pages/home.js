import MostViewedPosts from "../components/home/mostViewedPosts";
import TrendingTopics from "../components/home/trendingTopics";
import BestAuthors from "../components/home/bestAuthors";
import Footer from '../components/home/footer';
const Home = () => {
    return ( 
        <div className="home">
            <div className="container">
               < MostViewedPosts/>
               <TrendingTopics/>
               <BestAuthors/>
            </div>
        </div> 
     );
}
 
export default Home;