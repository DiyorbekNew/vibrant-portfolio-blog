import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "shimmer rounded-xl bg-muted/50",
        className
      )}
    />
  );
};

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-6">
        <Skeleton className="h-7 w-3/4 mb-3" />
        <Skeleton className="h-5 w-1/2 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
        <Skeleton className="h-5 w-28" />
      </div>
    </div>
  );
};

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-6">
        <div className="flex gap-4 mb-3">
          <Skeleton className="h-5 w-24 rounded-lg" />
          <Skeleton className="h-5 w-16 rounded-lg" />
          <Skeleton className="h-5 w-16 rounded-lg" />
        </div>
        <Skeleton className="h-7 w-full mb-3" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-4" />
        <Skeleton className="h-5 w-36 rounded-lg" />
      </div>
    </div>
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <Skeleton className="h-12 w-80 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      <div className="space-y-6 max-w-3xl mx-auto">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>
    </div>
  );
};

export default Skeleton;
