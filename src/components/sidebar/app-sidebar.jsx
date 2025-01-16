"use client"

import * as React from "react"
import {
  Clapperboard,
  BookOpen,
  MessageCircleWarning,
  LibraryBig,
  Frame,
  UserRound,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/sidebar/nav-user"
import { Switcher } from "@/components/sidebar/switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Stanimir Stoilov",
    email: "st.stoilov1312@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  choices: [
    {
      name: "Movies",
      logo: Clapperboard,
      plan: "Find the best movies for you",
      path: "movies"
    },
    {
      name: "Books",
      logo: LibraryBig,
      plan: "Find the best books for you",
      path: "books"
    },
  ],
  navMain: [
    {
      title: "Genre",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Action",
          url: "#",
        },
        {
          title: "Comedy",
          url: "#",
        },
        {
          title: "Crime",
          url: "#",
        },
        {
          title: "Drama",
          url: "#",
        },
        {
          title: "Others...",
          url: "#",
        },
      ],
    },
    {
      title: "Ratings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "1-3",
          url: "#",
        },
        {
          title: "4-6",
          url: "#",
        },
        {
          title: "7-9",
          url: "#",
        },
      ],
    },
    {
      title: "Actors",
      url: "#",
      icon: UserRound,
      items: [
        {
          title: "Will Smith",
          url: "#",
        },
        {
          title: "Robert De Niro",
          url: "#",
        },
        {
          title: "Leonardo DiCaprio",
          url: "#",
        },
        {
          title: "Johnny Depp",
          url: "#",
        },
        {
          title: "Others...",
          url: "#",
        },
      ],
    },
    {
      title: "Rated",
      url: "#",
      icon: MessageCircleWarning,
      items: [
        {
          title: "PEGI 3",
          url: "#",
        },
        {
          title: "PEGI 7",
          url: "#",
        },
        {
          title: "PEGI 12",
          url: "#",
        },
        {
          title: "PEGI 16",
          url: "#",
        },
        {
          title: "PEGI 18",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Switcher choices={data.choices} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
