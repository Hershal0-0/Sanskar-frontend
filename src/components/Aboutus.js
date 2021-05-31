import React from 'react'
import LocationMap from './LocationMap'
import companyProfile from '../assets/comProfile'
import {Image} from 'cloudinary-react'

const Aboutus = () => {
    return (
        <div>
            <div className="phantom"></div>
            <div className="container mb-3" style={{width:"100%",height:"500px"}}>
                <LocationMap location={{latitude:"19.1567951",longitude:"73.0774353"}} zoom={15} />
            </div>
            <div className="container jumbotron">
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
                        hello
                    </div>
                </div>
                <div >
                    <Image
                    key={1}
                    cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                    publicId='Sanskar/front_office_vbuq0o'
                    width="500"                                        
                    crop="scale"
                     />
                </div>
            </div>
            </div>
        </div>
    )
}

export default Aboutus
