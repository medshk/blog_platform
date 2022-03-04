import med from '../../images/med.jpg';
import jose from '../../images/jose.jpg';
import fianso from '../../images/fianso.jpg'
const BestAuthors = () => {
    return ( 
        <div className="authors">
        <h1>Our Authors</h1>
        <div className="card-container">
            <div className="card">
                <div className="img-container">
                    <img src={med} alt="" />
                </div>
                <div className="details">
                    <h3>Med Ben</h3>
                    <span>Developer</span>
                    <p>300K Views</p>
                </div>
            </div>
            <div className="card">
                <div className="img-container">
                    <img src={jose} alt="" />
                </div>
                <div className="details">
                    <h3>Jose kh</h3>
                    <span>Developer</span>
                    <p>300K Views</p>
                </div>
            </div>
            <div className="card">
                <div className="img-container">
                    <img src={fianso} alt="" />
                </div>
                <div className="details">
                    <h3>fianso BK</h3>
                    <span>Gemman</span>
                    <p>300K Views</p>
                </div>
            </div>
        </div>
        </div>
     );
}
 
export default BestAuthors;