"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { ChevronRight, Check, XCircle } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getParamKey = (title) => {
    const map = {
      Genre: "genre",
      "Minimum Rating": "minRating",
      Rated: "certification",
      "Release Year": "releaseYear",
      Subject: "subject",
      "Subject / Genre": "subject",
      Author: "author",
      Publisher: "publisher",
      Language: "language",
      "Sort By": "sortBy",
    };
    return map[title] || "";
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex justify-between items-center">
        Filters
        <Link
          href={pathname}
          className="text-sm text-red-600 hover:underline flex items-center gap-1"
        >
          <XCircle className="w-4 h-4" />
          Clear All
        </Link>
      </SidebarGroupLabel>

      <SidebarMenu>
        {items.map((section) => {
          // 📦 Поддръжка за компоненти като <YearFilterSection />
          if (section.component) {
            return (
              <Collapsible
                key={section.title}
                asChild
                defaultOpen
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={section.title}>
                      {section.icon && <section.icon />}
                      <span>{section.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-3 py-2">{section.component}</div>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          const paramKey = getParamKey(section.title);
          const currentParams = new URLSearchParams(searchParams.toString());
          const currentValues = currentParams.get(paramKey)?.split(",") || [];

          const sectionIsActive = section.items?.some((item) => {
            const value = new URL(item.url, "https://example.com").searchParams.get(paramKey);
            return currentValues.includes(value);
          });

          return (
            <Collapsible
              key={section.title}
              asChild
              defaultOpen={sectionIsActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={section.title}>
                    {section.icon && <section.icon />}
                    <span>{section.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {section.items?.map((item) => {
                      const urlParams = new URL(item.url, "https://example.com").searchParams;
                      const value = urlParams.get(paramKey);

                      let newValues = [...currentValues];
                      const isMulti = paramKey === "genre" || paramKey === "subject";

                      const isActive = newValues.includes(value);

                      if (isActive) {
                        newValues = newValues.filter((v) => v !== value);
                      } else {
                        if (isMulti) {
                          newValues.push(value);
                        } else {
                          newValues = [value];
                        }
                      }

                      const updatedParams = new URLSearchParams(currentParams.toString());
                      if (newValues.length > 0) {
                        updatedParams.set(paramKey, newValues.join(","));
                      } else {
                        updatedParams.delete(paramKey);
                      }

                      const newUrl = `${pathname}?${updatedParams.toString()}`;

                      return (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <a
                              href={newUrl}
                              className={`flex justify-between items-center w-full px-2 py-1 rounded-md ${
                                isActive
                                  ? "bg-blue-100 font-semibold dark:bg-blue-900"
                                  : ""
                              }`}
                            >
                              <span>{item.title}</span>
                              {isActive && (
                                <Check className="w-4 h-4 text-green-500 transition-opacity duration-200 opacity-100" />
                              )}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
