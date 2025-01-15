"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function AppBreadcrumb() {
  const path = usePathname();

  // Split the path into segments and filter out empty strings
  const pathSegments = path.split("/").filter((segment) => segment);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home Link */}
        <BreadcrumbItem key="home">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          // Construct the breadcrumb link's full path
          const href = "/" + pathSegments.slice(0, index + 1).join("/");

          return (
            <div key={index} className="flex items-center gap-3">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={href}>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
