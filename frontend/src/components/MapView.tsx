import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

type Props = {
  lat: number
  lng: number
}

export default function MapView({ lat, lng }: Props) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    const map = L.map(containerRef.current).setView([lat, lng], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
    L.marker([lat, lng]).addTo(map)
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [lat, lng])

  return (
    <div
      ref={containerRef}
      style={{ height: 260, borderRadius: 8, marginBottom: 16, overflow: 'hidden' }}
    />
  )
}
