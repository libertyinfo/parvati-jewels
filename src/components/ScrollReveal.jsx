import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Wraps children and triggers reveal animation when scrolled into view.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'flip-up'} [props.animation='fade-up']
 * @param {number} [props.delay=0] - Delay in ms before animation starts
 * @param {number} [props.duration=800] - Duration in ms for transition
 * @param {number} [props.threshold=0.15] - Viewport intersection ratio threshold
 * @param {boolean} [props.once=true] - Whether animation triggers only once
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {string} [props.as='div'] - HTML element type to render
 */
function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  threshold = 0.15,
  once = true,
  className = '',
  style = {},
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, once]);

  const animationClass = `reveal-${animation}`;
  const combinedClassName = `scroll-reveal ${animationClass} ${
    isVisible ? 'scroll-reveal-active' : ''
  } ${className}`.trim();

  const combinedStyle = {
    ...style,
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <Component
      ref={ref}
      className={combinedClassName}
      style={combinedStyle}
      {...props}
    >
      {children}
    </Component>
  );
}

export default ScrollReveal;
