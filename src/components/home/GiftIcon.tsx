import React from "react";

interface GiftBoxIconProps {
  className?: string;
}

const GiftBoxIcon: React.FC<GiftBoxIconProps> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 89 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`gift-box ${className}`}
      aria-hidden="true"
    >
      <g filter="url(#filter0_d_1_116)">
        <path
          d="M12.8786 17.6816C16.8906 23.6517 33.2733 24.3151 40.9631 23.9005H59.0174C62.0265 23.2095 68.5461 20.9983 70.5521 17.6816C73.0597 13.5356 64.534 5.24378 57.5129 4.82919C50.4917 4.41459 43.9721 19.7545 42.4676 21.8275C37.6299 15.5786 32.1086 10.0361 28.3937 6.6196C26.5821 4.95358 23.9776 4.46624 21.7518 5.51653C16.0773 8.19415 9.61702 12.8283 12.8786 17.6816Z"
          fill="currentColor"
          stroke="#604F3F"
          strokeWidth="2"
        />
        <rect
          x="1"
          y="23"
          width="78"
          height="63"
          rx="1"
          fill="currentColor"
          stroke="#604F3F"
          strokeWidth="2"
        />
        <path
          d="M12.2515 85.4812L9.07301 85.5199L78.4876 30.1818L78.4651 32.4903L12.2515 85.4812Z"
          fill="currentColor"
          stroke="#604F3F"
        />
        <rect
          x="41.5"
          y="23.5"
          width="2"
          height="62"
          fill="currentColor"
          stroke="#604F3F"
        />
        <rect
          x="41.4045"
          y="40.1227"
          width="2"
          height="39.8848"
          transform="rotate(90 41.4045 40.1227)"
          fill="currentColor"
          stroke="#604F3F"
        />
        <path
          d="M16 9.36463C21 11.4343 33.3 17.2589 42.5 24C44.5 24 64.5 6.26016 67 9.36463"
          stroke="#604F3F"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1_116"
          x="0"
          y="0.820862"
          width="89"
          height="91.1791"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="5" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_116"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_116"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default GiftBoxIcon;