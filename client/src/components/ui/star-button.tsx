import React from 'react';
import { Link } from 'wouter';
import styled from 'styled-components';

interface StarButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  target?: string;
  rel?: string;
  external?: boolean;
}

// Styled components
const StyledWrapper = styled.span`
  display: inline-block;
  line-height: normal;
  border: none;
  
  button, a {
    position: relative;
    padding: 12px 35px;
    font-size: 17px;
    font-weight: 500;
    color: white;
    background-image: linear-gradient(90deg, #00A0B0, #4D4DFF);
    background-origin: border-box;
    border: 3px solid transparent;
    border-radius: 20px;
    box-shadow: 0px 0px 0px 1px transparent, 0 0 0 rgba(0, 160, 176, 0.3);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    outline: none !important;
  }
  
  /* Style support for inverted buttons - applied through className props */
  &.\!bg-transparent button, &.\!bg-transparent a {
    background-image: none;
    background-color: transparent;
  }
  
  &.\!text-\[\#00A0B0\] button, &.\!text-\[\#00A0B0\] a {
    color: #00A0B0;
  }
  
  &.\!border button, &.\!border a,
  &.\!border-2 button, &.\!border-2 a {
    border: 2px solid currentColor;
  }
  
  &.\!border-\[\#00A0B0\] button, &.\!border-\[\#00A0B0\] a {
    border-color: #00A0B0;
  }
  
  a:focus, a:active, button:focus, button:active {
    outline: none !important;
    box-shadow: none !important;
  }
  
  &::before, &::after {
    content: none !important;
  }

  .star-1, .star-2, .star-3, .star-4, .star-5, .star-6, .star-7, .star-8 {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    filter: drop-shadow(0 0 0 #ffffff);
    z-index: -5;
    transform: translateZ(0);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    will-change: transform, filter, opacity;
  }

  .star-1 {
    top: 20%;
    left: 20%;
    width: 25px;
    height: auto;
    transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }

  .star-2 {
    top: 45%;
    left: 45%;
    width: 15px;
    height: auto;
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-3 {
    top: 40%;
    left: 40%;
    width: 5px;
    height: auto;
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-4 {
    top: 20%;
    left: 40%;
    width: 8px;
    height: auto;
    transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-5 {
    top: 25%;
    left: 45%;
    width: 15px;
    height: auto;
    transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-6 {
    top: 5%;
    left: 50%;
    width: 5px;
    height: auto;
    transition: all 0.8s ease;
  }
  
  .star-7 {
    top: 60%;
    left: 35%;
    width: 12px;
    height: auto;
    transition: all 0.9s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }
  
  .star-8 {
    top: 50%;
    left: 65%;
    width: 8px;
    height: auto;
    transition: all 0.7s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }

  button:hover, a:hover {
    background-image: none;
    background-color: transparent;
    color: #00A0B0;
    box-shadow: 0 0 25px rgba(0, 160, 176, 0.5);
  }
  
  /* Special hover effect for buttons that are already transparent */
  &.\!bg-transparent button:hover, &.\!bg-transparent a:hover {
    background-color: rgba(0, 160, 176, 0.1);
    color: white;
  }

  button:hover .star-1, a:hover .star-1,
  button:hover .star-2, a:hover .star-2,
  button:hover .star-3, a:hover .star-3,
  button:hover .star-4, a:hover .star-4,
  button:hover .star-5, a:hover .star-5,
  button:hover .star-6, a:hover .star-6,
  button:hover .star-7, a:hover .star-7,
  button:hover .star-8, a:hover .star-8 {
    opacity: 1;
    visibility: visible;
    z-index: 2;
    transform: translate3d(0, 0, 20px);
  }

  button:hover .star-1, a:hover .star-1 {
    top: -40%;
    left: -15%;
    width: 25px;
    height: auto;
    filter: drop-shadow(0 0 10px #00A0B0);
    transform: translate3d(-5px, -5px, 30px) rotate(-15deg);
  }

  button:hover .star-2, a:hover .star-2 {
    top: -20%;
    left: 15%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 10px #00A0B0);
    transform: translate3d(0, -10px, 25px) rotate(5deg);
  }

  button:hover .star-3, a:hover .star-3 {
    top: 45%;
    left: 20%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 10px #4D4DFF);
    transform: translate3d(-5px, 5px, 20px) rotate(10deg);
  }

  button:hover .star-4, a:hover .star-4 {
    top: 25%;
    left: 70%;
    width: 8px;
    height: auto;
    filter: drop-shadow(0 0 10px #4D4DFF);
    transform: translate3d(5px, 0, 25px) rotate(-5deg);
  }

  button:hover .star-5, a:hover .star-5 {
    top: 20%;
    left: 90%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 10px #00A0B0);
    transform: translate3d(10px, -5px, 28px) rotate(10deg);
  }

  button:hover .star-6, a:hover .star-6 {
    top: 5%;
    left: 50%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 10px #4D4DFF);
    transform: translate3d(3px, -8px, 15px) rotate(20deg);
  }
  
  button:hover .star-7, a:hover .star-7 {
    top: 120%;
    left: 20%;
    width: 12px;
    height: auto;
    filter: drop-shadow(0 0 10px #00A0B0);
    transform: translate3d(-6px, 8px, 22px) rotate(-15deg);
  }
  
  button:hover .star-8, a:hover .star-8 {
    top: 100%;
    left: 80%;
    width: 8px;
    height: auto;
    filter: drop-shadow(0 0 10px #4D4DFF);
    transform: translate3d(8px, 12px, 18px) rotate(25deg);
  }

  .fil0 {
    fill: #ffffff;
  }

  /* Size variants */
  .size-sm {
    font-size: 14px;
    padding: 8px 20px;
  }
  
  .size-md {
    font-size: 16px;
    padding: 12px 30px;
  }
  
  .size-lg {
    font-size: 18px;
    padding: 14px 40px;
  }
`;

