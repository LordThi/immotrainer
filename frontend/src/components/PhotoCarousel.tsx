import { Carousel } from 'react-bootstrap'

type Props = {
  photos: string[]
  alt: string
  city: string
}

export default function PhotoCarousel({ photos, alt, city }: Props) {
  return (
    <div style={{ position: 'relative' }}>
      <Carousel interval={null} indicators={photos.length > 1} controls={photos.length > 1}>
        {photos.map((url, i) => (
          <Carousel.Item key={i}>
            <img
              src={url}
              alt={`${alt} — photo ${i + 1}`}
              style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <span
        style={{
          position: 'absolute', bottom: 12, left: 12, zIndex: 10,
          background: 'rgba(0,0,0,0.6)', color: 'white',
          fontSize: 13, fontWeight: 600,
          padding: '4px 12px', borderRadius: 20,
          backdropFilter: 'blur(4px)',
        }}
      >
        {city}
      </span>
      {photos.length > 1 && (
        <span
          style={{
            position: 'absolute', bottom: 12, right: 12, zIndex: 10,
            background: 'rgba(0,0,0,0.5)', color: 'white',
            fontSize: 12, padding: '3px 8px', borderRadius: 20,
          }}
        >
          {photos.length} photos
        </span>
      )}
    </div>
  )
}
