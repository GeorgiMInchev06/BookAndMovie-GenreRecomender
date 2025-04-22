"use client";

import { Suspense } from "react";
import {
  Clapperboard,
  Star,
  MessageCircleWarning,
  LibraryBig,
  CalendarIcon,
  GlobeIcon,
  ArrowDownUp,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { Switcher } from "@/components/sidebar/switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Static filter config
const data = {
  choices: [
    {
      name: "Movies",
      logo: Clapperboard,
      plan: "Find the best movies for you",
      path: "/home/movies",
    },
    {
      name: "Books",
      logo: LibraryBig,
      plan: "Find the best books for you",
      path: "/home/books",
    },
    {
      name: "Favorites",
      path: "/home/favorites",
      logo: Star,
      plan: "Saved",
    },
  ],
  navMain: [
    {
      title: "Genre",
      icon: SquareTerminal,
      items: [
        { title: "Action", url: "/home/movies?genre=28" },
        { title: "Adventure", url: "/home/movies?genre=12" },
        { title: "Animation", url: "/home/movies?genre=16" },
        { title: "Comedy", url: "/home/movies?genre=35" },
        { title: "Crime", url: "/home/movies?genre=80" },
        { title: "Documentary", url: "/home/movies?genre=99" },
        { title: "Drama", url: "/home/movies?genre=18" },
        { title: "Family", url: "/home/movies?genre=10751" },
        { title: "Fantasy", url: "/home/movies?genre=14" },
        { title: "History", url: "/home/movies?genre=36" },
        { title: "Horror", url: "/home/movies?genre=27" },
        { title: "Music", url: "/home/movies?genre=10402" },
        { title: "Mystery", url: "/home/movies?genre=9648" },
        { title: "Romance", url: "/home/movies?genre=10749" },
        { title: "Sci-Fi", url: "/home/movies?genre=878" },
        { title: "TV Movie", url: "/home/movies?genre=10770" },
        { title: "Thriller", url: "/home/movies?genre=53" },
        { title: "War", url: "/home/movies?genre=10752" },
        { title: "Western", url: "/home/movies?genre=37" },
      ],
    },
    {
      title: "Minimum Rating",
      icon: Star,
      items: [
        { title: "9+", url: "/home/movies?minRating=9" },
        { title: "8+", url: "/home/movies?minRating=8" },
        { title: "7+", url: "/home/movies?minRating=7" },
        { title: "6+", url: "/home/movies?minRating=6" },
      ],
    },
    {
      title: "Release Year",
      icon: CalendarIcon, // Import from lucide-react
      items: [
        { title: "2024", url: "/home/movies?releaseYear=2024" },
        { title: "2023", url: "/home/movies?releaseYear=2023" },
        { title: "2022", url: "/home/movies?releaseYear=2022" },
        { title: "2021", url: "/home/movies?releaseYear=2021" },
        { title: "2020", url: "/home/movies?releaseYear=2020" },
      ],
    },
    {
      title: "Language",
      icon: GlobeIcon, // Import from lucide-react
      items: [
        { title: "English", url: "/home/movies?language=en" },
        { title: "Spanish", url: "/home/movies?language=es" },
        { title: "French", url: "/home/movies?language=fr" },
        { title: "German", url: "/home/movies?language=de" },
        { title: "Japanese", url: "/home/movies?language=ja" },
        { title: "Hindi", url: "/home/movies?language=hi" },
      ],
    },
    {
      title: "Sort By",
      icon: ArrowDownUp, // Import from lucide-react
      items: [
        { title: "Most Popular", url: "/home/movies?sortBy=popularity.desc" },
        { title: "Top Rated", url: "/home/movies?sortBy=vote_average.desc" },
      ],
    },
    {
      title: "Rated",
      icon: MessageCircleWarning,
      items: [
        { title: "All Ages (G)", url: "/home/movies?certification=G" },
        { title: "Parental Guidance (PG)", url: "/home/movies?certification=PG" },
        { title: "Teens (PG-13)", url: "/home/movies?certification=PG-13" },
        { title: "Mature (R)", url: "/home/movies?certification=R" },
      ],
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Switcher choices={data.choices} />
      </SidebarHeader>
      <SidebarContent>
        {/* ✅ Suspense boundary for client-side hooks */}
        <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading filters...</div>}>
          <NavMain items={data.navMain} />
        </Suspense>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
