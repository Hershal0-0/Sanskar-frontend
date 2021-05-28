import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer> 
        <div className="phantom" />
        <div className="footer">
            <div className="container d-flex justify-content-between  pb-3" style={{width:"80%"}}>
                <div className="d-flex flex-column justify-content-center align-items-start rubik-text">
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/">Feedbacks</Link>
                    <Link to="/forms">Contact Us</Link>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-start">
                    <div className="d-flex">
                    <div><i className="fad fa-home" style={{color:"#4d88e8"}}></i></div>  
                    <div className="d-flex flex-column align-items-start">
                        <div className="rubik-text">shop no: 1 , 2 shakuntala</div>
                        <div className="rubik-text">shrishti shivaji chowk lodha</div> 
                        <div className="rubik-text">heaven dombivli east , 421204</div>
                    </div>
                    </div>
                    <div className="rubik-text">
                    <i className="fad fa-phone-office" style={{color:"#4d88e8"}}></i> 9224257777
                    </div>
                    <div className="rubik-text">
                    <i className="fad fa-envelope-square" style={{color:"#4d88e8"}}></i> sanskar@gmail.com
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-start">

                    <div className="rubik-text">
                        Linked<i className="fab fa-linkedin" style={{color:"#4d88e8"}}></i>
                    </div>

                    <div className="rubik-text">
                        Instagram <i className="fab fa-instagram-square" style={{color:"#4d88e8"}}></i>
                    </div>
                    
                </div>
            </div>
            {/* <div>Styled By Hershal</div> */}
        </div>
        </footer>
    )
}

export default Footer
