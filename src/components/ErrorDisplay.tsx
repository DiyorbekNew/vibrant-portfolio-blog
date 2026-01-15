import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  showRetry?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = "Xatolik yuz berdi",
  message = "Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
  onRetry,
  className,
  showRetry = true,
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="default">
          Qayta Urinib Ko'rish
        </Button>
      )}
    </div>
  );
};

export default ErrorDisplay;