// Function to check if URL is external
const isExternalURL = (url: string): boolean => {
  if (!url) return false;
  return url.startsWith('http') || url.startsWith('https') || url.startsWith('//') || url.includes('://');
};

const StarButton = ({
  children,
  href,
  onClick,
  className = '',
  type = 'button',
  size = 'md',
  variant = 'default',
  target,
  rel,
  external = false
}: StarButtonProps) => {
  // Add outline variant class
  const variantClass = variant === 'outline' 
    ? '!bg-transparent !text-[#00A0B0] !border !border-[#00A0B0]' 
    : '';
  // SVG for star shape
  const StarSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" 
      style={{shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', fillRule: 'evenodd', clipRule: 'evenodd'}} 
      viewBox="0 0 784.11 815.53" 
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer" />
        <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
      </g>
    </svg>
  );

  // Button content with stars
  const buttonContent = (
    <>
      {children}
      <div className="star-1"><StarSVG /></div>
      <div className="star-2"><StarSVG /></div>
      <div className="star-3"><StarSVG /></div>
      <div className="star-4"><StarSVG /></div>
      <div className="star-5"><StarSVG /></div>
      <div className="star-6"><StarSVG /></div>
      <div className="star-7"><StarSVG /></div>
      <div className="star-8"><StarSVG /></div>
    </>
  );

  // Check if it's an external URL
  const isExternal = external || (href ? isExternalURL(href) : false);

  // For external links
  if (href && isExternal) {
    return (
      <StyledWrapper className={`${className} ${variantClass}`}>
        <a 
          href={href} 
          className={`size-${size}`} 
          target={target || "_blank"} 
          rel={rel || "noopener noreferrer"}
          onClick={onClick}
        >
          {buttonContent}
        </a>
      </StyledWrapper>
    );
  }

  // For internal links
  if (href) {
    return (
      <StyledWrapper className={`${className} ${variantClass}`}>
        <Link href={href} className={`size-${size}`}>
          {buttonContent}
        </Link>
      </StyledWrapper>
    );
  }

  // For buttons
  return (
    <StyledWrapper className={`${className} ${variantClass}`}>
      <button type={type} onClick={onClick} className={`size-${size}`}>
        {buttonContent}
      </button>
    </StyledWrapper>
  );
};

export default StarButton;