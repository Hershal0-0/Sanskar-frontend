import React,{createContext,useReducer} from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'
// import utils
import setAuthToken from '../utils/setAuthToken'

// Initial State
const initialState={
    projects:[],
    feedbacks:[],
    error:null,
    loading:true,
    menuIsOpen:false,
    pageHeight:0,
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    user:null
}


// Create Global Context
export const GlobalContext =createContext(initialState)

// Provider Component
export const GlobalProvider = ({children}) =>{
    const [state,dispatch]=useReducer(AppReducer,initialState)

    // Actions
    async function getProjects(){
        try {
            const res= await axios.get('https://sanskar-backend.herokuapp.com/api/projects')
            dispatch({
                type:'GET_PROJECTS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR_HANDLER',
                payload:err
            })
        }
    }

    async function addProject(values){
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body=JSON.stringify(values)
        try {  
            const res = await axios.post('https://sanskar-backend.herokuapp.com/api/projects',body,config)
            dispatch({
                type:"ADD_PROJECT",
                payload:res.data
            })
            
        } catch (err) {
            console.error(err)
            dispatch({
                type: 'ERROR_HANDLER',
                payload:err.response.data.errors
            })
        }
    }

    async function deleteProject(id){
        try {
            const res = await axios.delete(`https://sanskar-backend.herokuapp.com/api/projects/${id}`)
            dispatch({
                type:"DELETE_PROJECT",
                payload:res.data
            })
            dispatch(getProjects())
        } catch (err) {
            dispatch({
                type: 'ERROR_HANDLER',
                payload:err.response.data.error
            })
        }
    }

    async function getFeedbacks(){
        try {
            const res= await axios.get('https://sanskar-backend.herokuapp.com/api/feedbacks/display')
            dispatch({
                type:"GET_FEEDBACKS",
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type:"ERROR_HANDLER",
                payload:err.response.data.error
            })
        }
    }

    async function addFeedback(values){
        const config={
            headers:{
                "Content-Type":'application/json'
            }
        }
        const body = JSON.stringify(values)
        try {
            const res=await axios.post('https://sanskar-backend.herokuapp.com/api/feedbacks',body,config)
            dispatch({
                type:"ADD_FEEDBACK",
                payload:res.data
            })

        } catch (err) {
            dispatch({
                type:"ERROR_HANDLER",
                payload:err.response.data.error
            })
        }
    }

    async function resetFeedback(id){
        try {
            // eslint-disable-next-line
            const res = await axios.put(`https://sanskar-backend.herokuapp.com/api/feedbacks/${id}`)
            dispatch({
                type:"RESET_FEEDBACK",
                payload:id
            })
            // dispatch(getFeedbacks())
        } catch (err) {
            dispatch({
                type:"ERROR_HANDLER",
                payload:err.response.data.error
            })
        }
    }

    async function resetAllFeedbacks(){
        try {
            // eslint-disable-next-line
            const res = await axios.put('https://sanskar-backend.herokuapp.com/api/feedbacks/admin/all')
            dispatch(getFeedbacks())
        } catch (err) {
            dispatch({
                type:"ERROR_HANDLER",
                payload:err.response.data.error
            })
        }
    }

    async function sendInquiry(values){
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body=JSON.stringify(values)
        try {
            
            await axios.post('https://sanskar-backend.herokuapp.com/api/inquiry',body,config)
        } catch (err) {
            dispatch({
                type:"ERROR_HANDLER",
                payload:err.response.data.errors
            })
        }
    }

    function toggleMenu(value){
        dispatch({
            type:"TOGGLE_MENU",
            payload:value
        })
    }
    function setPageHeight(value){
        dispatch({
            type:"SET_PAGE_HEIGHT",
            payload:value
        })
    }

    function resetError(){
        dispatch({
            type:"ERROR_HANDLER",
            payload:null,
        })
    }

    async function loadUser(){
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('https://sanskar-backend.herokuapp.com/api/auth')
            dispatch({
                type: "USER_LOADED",
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type:"AUTH_ERROR",
            })
        }
    }
    
    async function login({username,password}){
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body=JSON.stringify({username,password})
        try {
            const res = await axios.post('https://sanskar-backend.herokuapp.com/api/auth',body,config)
            dispatch({
                type:"LOGIN_SUCCESS",
                payload:res.data
            })
            dispatch(loadUser())
        } catch (err) {
            const errors = err.response.data.errors[0]
            console.log(errors)
            dispatch({
                type:"LOGIN_FAIL",
                payload:errors
            })
        }
    }

    async function logout(){
        dispatch({
            type:"LOGOUT"
        })
    }
    
    return (
        <GlobalContext.Provider 
            value={{
                projects:state.projects,
                feedbacks:state.feedbacks,
                error:state.error,
                loading:state.loading,
                menuIsOpen:state.menuIsOpen,
                pageHeight:state.pageHeight,
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                user:state.user,
                // Actions
                getProjects,
                addProject,
                deleteProject,
                getFeedbacks,
                addFeedback,
                resetFeedback,
                resetAllFeedbacks,
                sendInquiry,
                toggleMenu,
                setPageHeight,
                loadUser,
                login,
                logout,
                resetError    
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}