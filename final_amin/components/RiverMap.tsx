'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Droplets, Factory, MapPin } from 'lucide-react'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom icons
const pollutionIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="#9333ea" opacity="0.3"/>
      <circle cx="16" cy="16" r="10" fill="#a855f7"/>
      <circle cx="16" cy="16" r="6" fill="#fff"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
})

const factoryIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="#3b82f6" opacity="0.3"/>
      <circle cx="16" cy="16" r="10" fill="#60a5fa"/>
      <circle cx="16" cy="16" r="6" fill="#fff"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
})

const encroachmentIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="#f59e0b" opacity="0.3"/>
      <circle cx="16" cy="16" r="10" fill="#fbbf24"/>
      <circle cx="16" cy="16" r="6" fill="#fff"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
})

interface RiverMapProps {
  data: {
    pollution: any[]
    factories: any[]
    encroachment: any[]
    rivers: any
  }
  activeLayer: 'all' | 'pollution' | 'encroachment' | 'factories'
}

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  
  return null
}

export default function RiverMap({ data, activeLayer }: RiverMapProps) {
  // Dhaka coordinates
  const center: [number, number] = [23.8103, 90.4125]
  const zoom = 11

  const shouldShow = (layer: string) => {
    return activeLayer === 'all' || activeLayer === layer
  }

  const riverStyle = {
    color: '#06d6a0',
    weight: 3,
    opacity: 0.8,
    fillColor: '#06d6a0',
    fillOpacity: 0.1
  }

  return (
    <div className="h-96 rounded-lg overflow-hidden border border-slate-700">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <MapController center={center} zoom={zoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Rivers GeoJSON */}
        {data.rivers && (
          <GeoJSON
            data={data.rivers}
            style={riverStyle}
          />
        )}

        {/* Pollution Markers */}
        {shouldShow('pollution') && data.pollution.map((point) => (
          <Marker
            key={point.id}
            position={[point.coordinates.lat, point.coordinates.lng]}
            icon={pollutionIcon}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Pollution Hotspot</p>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      point.severity === 'High' ? 'bg-red-500/20 text-red-600' :
                      point.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-600' :
                      'bg-green-500/20 text-green-600'
                    }`}>
                      {point.severity}
                    </span>
                  </div>
                </div>
                <p className="text-sm mb-1"><strong>Location:</strong> {point.location}</p>
                <p className="text-sm mb-1"><strong>NDTI:</strong> {point.ndti}</p>
                <p className="text-sm mb-1"><strong>Last Updated:</strong> {point.timestamp}</p>
                {point.probableSources && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold mb-1">Probable Sources:</p>
                    {point.probableSources.map((source: any, idx: number) => (
                      <p key={idx} className="text-xs">
                        • {source.name} ({source.probability}%)
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Factory Markers */}
        {shouldShow('factories') && data.factories.map((factory) => (
          <Marker
            key={factory.id}
            position={[factory.coordinates.lat, factory.coordinates.lng]}
            icon={factoryIcon}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Factory className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="font-semibold text-sm">Industrial Facility</p>
                </div>
                <p className="text-sm mb-1"><strong>Name:</strong> {factory.name}</p>
                <p className="text-sm mb-1"><strong>Type:</strong> {factory.type}</p>
                <p className="text-sm mb-1"><strong>Status:</strong> {factory.status}</p>
                {factory.etp && (
                  <p className="text-sm mb-1">
                    <strong>ETP:</strong>{' '}
                    <span className={factory.etp === 'Active' ? 'text-green-600' : 'text-red-600'}>
                      {factory.etp}
                    </span>
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Encroachment Markers */}
        {shouldShow('encroachment') && data.encroachment.map((zone) => (
          <Marker
            key={zone.id}
            position={[zone.coordinates.lat, zone.coordinates.lng]}
            icon={encroachmentIcon}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="font-semibold text-sm">Encroachment Zone</p>
                </div>
                <p className="text-sm mb-1"><strong>Location:</strong> {zone.location}</p>
                <p className="text-sm mb-1"><strong>Area:</strong> {zone.area}</p>
                <p className="text-sm mb-1"><strong>Detected:</strong> {zone.detected}</p>
                {zone.widthLoss && (
                  <p className="text-sm mb-1">
                    <strong>Width Loss:</strong> <span className="text-red-600">{zone.widthLoss}</span>
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
