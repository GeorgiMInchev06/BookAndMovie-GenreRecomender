"use client"

import * as React from "react"
import { ChevronsUpDown} from "lucide-react"
import { useRouter, usePathname } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function Switcher({
  choices
}) {
  const { isMobile } = useSidebar()
  const router = useRouter();
  const pathname = usePathname();

  // Determine the initial active choice based on the current route
  const initialChoice = React.useMemo(() => {
    return (
      choices.find((choice) => pathname === choice.path) || // Exact path match
      choices.find((choice) => pathname.startsWith(choice.path)) || // Nested route match
      choices[0] // Fallback to the first choice
    );
  }, [pathname, choices]);

  const [activeChoice, setActiveChoice] = React.useState(initialChoice);

  // Sync the active choice with the route
  React.useEffect(() => {
    setActiveChoice(initialChoice);
  }, [initialChoice]);

  const handleChoiceChange = (choice) => {
    setActiveChoice(choice);
    router.push(choice.path); // Navigate to the selected path
  };

  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeChoice.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeChoice.name}
                </span>
                <span className="truncate text-xs">{activeChoice.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Choose
            </DropdownMenuLabel>
            {choices.map((choice, index) => (
              <DropdownMenuItem 
                key={choice.name} 
                onClick={() => handleChoiceChange(choice)} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <choice.logo className="size-4 shrink-0" />
                </div>
                {choice.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
