import React from 'react';

function MBAFlipbook() {
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
    title="MBA Prospectus 24-25"
    src="https://heyzine.com/flip-book/e3d162af38.html"
    style={{
        width: '100%',
        height: '100%',
        border: 'none',
    }}
    allowFullScreen
    />
    </div>
    </div>
);
}

export default MBAFlipbook;