import React from "react";
import { Progress } from "@/components/ui/progress";

function Loading() {
  return <div className="min-h-[100%] min-w-[100%] justify-center items-center">
    <Progress value={33} />
  </div>;
}

export default Loading;
