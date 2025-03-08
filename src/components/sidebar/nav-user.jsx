"use client"

import {
  BadgeCheck,
  Save,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { SignedIn, SignOutButton, UserButton,  useUser,  } from '@clerk/nextjs';
import Image from "next/image"

export function NavUser({
}) {
  const { isMobile } = useSidebar()
  const { user } = useUser();

  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <SignedIn>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-7 w-7 rounded-lg">
              <SignedIn>
                    <UserButton/>
              </SignedIn>
              </Avatar>
              <div>
                <p className="truncate font-semibold">{user?.fullName}</p>
                <p className="truncate text-xs">{user?.emailAddresses[0]?.emailAddress}</p>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
            </SignedIn>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user?.imageUrl && (
                    <Image
                    src={user.imageUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                    )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <p className="truncate font-semibold">{user?.fullName}</p>
                  <p className="truncate text-xs">{user?.emailAddresses[0]?.emailAddress}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <SignOutButton/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
