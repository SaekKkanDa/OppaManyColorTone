import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirectNoImage = (userImg: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userImg) return;

    navigate('/no-image');
  }, [navigate, userImg]);
};

export default useRedirectNoImage;
