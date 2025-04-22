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

import YearFilterSection from "@/components/sidebar/yearFilterSection";

export function NavMain({ items }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getParamKey = (title) => {
    const map = {
      Genre: "genre",
      "Minimum Rating": "minRating",
      Rated: "certification",
      "Release Year": "releaseYear",
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
          const paramKey = getParamKey(section.title);

          return (
            <Collapsible
              key={section.title}
              asChild
              defaultOpen={section.isActive}
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
                  {section.title === "Release Year" ? (
                    <YearFilterSection />
                  ) : (
                    <SidebarMenuSub>
                      {section.items?.map((item) => {
                        const urlParams = new URL(item.url, "https://example.com").searchParams;
                        const value = urlParams.get(paramKey);

                        const currentParams = new URLSearchParams(searchParams.toString());

                        let currentValues = currentParams.get(paramKey)?.split(",") || [];

                        const isGenreMultiSelect = paramKey === "genre";

                        const isActive =
                          isGenreMultiSelect && currentValues.includes(value)
                            ? true
                            : currentParams.get(paramKey) === value;

                        if (isActive) {
                          // премахваме от активните
                          currentValues = currentValues.filter((v) => v !== value);
                        } else {
                          if (isGenreMultiSelect) {
                            currentValues.push(value);
                          } else {
                            currentValues = [value];
                          }
                        }

                        if (currentValues.length > 0) {
                          currentParams.set(paramKey, currentValues.join(","));
                        } else {
                          currentParams.delete(paramKey);
                        }

                        const newUrl = `${pathname}?${currentParams.toString()}`;

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
                  )}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
