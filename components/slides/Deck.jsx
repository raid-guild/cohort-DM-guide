'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

const isHr = (node) => node && typeof node.type === 'string' && node.type === 'hr';

const splitSlides = (children) => {
  const items = React.Children.toArray(children);
  const slides = [];
  let current = [];

  for (const item of items) {
    if (isHr(item)) {
      if (current.length > 0) {
        slides.push(current);
        current = [];
      }
      continue;
    }
    current.push(item);
  }

  if (current.length > 0) {
    slides.push(current);
  }

  return slides.length > 0 ? slides : [items];
};

export function Deck({ children, startIndex = 0 }) {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(startIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const slides = useMemo(() => splitSlides(children), [children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.focus();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const match = window.location.hash.match(/slide-(\d+)/);
    if (!match) return;
    const target = Number(match[1]) - 1;
    if (!Number.isNaN(target) && target >= 0 && target < slides.length) {
      setIndex(target);
    }
  }, [slides.length]);

  useEffect(() => {
    if (index < 0) {
      setIndex(0);
      return;
    }
    if (index > slides.length - 1) {
      setIndex(slides.length - 1);
      return;
    }
    const container = containerRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-slide="${index}"]`);
    if (target && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    if (typeof window !== 'undefined') {
      const nextHash = `slide-${index + 1}`;
      if (window.location.hash !== `#${nextHash}`) {
        window.history.replaceState(null, '', `#${nextHash}`);
      }
    }
  }, [index, slides.length]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        setIndex((prev) => Math.min(prev + 1, slides.length - 1));
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        setIndex((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setIndex(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        setIndex(slides.length - 1);
      }
      if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        const container = containerRef.current;
        if (!container) return;
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else if (container.requestFullscreen) {
          container.requestFullscreen();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [slides.length]);

  useEffect(() => {
    const onHashChange = () => {
      const match = window.location.hash.match(/slide-(\d+)/);
      if (!match) return;
      const target = Number(match[1]) - 1;
      if (!Number.isNaN(target) && target >= 0 && target < slides.length) {
        setIndex(target);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [slides.length]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <div className="rg-deck" ref={containerRef} tabIndex={0}>
      <button
        className="rg-deck__fullscreen"
        type="button"
        onClick={() => {
          const container = containerRef.current;
          if (!container) return;
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else if (container.requestFullscreen) {
            container.requestFullscreen();
          }
        }}
      >
        {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
      </button>
      {slides.map((slide, slideIndex) => (
        <section
          className="rg-slide"
          data-slide={slideIndex}
          id={`slide-${slideIndex + 1}`}
          key={`slide-${slideIndex}`}
        >
          {slide}
        </section>
      ))}
      <div className="rg-deck__progress">
        {index + 1} / {slides.length}
      </div>
    </div>
  );
}
