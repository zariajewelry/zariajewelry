// src/components/navigation/CustomBreadcrumbs.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItemData {
  label: string;
  href?: string;
  active?: boolean;
}

interface CustomBreadcrumbsProps {
  items: BreadcrumbItemData[];
  className?: string;
}

export default function CustomBreadcrumbs({ items, className = "" }: CustomBreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="flex-shrink-0">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            
            <BreadcrumbItem>
              {item.active ? (
                <BreadcrumbPage className="text-xs md:text-sm tracking-wide text-gray-800 font-medium">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink 
                  asChild={!!item.href}
                  className="text-xs md:text-sm tracking-wide text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}