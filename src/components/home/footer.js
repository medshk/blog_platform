const Footer = () => {
    return ( 
        <div className="footer">
            <div className="info-container">
                <div className="info">
                    <span>Services</span>
                    <p>Web Design</p>
                    <p>Blog</p>
                    <p>Freelance</p>
                    </div>
                <div className="info">
                    <span>About</span>
                    <p>Company</p>
                    <p>Team</p>
                    <p>Careers</p>
                </div>
                <div className="info">
                    <span>BlogIN</span>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus voluptas esse delectus dolor.</p>
                </div>
            </div>
            <div className="icon-container">
                <div className="icon"><i class="fab fa-facebook-f"></i></div>
                <div className="icon"><i class="fab fa-instagram"></i></div>
                <div className="icon"><i class="fab fa-twitter"></i></div>
                <div className="icon"><i class="fab fa-snapchat-ghost"></i></div>
            </div>
            <div className="company-name">BlogIN © 2021 </div>
        </div>
     );
}
 
export default Footer;