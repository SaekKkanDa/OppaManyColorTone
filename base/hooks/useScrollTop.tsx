import { useEffect } from 'react';

function useScrollTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export default useScrollTop;
