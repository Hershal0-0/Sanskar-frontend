import React, { useState,useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'


const InquiryForm = (props)=>{

    const {sendInquiry} = useContext(GlobalContext)
    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        mobile:"",
        inquiry:""
    })
    const {firstName,lastName,email,mobile,inquiry} = formData

    const onSubmit = async(e)=>{
        e.preventDefault()                    
            
            sendInquiry(formData)
            window.alert("Inquiry Sent Successfully")
            setFormData({
                firstName:"",
                lastName:"",
                email:"",
                mobile:"",
                inquiry:""
            })
        
    }
    const onChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return(
        <div className="form1 d-flex justify-content-center">
        <form className="form mt-5 mb-5" onSubmit = {e => onSubmit(e)}>
            <div className="form-group">
            <label className="label" htmlFor="firstName">Enter Your First Name</label><br/>
            <input 
            type="text" 
            placeholder="Enter First Name" 
            name="firstName"
            value={firstName}
            onChange={e => onChange(e)}
            required />
            
            </div>
            <div className="form-group">
            <label className="label" htmlFor="lastName">Enter Your Last Name</label> <br/>
            <input
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={lastName}
                onChange={e => onChange(e)}
                required
            />
            </div>

            <div className="form-group">
            <label className="label" htmlFor="email">Enter Your Email</label><br/>
            <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
            />
            </div>

            <div className="form-group">
            <label className="label" htmlFor="mobile">Enter Your Contact Name</label><br/>
            <input
                type="text"
                placeholder="Enter Contact No"
                name="mobile"
                value={mobile}
                onChange={e => onChange(e)}
                required
            />
            </div>

            <div className="form-group">
            <label className="label" htmlFor="inquiry">Enter Your Inquiry</label><br/>
            <textarea
                type="text"
                placeholder="Say Something"
                name="inquiry"
                value={inquiry}
                onChange={e => onChange(e)}
                required
            />
            </div>
            
            <input 
            type="submit" 
            className="btn btn-primary" 
            value="Ask Us Something" />
        </form>
        
        </div>
    )
        
}

const FeedbackForm=(props)=>{    
    const {addFeedback}=useContext(GlobalContext)
    const [formData,setFormData]=useState({
        name:"",
        feedback:""
    })
    const onSubmit = (e)=>{
        e.preventDefault()
        addFeedback(formData)
        setFormData({
            name:"",
            feedback:""
        })
    }
    const onChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const {name,feedback}=formData
    return(
        <div className="d-flex flex-column">
        <div className="form2 d-flex justify-content-center">
        <form className="form mt-5 mb-5"  onSubmit = {e => onSubmit(e)}>
            <div className="form-group">
            <label className="label" htmlFor="name">Pls Enter Your Name</label><br/>
            <input 
            type="text" 
            placeholder="Your Name" 
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required />
            
            </div>
            <div className="form-group">
            <label className="label" htmlFor="feedback">Enter Feedback</label><br/>
            <textarea
                type="feedback"
                placeholder="Enter Your Feedback"
                name="feedback"                
                value={feedback}
                onChange={e => onChange(e)}
                required
            />
            </div>
            
            <input 
            type="submit" 
            className="btn btn-primary" 
            value="Submit Feedback" />
        </form>                
        </div>
        <div className="phantom feed-phantom"></div>
        </div>
    )
        

}
const Forms = props => {
    const {setPageHeight} = useContext(GlobalContext)
    useEffect(()=>{
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
    const [formType,toggle]=useState("first")
    return (
        <div>
        <div className="mt-5 p-0 form-container" style={{maxWidth:400}}>
            <button
            className="btn btn-primary"
            style={{
                borderBottomRightRadius:0,
                borderTopRightRadius:0,
                width:"50%"}} 
            onClick={()=> toggle("first")} 
            >Inquiry</button>
            <button
            className="btn btn-info" 
            style={{                
                borderBottomLeftRadius:0,
                borderTopLeftRadius:0,
                width:"50%"}} 
            onClick={()=> toggle("second")}>Feedback</button>
        </div>
        <div className="form-container mt-5">
        {formType==="first" ? <InquiryForm />: <FeedbackForm /> }
        </div>
        
        </div>
    )
}

export default Forms
