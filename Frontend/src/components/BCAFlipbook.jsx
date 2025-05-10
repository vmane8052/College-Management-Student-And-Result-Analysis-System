import React from 'react'

function BCAFlipbook() {
  return (
    <div style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
    }}>
    <iframe
    title="BCA Prospectus 24-25"
    src="https://www.cimdr.ac.in/BCA%20Prospectus%2024-25.pdf"
    style={{
        width: '100%',
        height: '100%',
        border: 'none',
    }}
    allowFullScreen
    />
    </div>
  )
}

export default BCAFlipbook;