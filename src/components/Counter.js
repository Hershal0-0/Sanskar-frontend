import React, { useEffect, useState } from 'react'
import anime from 'animejs'

const Counter = () => {
    const [offset,setOffset]=useState(0)
    const [counter,setCounter]=useState(false)
    let counts={clients:0,dsas:0,properties:0}
    let counting=anime({
        targets:counts,
        autoplay:false,
        duration:2000,
        clients:157,
        dsas:25,
        properties:10,
        easing:'linear',
        round:1,
        update:function(){
            try {
                let client=document.querySelector('.num-clients')
                client.innerHTML = counts.clients
                let dsa = document.querySelector('.num-dsa')
                dsa.innerHTML = counts.dsas
                let property =document.querySelector('.num-properties')
                property.innerHTML = counts.properties
            } catch (err) {
                console.error("")
            }
        }
        
    })
    // useEffect(()=>{
    //     counting.restart()
    // },[])
    useEffect(() => {
        window.onscroll = () => {          
          setOffset(window.pageYOffset)
          
        }
      }, []);
    useEffect(()=>{
        if(offset>=1170 && !counter ) {
            console.log(offset)
            counting.restart()
            setCounter(true)
        }
    },[offset])
    
    return (
        <div style={{width:800}} className="container d-flex counter">
                <div className="count-container">
                <div className="num-clients">0</div>
                <div className="d-flex flex-column pt-4" style={{maxWidth:"150px"}}>
                <i class="fas fa-3x fa-users"></i>
                <span className="count pr-2">Number Of Clients</span>
                </div>
                    
                </div>

                <div className="count-container">
                <div className="num-dsa">0</div>
                <div className="d-flex flex-column pt-4" style={{maxWidth:"150px"}}>
                <i class="fas fa-3x fa-university"></i>    
                <span className="count">Number Of Direct Selling Agents</span>
                </div>
                </div>

                <div className="count-container">
                <div className="num-properties">0</div>
                <div className="d-flex flex-column pt-4" style={{maxWidth:"150px"}}>
                <i class="fas fa-3x fa-city"></i>    
                <span className="count">Number Of Properites</span>
                </div>
                </div>
        </div>
    )
}

export default Counter
