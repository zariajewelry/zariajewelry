import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadingButtonVariants = cva(
  "relative",
  {
    variants: {
      spinnerSize: {
        sm: "",
        default: "",
        lg: "",
      },
    },
    defaultVariants: {
      spinnerSize: "default",
    },
  }
);

export interface LoadingButtonProps extends ButtonProps, VariantProps<typeof loadingButtonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  spinnerPosition?: "left" | "right" | "center-only";
  spinnerClassName?: string;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ 
    children, 
    isLoading = false, 
    loadingText,
    spinnerPosition = "left",
    spinnerSize = "default",
    spinnerClassName = "loading-dots",
    className, 
    disabled, 
    ...props 
  }, ref) => {
    const getSpinnerSize = () => {
      switch (spinnerSize) {
        case "sm": return "loading-xs";
        case "lg": return "loading-md";
        default: return "loading-sm";
      }
    };
    
    const renderContent = () => {
      if (!isLoading) return children;
      
      // Si no hay texto de carga o estamos en modo center-only, mostrar solo el spinner
      if (!loadingText || spinnerPosition === "center-only") {
        return <span className={`loading ${spinnerClassName} ${getSpinnerSize()}`}></span>;
      }
      
      // Si tenemos texto de carga, mostrar spinner + texto
      const spinner = <span className={`loading ${spinnerClassName} ${getSpinnerSize()}`}></span>;
      
      return (
        <div className="flex items-center justify-center space-x-2">
          {spinnerPosition === "left" && spinner}
          <span>{loadingText}</span>
          {spinnerPosition === "right" && spinner}
        </div>
      );
    };
    
    return (
      <Button
        ref={ref}
        className={className}
        disabled={isLoading || disabled}
        {...props}
      >
        {renderContent()}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };