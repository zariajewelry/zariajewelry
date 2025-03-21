"use client";

import React from "react";
import GiftBoxIcon from "./GiftIcon";

interface GiftBoxProps {
  className?: string;
}

const GiftBox: React.FC<GiftBoxProps> = ({ className = "" }) => {
  return (
    <div className={`inline-flex ${className}`}>
      <GiftBoxIcon />
    </div>
  );
};

export default GiftBox;