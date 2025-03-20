"use client";

import React from "react";
import GiftBoxIcon from "./GiftIcon";


interface GiftBoxProps {
  className?: string;
}

const GiftBox: React.FC<GiftBoxProps> = ({ className = "" }) => {
  return (
    <section className={`flex justify-center items-center p-5 ${className}`}>
      <figure>
        <GiftBoxIcon />
      </figure>
    </section>
  );
};

export default GiftBox;
