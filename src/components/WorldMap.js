import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import worldData from '../data/world-110m.json'; // Ensure this path is correct

const WorldMap = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleCountryClick = (countryCode) => {
    navigate(`/country/${countryCode}`);
  };

  const geoUrl = 'https://unpkg.com/world-atlas@1.1.4/world/110m.json';

  const markers = [
    {
      markerOffset: -15,
      name: "Sau Paulo",
      coordinates: [-58.3816, -34.6037]
    }
  ]

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Tooltip>{content}</Tooltip>
      <div style={{ width: "1400px", borderStyle: 'double' }}>
        <ComposableMap data-tip="">
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography 
                    key={geo.rsmKey} 
                    geography={geo} 
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      setContent(`${NAME}`);
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    style={{
                      hover: { fill: "#F53", outline: "none" },
                      pressed: { fill: "#E42", outline: "none" }
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default WorldMap;
