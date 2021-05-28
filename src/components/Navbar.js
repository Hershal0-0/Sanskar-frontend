import React, { useContext, useEffect, useState } from 'react';
import {
  Collapse,Navbar,NavbarToggler,NavbarBrand,
  Nav,NavItem,NavbarText,Button
} from 'reactstrap';
import {Link} from 'react-router-dom'
import {Tooltip} from 'react-tippy'
// importing Component
import Menu from './Menu'
// Importing Global Context
import { GlobalContext } from '../context/GlobalState';

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);  
  const toggle = () => setIsOpen(!isOpen);
  const {toggleMenu}=useContext(GlobalContext)  
  return (
    <div className="mb-3">
      <Menu/>
      <Navbar className="navbar" light expand="md">
        <NavbarBrand>
          <Tooltip 
          position="bottom"
          title="Open Menu">
          <Button           
          className="proj-toggle menu-toggle" 
          onClick={()=>toggleMenu(true)}>
            <i className="fas fa-bars "></i>
          </Button>
          </Tooltip>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {/* <Nav navbar>            
            <NavItem className="ml-auto">
              <Link  to="/projects">Projects</Link>
            </NavItem>
          </Nav>
           */}
          <Nav 
          style={{width:"100%"}}
          className="d-flex justify-content-between align-items-center" navbar>
            <div style={{width:"33%"}}>              
            </div>
            <div style={{width:"33%"}} className="d-flex justify-content-center">
              <Link 
              to='/'
              style={{color:"black",textDecoration:"none"}} 
              className="d-flex align-items-end">
                <i className="fas fa-building fa-3x mr-2"></i>
                <div className="d-flex flex-column">
                <h3 className="m-0 p-0 comp-name nav">Sanskar</h3>
                <p  className="m-0 p-0 comp-sub">Builders And Developers</p>
                </div>
              </Link>
            </div>
            <div style={{width:"33%"}} className="d-flex justify-content-end">
            <div>
              <NavbarText>
              <Link className=" ml-2 p-2" style={{textDecoration:"none",borderRadius:"5px"}} to='/properties'>Properties</Link>
          
              </NavbarText>
            </div>
            <div>
              <NavbarText>
              <Link className=" ml-2 p-2" style={{textDecoration:"none",borderRadius:"5px"}} to='/forms'>FeedBack/Inquiry</Link>
            
              </NavbarText>
            </div>
            </div>
          </Nav>
        </Collapse>
      </Navbar>
      {/* <hr style={{width:"90%"}} /> */}
    </div>
  );
}

export default NavbarComponent;