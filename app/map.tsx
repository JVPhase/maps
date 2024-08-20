import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import { LatLngExpression } from 'leaflet';
import { useState } from 'react';

export default function Map() {
  const positions = [
    { name: 'дешевые шлюхи', position: [51.505, -0.09] as LatLngExpression },
    { name: 'дорогие шлюхи', position: [51.515, -0.09] as LatLngExpression },
    { name: 'средние шлюхи', position: [51.525, -0.09] as LatLngExpression },
    {
      name: 'очень дорогие шлюхи',
      position: [51.535, -0.09] as LatLngExpression,
    },
  ];
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="map-wrapper">
      <div id="map" style={{ height: '100vh' }}>
        <select
          multiple
          value={selected}
          onChange={(event) => {
            const options = Array.from(event.target.options);
            setSelected(
              options
                .filter(({ selected }) => selected)
                .map(({ value }) => value)
            );
          }}
        >
          {positions.map(({ name }) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <MapContainer
          center={[51.525, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positions.map(
            ({ name, position }) =>
              selected.includes(name) && (
                <Marker key={name} position={position}>
                  <Popup>{name}</Popup>
                </Marker>
              )
          )}
        </MapContainer>
      </div>
    </div>
  );
}
