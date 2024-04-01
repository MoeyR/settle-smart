import './GoogleMap.scss';
import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';

function GoogleMap({latitude, longitude}){
    const position = {lat: Number(latitude), lng: Number(longitude)};
  return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} libraries={["places"]}>
            <section className='map-wrap'>
                <Map 
                    center={position} 
                    zoom={10}
                    mapId={process.env.REACT_APP_MAP_ID}>
                    <AdvancedMarker position={position}></AdvancedMarker>
                </Map>
            </section>
            
        </APIProvider>
  );
}

export default GoogleMap;