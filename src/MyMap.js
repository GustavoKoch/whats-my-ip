import React from "react"
import { Map, Marker } from "pigeon-maps"
import './MyMap.css';

export default function MyMap({lat, lng}) {
  return (
    <Map height={800} defaultCenter={[lat-0.5, lng]} defaultZoom={9}>
      <Marker width={50} anchor={[lat, lng]} />
    </Map>
  )
}