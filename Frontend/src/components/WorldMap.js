import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';

const WorldMap = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleCountryClick = (countryCode) => {
    if (countryCode) {
      console.log(countryCode);
      navigate(`/country/${countryCode}`);
    }
  };

  const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'}}>
      <div style={{ width: "1400px", borderStyle: 'double' }}>
        <ComposableMap data-tip="">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    console.log('herere', geo.properties.name);
                    handleCountryClick(geo.properties.name)
                  }}
                  // onMouseEnter={() => {
                  //   const { NAME } = geo.properties;
                  //   setContent(`${NAME}`);
                  // }}
                  // onMouseLeave={() => {
                  //  setContent('');
                  // }}
                  style={{
                    default: { fill: "#D6D6DA", outline: "none" },
                    hover: { fill: "#F53", outline: "none" },
                    pressed: { fill: "#E42", outline: "none" }
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};

export default WorldMap;
