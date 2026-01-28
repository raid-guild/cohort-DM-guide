'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SlidesBodyToggle() {
  const pathname = usePathname();

  useEffect(() => {
    const isSlidesDeck = pathname && pathname.startsWith('/slides/');
    document.body.classList.toggle('rg-slides-mode', isSlidesDeck);
    return () => document.body.classList.remove('rg-slides-mode');
  }, [pathname]);

  return null;
}
