import { useEffect, useState } from 'react';
import Lanyard from './reactbits/Lanyard/Lanyard.jsx';
import CanvasGuard from './graphics/CanvasGuard.jsx';

const ORIGINAL_STRAP = '/images/react-bits/lanyard.png';
let lightStrapPromise;

// Theme only the supplied texture. The official Lanyard geometry, lighting,
// material, simulation, pointer interaction and source file are untouched.
function whiteStrapTexture() {
  if (!lightStrapPromise) {
    lightStrapPromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const context = canvas.getContext('2d');
          if (!context) throw new Error('Could not prepare the lanyard theme.');
          context.filter = 'invert(1)';
          context.drawImage(image, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } catch (error) { reject(error); }
      };
      image.onerror = () => reject(new Error('Could not load the original lanyard texture.'));
      image.src = ORIGINAL_STRAP;
    });
  }
  return lightStrapPromise;
}

export default function ThemedLanyard({ theme, fallback = null, onUnavailable, ...props }) {
  const [whiteStrap, setWhiteStrap] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let active = true;
    whiteStrapTexture().then(texture => { if (active) setWhiteStrap(texture); })
      .catch(reason => { if (active) setError(reason); });
    return () => { active = false; };
  }, []);
  if (error) throw error;
  if (!whiteStrap) return fallback;
  // Start the availability observer only when the themed texture is ready;
  // otherwise a slow image load could be mistaken for a WebGL failure.
  return <CanvasGuard fallback={fallback} onUnavailable={onUnavailable}><Lanyard {...props} strapImage={theme === 'dark' ? whiteStrap : ORIGINAL_STRAP} strapColor={theme === 'dark' ? '#ffffff' : '#111111'}/></CanvasGuard>;
}
