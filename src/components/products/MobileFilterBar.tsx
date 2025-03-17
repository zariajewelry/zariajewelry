"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import SortSelector from "./SortSelector";

interface FloatingFilterBarProps {
  onToggleFilters: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  activeFiltersCount?: number;
}

export default function FloatingFilterBar({
  onToggleFilters,
  sortBy,
  onSortChange,
  activeFiltersCount = 0
}: FloatingFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isScrollingRef = useRef(false);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (window.scrollY <= 150) {
      setIsVisible(false);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        setIsVisible(false);
        setIsExpanded(false);
      }

      lastScrollY.current = currentScrollY;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;

        const distanceToBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
        const isNearBottom = distanceToBottom < 100; // 

        if (currentScrollY > 150 && !isNearBottom) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const selectorVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.9,
      transition: {
        duration: 0.15
      }
    }
  };

  const filterButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const sortButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="filter-bar"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-5 left-0 right-0 z-50 px-4 pointer-events-none"
        >
          <div className="flex flex-col items-center">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  key="sort-selector"
                  variants={selectorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white backdrop-blur-lg bg-opacity-95 rounded-xl shadow-lg p-3 mb-3 w-[90%] max-w-sm pointer-events-auto"
                >
                  <SortSelector
                    value={sortBy}
                    onChange={(val) => {
                      onSortChange(val);
                      setIsExpanded(false);
                    }}
                    showLabel={true}
                    compact={true}
                    className="w-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 pointer-events-auto">
              <motion.button
                variants={filterButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => onToggleFilters()}
                className="bg-gradient-to-b from-white/90 to-white/75 backdrop-blur-lg text-black h-12 w-12 rounded-full flex items-center justify-center shadow-xl shadow-gray-300/30 relative border border-white/30"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-black text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center"
                  >
                    {activeFiltersCount}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                variants={sortButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`bg-gradient-to-b from-white/90 to-white/75 backdrop-blur-lg text-black h-12 w-12 rounded-full flex items-center justify-center shadow-xl shadow-gray-300/30 border border-white/30 ${isExpanded ? "ring-1 ring-offset-1 ring-[#1ca2d6]" : ""
                  }`}
              >
                <ArrowUpDown className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}