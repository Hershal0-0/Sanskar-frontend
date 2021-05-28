import React,{useState,useContext, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'
// import PropTypes from 'prop-types'

const Login = props => {
    const [formData,setFormData]=useState({
        username:"",
        password:""
    })
    const {loadUser,login,isAuthenticated,token,error,resetError,setPageHeight} = useContext(GlobalContext)

    useEffect(()=>{
        loadUser()
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
    useEffect(() => {
        if(error!==null && error!==undefined)
        window.alert(error)
        resetError()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])


    // Handling Change in Form's Data
    const {username,password}=formData
    const onChange= (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        login({username,password})
        // console.log("LOGIN SUCCESS")
        setFormData({
            username:"",
            password:""
        })       
    }


    // Redirect if logged in
    if(isAuthenticated && token!==null){
        return <Redirect to='/admin'/>
    }
    return (
        
        <div className="d-flex justify-content-center" style={{marginTop:200}}>
        <div className="login-form p-5">
        <h1 className="large text-primary" >Sign In</h1>
        <p className="lead" style={{color:"aliceblue"}}><i className="fas fa-user" style={{color:"aliceblue"}}></i> Sign Into Your Account</p>
        <form className="form" onSubmit = {e => onSubmit(e)}>
            
            <div className="form-group">
            <input 
            type="text" 
            placeholder="Your Username" 
            name="username"
            value={username}
            onChange={e => onChange(e)}
            required />
            
            </div>
            <div className="form-group">
            <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={e => onChange(e)}
                
            />
            </div>
            
            <input 
            type="submit" 
            className="btn btn-primary" 
            style={{width:"100%"}}
            value="Login" />
        </form>
        </div>
        </div>
        
    )
}

// Login.propTypes = {

// }

export default Login
