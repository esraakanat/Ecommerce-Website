// src/components/ProductGallery.jsx
import { useState } from "react";

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images?.[0]);

  if (!images || images.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {/* الصور المصغرة (thumbnails) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxHeight: 300,
          overflowY: "auto",
        }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => setMainImage(img)}
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              border:
                mainImage === img ? "2px solid #007bff" : "1px solid #ddd",
              borderRadius: 6,
              cursor: "pointer",
              boxShadow:
                mainImage === img ? "0 0 6px rgba(0,0,0,0.3)" : "none",
            }}
          />
        ))}
      </div>

      {/* الصورة الرئيسية */}
      <img
        src={mainImage}
        alt="Main"
        style={{
          width: 300,
          height: 300,
          objectFit: "cover",
          borderRadius: 8,
          border: "1px solid #ddd",
        }}
      />
    </div>
  );
}
