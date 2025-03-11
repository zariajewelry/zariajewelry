import { FC } from "react";
import AnimatedSection from "@/components/customs/animated/Animated-section";

interface CopyrightProps {
  className?: string;
  animate?: boolean;
  delay?: number;
}

const Copyright: FC<CopyrightProps> = ({
  className = "",
  animate = true,
  delay = 0.7
}) => {
  const currentYear = new Date().getFullYear();
  const content = (
    <p className="text-xs text-gray-500">
      © {currentYear} ZARIA Jewelry. All rights reserved.
    </p>
  );

  return (
    <div className={`flex justify-center ${className}`}>
      {animate ? (
        <AnimatedSection animation="fadeSlideUp" delay={delay}>
          {content}
        </AnimatedSection>
      ) : (
        content
      )}
    </div>
  );
};

export default Copyright;