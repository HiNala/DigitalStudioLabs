import React, { CSSProperties } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

interface StarButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg';
}

const StarButton = ({
  children,
  href,
  onClick,
  className,
  type = 'button',
  size = 'md'
}: StarButtonProps) => {
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  // Define SVG styles with proper types
  const svgStyle: CSSProperties = {
    shapeRendering: 'geometricPrecision',
    textRendering: 'geometricPrecision',
    fillRule: 'evenodd',
    clipRule: 'evenodd'
  };

  const buttonContent = (
    <>
      {children}
      <div className="star-1">
        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
          </g>
        </svg>
      </div>
      <div className="star-2">
        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
          </g>
        </svg>
      </div>
      <div className="star-3">
        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
          </g>
        </svg>
      </div>
      <div className="star-4">
        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
          </g>
        </svg>
      </div>
      <div className="star-5">
        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
          </g>
        </svg>
      </div>
      <div className="star-6">
        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
          </g>
        </svg>
      </div>
    </>
  );

  // If href is provided, render as a Link
  if (href) {
    return (
      <Link 
        href={href}
        className={cn(
          "star-button relative font-medium rounded-lg inline-block",
          sizeClasses[size],
          className
        )}
      >
        {buttonContent}
      </Link>
    );
  }

  // Otherwise, render as a button
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "star-button relative font-medium rounded-lg",
        sizeClasses[size],
        className
      )}
    >
      {buttonContent}
    </button>
  );
};

export default StarButton;