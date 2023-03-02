import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useCheckUserImage = (/** @type {string} */ userImg) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userImg) return;

    navigate('/no-image');
  }, [navigate, userImg]);
};

export default useCheckUserImage;
