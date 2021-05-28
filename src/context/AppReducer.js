const AppReducer = (state,action) =>{
    const {type,payload}=action
    switch(type){
        
        case "GET_PROJECTS":
            return{
                ...state,
                projects:payload
            }
        case "ADD_PROJECT":
            return{
                ...state,
                projects:[payload,...state.projects]
                
            }
        case "DELETE_PROJECT":
            return{
                ...state
            }
        case "GET_FEEDBACKS":
            return{
                ...state,
                feedbacks:payload
            }
        case "ADD_FEEDBACK":
            return{
                ...state,
                feedbacks:[payload, ...state.feedbacks]
            }
        case "RESET_FEEDBACK":
            return{
                ...state,
                feedbacks:state.feedbacks.filter(feedback=>feedback._id!==payload)
            }
        case "TOGGLE_MENU":
            return{
                ...state,
                menuIsOpen:payload
            }
        case "SET_PAGE_HEIGHT":
            return{
                ...state,
                pageHeight:payload
            }
        case "ERROR_HANDLER":
            return{
                ...state,
                error:payload
            }
        case "LOGIN_SUCCESS":
            localStorage.setItem('token',payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case "LOGIN_FAIL":
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null,
                error:payload.msg
            }
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null
            }
        case "USER_LOADED":
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        default:
            return state
    }
}

export default AppReducer