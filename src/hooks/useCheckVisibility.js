import { useEffect, useState } from 'react';

const useCheckVisibility = (containerImgs) => {
  const [isFullyVisible, setFullyVisible] = useState(true);
  const menuRef = containerImgs;

  useEffect(() => {
    const checkVisibility = () => {
      const menu = menuRef.current;

      if (menu) {
        setFullyVisible(menu.scrollWidth <= menu.clientWidth);
      }
    };

    window.addEventListener('resize', checkVisibility);
    checkVisibility();

    return () => {
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return { isFullyVisible };
};

export default useCheckVisibility;
