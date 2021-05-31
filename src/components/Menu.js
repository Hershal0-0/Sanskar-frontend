import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'

const Menu = ({height}) => {
    const {menuIsOpen,toggleMenu,pageHeight,setPageHeight} = useContext(GlobalContext)
    useEffect(()=>{         
        if(menuIsOpen){
            const value=Math.max(pageHeight,window.innerHeight,document.body.clientHeight)
            console.log(pageHeight)
            let menu = document.querySelector('.menu')
            menu.style.height=`${value}px`
        }               
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    },[menuIsOpen])
    useEffect(()=>{
        if(window.innerHeight>=document.body.clientHeight){
            setPageHeight(window.innerHeight)    
        }
        else{
        setPageHeight(document.body.clientHeight)}
        if(menuIsOpen){
            
            let menu = document.querySelector('.menu')
            menu.style.height=`${pageHeight}px`
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps      
    },[document.body.clientHeight])
    if(!menuIsOpen){
        return null
    }    
    return (
        <div className="menu">            
            <Button
            className=" mt-3 ml-3" 
            style={{position:"fixed",zIndex:2,border:"1px solid #5271ff"}}
            onClick={()=>toggleMenu(false)}
            color="dark">
            <i className="fas fa-times"></i>
            </Button>            
            <div style={{height:"100%"}} className="d-flex">
                <div 
                style={{backgroundColor:"#212f66"}}
                className="height-100">
                    <Link onClick={()=> toggleMenu(false)} className="menu-links d-flex justify-content-center align-items-center first p-2" to="#" >Strategy</Link>
                </div>
                <div 
                style={{backgroundColor:"#5271ff"}}
                className="height-100">
                    <Link onClick={()=> toggleMenu(false)}
                     style={{color:"#212f66"}}
                     className="menu-links d-flex justify-content-center align-items-center second p-2" to="/aboutus">About Us</Link>
                </div>
                <div
                style={{backgroundColor:"#38b6ff"}} 
                className="height-100">
                    <Link onClick={()=> toggleMenu(false)}
                    style={{color:"#212f66"}}
                    className="menu-links d-flex justify-content-center align-items-center third p-2" to="/properties">Properties</Link>
                </div>
                <div
                style={{backgroundColor:"#5271ff"}} 
                className="height-100">
                    <Link onClick={()=> toggleMenu(false)} 
                    style={{color:"#212f66"}}
                    className="menu-links d-flex justify-content-center align-items-center fourth p-2"                     
                    to="#">DSA Associates</Link>
                </div>
                <div
                style={{backgroundColor:"#212f66"}} 
                className="height-100">
                    <Link onClick={()=> toggleMenu(false)} className="menu-links d-flex justify-content-center align-items-center fifth p-2" to="/forms">Contact Us</Link>
                </div>
            </div>
        </div>
    )
}

export default Menu
