import React, {useState, useContext, useEffect, useRef } from 'react'
import { GlobalContext } from '../context/GlobalState'
import IndFeedback from './IndFeedback'
import Counter from './Counter'
import companyProfile from '../assets/comProfile'
import {Image} from 'cloudinary-react'
import anime from 'animejs'
import {Button} from 'reactstrap'
import Carousel from 'react-elastic-carousel'
import {Tooltip} from 'react-tippy'
import { Link } from 'react-router-dom'

// import PropTypes from 'prop-types'



const Landing = props => {
    const {projects,feedbacks,getProjects,getFeedbacks,setPageHeight}=useContext(GlobalContext)
    const [imgLink,setImgLink]=useState([])
    const carouselRef=useRef(null)
    let totalPages
    let resetTimeout;
    const itemsPerPage=1
    // Profile Animation
        let profileLeft=anime({
            targets:'.comp-aboutus',
            translateX:[-200,0],
            autoplay:false,
            duration:1000,
            opacity:['0','1'],            
            easing: 'linear',
            
        })

        let profileRight=anime({
            targets:'.profile-img',
            translateX:[200,0],
            autoplay:false,
            duration:1000,
            opacity:['0','1'],
            easing: 'linear',
            
        })

        let styleShape=anime({
            targets:'.style-shape',
            translateY:[200,0],
            autoplay:false,
            duration:1000,
            opacity:['0','0.4'],
            easing: 'linear',
            
        })

        profileLeft.restart()
        profileRight.restart()
        styleShape.restart()
    // 
    useEffect(()=>{
        getProjects()
        getFeedbacks()
        setPageHeight(document.body.clientHeight)        
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        if(window.innerHeight>=document.body.clientHeight){
            setPageHeight(window.innerHeight)    
        }
        else{
        setPageHeight(document.body.clientHeight)}
    },[document.body.clientHeight])
    useEffect(()=>{
        const links=[]
        projects.map((project)=>{
            links.push(...project.img)
        })
        links.sort(() => Math.random() - 0.5);
        setImgLink(links)
        Math.ceil(imgLink.length / itemsPerPage)
    },[projects])
    return (
        <div>
            {/* <div className="d-flex justify-content-center mt-3">Landing</div> <hr/> */}
            <div className="style-shape m-0 p-0"></div>
            <div className="container mb-5">
            <div><h3>About Us</h3></div><hr/>
            <div className="d-flex justify-content-between">
               
                <div className="d-flex flex-column comp-aboutus">
                    <div>
                        <h3 className="comp-name">Sanskar</h3>
                        <p className="comp-sub">Builders & Developers</p>
                    </div>
                    <div className="comp-profile pr-4">
                        {companyProfile[0]} <br/> <br/>
                        {companyProfile[1]}
                    </div>
                </div>                                        
                <div className="profile-img">
                    <Image
                    key={1}
                    cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                    publicId='Sanskar/cake_w0fjj9'
                    
                    width="500"                                        
                    crop="scale"
                     />
                </div>
            </div>
            </div>
            <div className="phantom"></div>
            {/* Gallery Of Properties Images */}
            <div className="container">
            <div className="d-flex justify-content-between">
                <h4 style={{fontFamily:"rubik"}}>Gallery</h4>
                <Tooltip 
                position="bottom"
                title="View All Properties">
                <Link to='/projects'>
                    <Button className="p-0" style={{backgroundColor:'transparent',border:'0px'}} ><i className="fas fa-2x fa-external-link-alt"></i></Button>
                </Link>          
                </Tooltip>
            </div><hr />
            <Carousel
                    ref={carouselRef} 
                    transitionMs={1000}
                    enableSwipe={true}
                    enableAutoPlay={true}
                    autoPlaySpeed={5000}
                    onNextEnd={({ index }) => {
                        try {
                            clearTimeout(resetTimeout)
                            if (index + 1 === totalPages) {
                            resetTimeout = setTimeout(() => {
                                carouselRef.current.goTo(0)
                            }, 1500) // same time
                        }
                        } catch (err) {
                            console.log("")
                        }
                        
                    }}
                    
                    >
                    {imgLink.map((link,index)=> 
                        <Image
                            key={index} 
                            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                            publicId={link}
                            width="400" 
                            crop="scale"
                        />
                    )}   
                    </Carousel>
            </div>

            <div className="phantom"></div>


            <div className="feedback-bg">
            <div className="container  p-0 pl-1 mt-2" style={{maxWidth:800}} >
            <div style={{display:'flex',justifyContent:'center'}}>
                    <h3 className="mt-2" style={{color:"white"}}>Feedbacks</h3>                                                            
            </div><hr/>
            <div className="feedbacks">
                {feedbacks.map(feedback=> <IndFeedback feedback={feedback} key={feedback._id} /> )}
            </div>
            </div>
            <br /><br />  
            </div>          
            <div className="phantom"></div>
            <Counter />
        </div>
    )
}


export default Landing
