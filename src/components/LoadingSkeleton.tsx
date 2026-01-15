import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  );
};

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md">
      <Skeleton className="aspect-video w-full" />
      <div className="p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
};

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md">
      <Skeleton className="aspect-video w-full" />
      <div className="p-5">
        <div className="flex gap-4 mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="container py-12">
      <Skeleton className="h-10 w-64 mb-6" />
      <Skeleton className="h-6 w-96 mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export default Skeleton;

