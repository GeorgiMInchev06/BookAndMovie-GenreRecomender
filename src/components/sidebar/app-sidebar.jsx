"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  Clapperboard,
  Star,
  MessageCircleWarning,
  LibraryBig,
  UserRound,
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

// 🔍 Map section titles to query param keys
function getParamKey(title) {
  const map = {
    Genre: "genre",
    "Minimum Rating": "minRating",
    Actor: "actor",
    Rated: "certification",
  };
  return map[title] || "genre";
}

const data = {
  choices: [
    { name: "Movies", logo: Clapperboard, plan: "Find the best movies for you", path: "/home/movies" },
    { name: "Books", logo: LibraryBig, plan: "Find the best books for you", path: "/home/books" },
    { name: "Favorites", logo: Star, path: "/home/favorites", plan: "Saved" },
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
      title: "Actor",
      icon: UserRound,
      items: [
        { title: "Leonardo DiCaprio", url: "/home/movies?actor=Leonardo+DiCaprio" },
        { title: "Robert De Niro", url: "/home/movies?actor=Robert+De+Niro" },
        { title: "Scarlett Johansson", url: "/home/movies?actor=Scarlett+Johansson" },
        { title: "Tom Hanks", url: "/home/movies?actor=Tom+Hanks" },
        { title: "Ryan Gosling", url: "/home/movies?actor=Ryan+Gosling" },
        { title: "Emma Stone", url: "/home/movies?actor=Emma+Stone" },
        { title: "Denzel Washington", url: "/home/movies?actor=Denzel+Washington" },
        { title: "Brad Pitt", url: "/home/movies?actor=Brad+Pitt" },
        { title: "Johnny Depp", url: "/home/movies?actor=Johnny+Depp" },
        { title: "Jennifer Lawrence", url: "/home/movies?actor=Jennifer+Lawrence" },
        { title: "Christian Bale", url: "/home/movies?actor=Christian+Bale" },
        { title: "Natalie Portman", url: "/home/movies?actor=Natalie+Portman" },
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
  const searchParams = useSearchParams();

  const isActive = (sectionTitle, itemUrl) => {
    const param = getParamKey(sectionTitle);
    const urlValue = new URL(itemUrl, "https://example.com").searchParams.get(param);
    return searchParams.get(param) === urlValue;
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Switcher choices={data.choices} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} isActive={isActive} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
