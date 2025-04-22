'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { ChevronRight, Check, XCircle } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import YearFilterSection from '@/components/sidebar/yearFilterSection'; // ⬅️ Импортирай тук твоя нов компонент

export function NavMain({ items }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getParamKey = (title) => {
    const map = {
      Genre: 'genre',
      'Minimum Rating': 'minRating',
      Actor: 'actor',
      Rated: 'certification',
      'Release Year': 'releaseYear',
      Language: 'language',
      'Sort By': 'sortBy',
    };
    return map[title] || '';
  };

  const isActive = (sectionTitle, itemUrl) => {
    const param = getParamKey(sectionTitle);
    const value = new URL(itemUrl, 'https://example.com').searchParams.get(param);
    return searchParams.get(param) === value;
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
        {items.map((section) => (
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
                {section.title === 'Release Year' ? (
                  <YearFilterSection /> // ⬅️ специален компонент за години
                ) : (
                  <SidebarMenuSub>
                    {section.items?.map((item) => {
                      const active = isActive(section.title, item.url);
                      const param = new URL(item.url, 'https://example.com')
                        .searchParams.entries()
                        .next().value;
                      const [key, value] = param || [];

                      const updatedSearchParams = new URLSearchParams(searchParams.toString());
                      if (active) {
                        updatedSearchParams.delete(key);
                      } else {
                        updatedSearchParams.set(key, value);
                      }

                      const newUrl = `${pathname}?${updatedSearchParams.toString()}`;

                      return (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <a
                              href={newUrl}
                              className={`flex justify-between items-center w-full px-2 py-1 rounded-md ${
                                active
                                  ? 'bg-blue-100 font-semibold dark:bg-blue-900'
                                  : ''
                              }`}
                            >
                              <span>{item.title}</span>
                              {active && (
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
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
