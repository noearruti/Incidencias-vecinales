import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('incidencias')
        .select('*');

      if (error) console.error('Error fetching data:', error);
      else setLocations(data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapContainer center={{ lat: 40.4168, lng: -3.7038 }} zoom={12} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            icon={L.icon({
              iconUrl: '/marker-icon.png',
              iconSize: [25, 41],
            })}
          >
            <Popup>
              <span>{location.description}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default App;