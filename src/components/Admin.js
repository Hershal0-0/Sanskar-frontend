import React,{Fragment, useState, useContext, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'
import {Button,Modal, ModalHeader, ModalBody,Card,CardBody,CardTitle,CardText} from 'reactstrap'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

const IndProject=({project})=>{

    const {deleteProject}=useContext(GlobalContext)

    const handleDelete= (id)=>{        
        let decision = window.confirm(`DO YOU REALLY WANT TO DELETE THE PROJECT WITH DETAILS: \n
        Title:${project.title}\n
        Description:${project.description}\n
        Location:${project.location}\n
        FROM THE DATABASE`)
        if(decision){
            deleteProject(id)            
        }
    }
    return(
        <Fragment>
            <li style={{display:'flex',justifyContent:'space-between'}}>
            {project.title}
            <Button 
            color="white"
            onClick={()=> handleDelete(project._id) } 
            className="mr-5 p-0">
            <i 
            className="fad fa-trash-alt fa-2x"></i>
            </Button>
            </li><hr/>
        </Fragment>
    )
}

const IndFeedback=({feedback})=>{
    const {resetFeedback}=useContext(GlobalContext)
    return(
    <div>
      <Card style={{height:"250px",width:"175px"}} className="mr-1 mb-2">
        
        <div className="d-flex justify-content-end">
        <Button
            onClick={()=>{resetFeedback(feedback._id)}} 
            color="white" 
            className="p-0 mt-1 mr-1">
            <i className="fad fa-times-square m-0 fa-2x"></i>
        </Button>
        </div>
        <CardBody style={{overflow:"auto"}}>
          <CardTitle tag="h5">{feedback.name}</CardTitle>
          {/* <CardSubtitle tag="h6" className="mb-2 text-muted">{feedback.email}e</CardSubtitle> */}
          <CardText>
              {feedback.feedback}
          </CardText>

        </CardBody>
      </Card>
    </div>
    )
}



const AddProjectForm = () => {
  
    const {addProject}=useContext(GlobalContext)
    const [modal, setModal] = useState(false);    
    // state to store Selected Image Data
    const [imageSelected,setImageSelected] = useState([])
    const [formData,setFormData]=useState({
        title:"",
        description:"",
        img:[],
        location:""
    })
    const toggle = () => setModal(!modal);
    const {title,description,img,location}=formData

    useEffect(()=>{
        if(formData.img.length!==0){
            console.log(formData.img)
            setAuthToken(localStorage.token)
            addProject(formData)
            toggle()
            setFormData({
                title:"",
                description:"",
                img:"",
                location:""
            })      
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formData.img])

    const uploadImage=()=>{
        // Upload To Cloudinary Account
        // const [imgPublicId,setImgPublicId]=useState([])
        const images = [...imageSelected]               
        let arr = []
        images.map(async(image)=>{
            const imgFormData = new FormData()
            imgFormData.append('file',image)
            imgFormData.append('folder',"Sanskar")
            imgFormData.append('upload_preset',process.env.REACT_APP_CLOUDINARY_PRESET_NAME)
            try {
            const res=await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/`,imgFormData)            
            console.log(res)
            arr=[...arr,res.data.public_id]
            
            // setImgPublicId([...imgPublicId,res.data.public_id])
            // if(index===imageSelected.length-1){
            //     console.log(arr)
            // }
            if(arr.length===imageSelected.length){
                
                setFormData({
                    ...formData,
                    img:arr
                })
                setImageSelected([])
                
            }
            
            } catch (err) {            
            console.error(err)
            
            }
            
            
        })
        
        // console.log(arr)
    }


    const onChange= (e)=> setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit=(e)=> {
        e.preventDefault()
        setAuthToken()
        uploadImage()        
        // setAuthToken(localStorage.token)
        // addProject(formData)
        // toggle()                         
    }
    // Individual Image In List Component
    const IndImage=({image,index})=>{
        const handleDelete=(index)=>{
            const images=[...imageSelected]
            images.splice(index,1)
            setImageSelected(images)
        }
        return(
            <Fragment>
            <div className="p-0 mb-1 d-flex" >
                <li 
                className="p-0 m-0"
                style={{width:"50%"}}
                >{image.name}</li>
                <Button
                color="danger"
                className="p-0 px-1"
                onClick={()=>handleDelete(index)}
                style={{height:"fit-content",width:"fit-content"}}
                ><i className="fas fa-times"></i></Button>
            </div><hr/>
            </Fragment>
        )
    }
    return (
      <div>
        <Button color="success" onClick={toggle} className="mr-5 p-0 mt-2" >
        <i className="fad fa-layer-plus fa-2x"></i>
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add A New Project</ModalHeader>
          <ModalBody>
            
            <form className="form" 
            onSubmit = {e => onSubmit(e)}
            >
            
            <div className="form-group">
            <label htmlFor="title"><h5> Enter Project Title</h5></label><br/>
            <input
            className="ml-5" 
            type="text" 
            placeholder="Project Title" 
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required />
            
            </div>
            <div className="form-group">
            <label htmlFor="description"><h5> Enter Project Description</h5></label><br/>
            <textarea
                className="ml-5"
                cols="40"
                type="text"
                placeholder="Project Description"
                name="description"                
                value={description}
                onChange={e => onChange(e)}
                
            />
            </div>

            {/* Image Uplaod Form-Group */}
            <div className="form-group">
                <label htmlFor="image"><h5>Upload Images</h5></label><br/>
                <input 
                    type="file" 
                    name="image"
                    onChange={(e)=>{
                        setImageSelected([...imageSelected,...e.target.files])
                        // console.log(imageSelected)                                                
                    }}
                    className="ml-5"
                    id="image_upload"
                    style={{color:"transparent"}}
                    multiple
                />
                {/* <button onClick={uploadImage} >Upload Image</button> */}
            </div>

            <div className="form-group">
                <ul className="list-display">
                    {imageSelected.map((image,index)=><IndImage image={image} index={index} key={index} />)}
                </ul>
            </div>

            <div className="form-group">
            <label htmlFor="location"><h5> Enter Project Location</h5></label><br/>
            <input
                className="ml-5"
                type="text"
                placeholder="Project Location"
                name="location"                
                value={location}
                onChange={e => onChange(e)}
                
            />
            </div>
            
            <hr/>
            <div className="flex-right">
            <input 
            type="submit" 
            className="btn btn-primary" 
            value="Add Project" />
            </div>
        
          </form>
            </ModalBody>
           
        </Modal>
      </div>
    );
  }

const Admin = () => {
    const {
        loadUser,
        isAuthenticated,
        logout,
        token,
        getProjects,
        projects,
        feedbacks,
        getFeedbacks,
        resetAllFeedbacks,
        setPageHeight
    }=useContext(GlobalContext)
    useEffect(()=>{
        loadUser()
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[document.body.clientHeight])
    if(!isAuthenticated || token==null){
        return <Redirect to='/login'/>
    }

    return (
        <div>
            <div className="flex-right">
                <Button color="danger" onClick={()=>logout()}>Logout</Button>
            </div>
            <div className="container jumbotron p-0 pl-1 mt-2" style={{maxWidth:800}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <h3 className="mt-2">Projects</h3>
                    <AddProjectForm/>
                    
                </div><hr/>
                <ul className="list-display short-list p-0">
                {projects.map(project=> <IndProject project={project} key={project._id} />)}
                </ul>
            </div>

            <div className="container jumbotron p-0 pl-1 mt-2" style={{maxWidth:800}} >
            <div style={{display:'flex',justifyContent:'space-between'}}>
                    <h3 className="mt-2">Feedbacks</h3>
                    
                    <Button
                    onClick={()=>resetAllFeedbacks()} 
                    color="info" 
                    className="mr-5 p-0 mt-2">
                    <i className="fad fa-redo-alt fa-2x"></i>
                    </Button>
                    
            </div><hr/>
            <div className="feedbacks">
                {feedbacks.map(feedback=> <IndFeedback feedback={feedback} key={feedback._id} /> )}
            </div>
            </div>
        </div>
    )
}

export default Admin
