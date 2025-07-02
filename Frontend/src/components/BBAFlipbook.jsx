import React from 'react'

function BBAFlipbook() {
    return (
         <div className='mt-14'>
        <div style={{
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
        }}>
        <iframe
        title="BBA Prospectus 24-25"
        src="https://www.cimdr.ac.in/BBA%20Prospectus%2024-25.pdf"
        style={{
            width: '100%',
            height: '100%',
            border: 'none',
        }}
        allowFullScreen
        />
        </div>
        </div>
    )
}

export default BBAFlipbook;