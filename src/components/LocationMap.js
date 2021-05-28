import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <div style={{color:"red"}}><i className="fas fa-map-marker-alt fa-2x"></i></div>;
 
const LocationMap=({location,zoom=13})=> {
  
    const center={
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude)
    }
  
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD0O-e_6Lx7IKWfR2VqqoD9KrwZEH1MGIw" }}
          defaultCenter={center}
          defaultZoom={zoom}
          
        >
          <AnyReactComponent
            lat={center.lat}
            lng={center.lng}   
            style={{}}         
          />
        </GoogleMapReact>
      </div>
    );
  
}
 
export default LocationMap;