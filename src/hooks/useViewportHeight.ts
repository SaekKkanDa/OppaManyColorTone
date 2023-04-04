import { useEffect } from 'react';

function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

const useViewportHeight = () => {
  useEffect(() => {
    setViewportHeight();
  }, []);
};

export default useViewportHeight;
