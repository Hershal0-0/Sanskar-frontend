import React,{ useEffect, useContext,useRef, useState} from 'react'
import Carousel from 'react-elastic-carousel'
import {Button} from 'reactstrap'
import {Image} from 'cloudinary-react'
import {GlobalContext} from '../context/GlobalState'
import LocationMap from './LocationMap'

const IndProject = ({project})=>{
    const itemsPerPage = 1
    const [projOpen,toggleProj]=useState(false)
    const carouselRef = useRef(null);
    const totalPages = Math.ceil(project.img.length / itemsPerPage)
    let resetTimeout;
    if(!projOpen){
        return(
            <div>
                <div className="d-flex justify-content-between">
                <div>
                    <h4>{project.title}</h4>
                </div>
                <div className="mr-3">
                <Button
                    onClick={()=>toggleProj(true)}
                    className="proj-toggle"
                >
                <i className="fas fa-chevron-down"></i>
                </Button>
                </div>
                </div>
                <Carousel
                style={{display:"none"}}
                ref={carouselRef}
                ></Carousel>
            <hr/>
            </div>
        )
    }
    return (
        <li className="single-li pb-2">
            <div className="d-flex">
                <div className="project-left d-flex flex-column justify-content-between">
                    <div>
                        {/* <div className="d-flex justify-content-between">
                            <div><h4>Title:{project.title}</h4></div>
                            <div>
                                <Button
                                    onClick={()=>toggleProj(false)}
                                    className="proj-toggle"
                                >
                                <i className="fas fa-chevron-up"></i>
                                </Button>
                            </div>
                        </div>             */}
                        <div style={{color:"black"}}><h4>{project.title}</h4></div>
                        <p style={{color:"black"}}>{project.description}</p>
                    </div>
                    <div>
                        {/* <p style={{marginBottom:0}}>Loc-Lat:{project.location.latitude}   Loc-Long:{project.location.longitude} </p> */}
                        <div style={{width: '400px', height: '200px'}}>
                            <LocationMap location={project.location} />
                        </div>
                    </div>
                </div>
                <div className="project-right">
                    {/* Img Carousel Logic */}
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
                    {project.img.map((link,index)=> 
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
                <div>
                    <Button
                        onClick={()=>toggleProj(false)}
                        className="proj-toggle"
                    >
                        <i className="fas fa-chevron-up"></i>
                    </Button>
                </div>
            </div>
    
                
                

                
            
        </li>
    )
}

const Project = props => {
    
    const {projects,getProjects,setPageHeight}=useContext(GlobalContext)
    useEffect(()=>{
        getProjects()
        setPageHeight(document.body.clientHeight)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        if(window.innerHeight>=document.body.clientHeight){
            setPageHeight(window.innerHeight)    
        }
        else{
        setPageHeight(document.body.clientHeight)}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[document.body.clientHeight])
    
    return (
        <div>
            <div className="container mt-3 project-list p-2 pt-4 pb-4">
            <ul className="list-display p-0">
            {projects.map((project)=> <IndProject key={project._id} project={project}/>)}
            </ul>            
            </div>            
        </div>
    )
}


export default Project
