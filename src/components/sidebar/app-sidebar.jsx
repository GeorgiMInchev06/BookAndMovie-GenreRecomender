"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  Star,
  MessageCircleWarning,
  LibraryBig,
  CalendarIcon,
  GlobeIcon,
  ArrowDownUp,
  SquareTerminal,
  BookOpen,
  User2,
  Building2,
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
import YearFilterSection from "./yearFilterSection";

// 🎬 Movie Filters
const movieFilters = [
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
    icon: CalendarIcon,
    component: <YearFilterSection />,
  },
  {
    title: "Language",
    icon: GlobeIcon,
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
    icon: ArrowDownUp,
    items: [
      { title: "Top Rated", url: "/home/movies?sortBy=vote_average.desc" },
      { title: "Most Popular", url: "/home/movies?sortBy=popularity.desc" },
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
];

// 📚 Book Filters (нови филтри добавени тук)
const bookFilters = [
  {
    title: "Subject / Genre",
    icon: SquareTerminal,
    items: [
      { title: "Fantasy", url: "/home/books?subject=Fantasy" },
      { title: "Romance", url: "/home/books?subject=Romance" },
      { title: "Mystery", url: "/home/books?subject=Mystery" },
      { title: "Thriller", url: "/home/books?subject=Thriller" },
      { title: "Historical", url: "/home/books?subject=Historical" },
      { title: "Science Fiction", url: "/home/books?subject=Science+Fiction" },
      { title: "Philosophy", url: "/home/books?subject=Philosophy" },
      { title: "Poetry", url: "/home/books?subject=Poetry" },
      { title: "Children", url: "/home/books?subject=Children" },
      { title: "Fiction", url: "/home/books?subject=Fiction" },
      { title: "Biography", url: "/home/books?subject=Biography" },
      { title: "Crime", url: "/home/books?subject=Crime" },
    ],
  },
  {
    title: "Language",
    icon: GlobeIcon,
    items: [
      { title: "English", url: "/home/books?language=eng" },
      { title: "French", url: "/home/books?language=fre" },
      { title: "German", url: "/home/books?language=ger" },
      { title: "Spanish", url: "/home/books?language=spa" },
      { title: "Bulgarian", url: "/home/books?language=bul" },
      { title: "Russian", url: "/home/books?language=rus" },
      { title: "Japanese", url: "/home/books?language=jpn" },
      { title: "Italian", url: "/home/books?language=ita" },
    ],
  },
  {
    title: "Author",
    icon: User2,
    items: [
      { title: "Stephen King", url: "/home/books?author=Stephen+King" },
      { title: "J.K. Rowling", url: "/home/books?author=J.K.+Rowling" },
      { title: "George Orwell", url: "/home/books?author=George+Orwell" },
      { title: "Agatha Christie", url: "/home/books?author=Agatha+Christie" },
      { title: "J.R.R. Tolkien", url: "/home/books?author=J.R.R.+Tolkien" },
      { title: "Paulo Coelho", url: "/home/books?author=Paulo+Coelho" },
      // { title: "Елин Пелин", url: "/home/books?author=Елин+Пелин" },
      // { title: "Йордан Йовков", url: "/home/books?author=Йордан+Йовков" },
      // { title: "Иван Вазов", url: "/home/books?author=Иван+Вазов" },
      // { title: "Алеко Константинов", url: "/home/books?author=Алеко+Константинов" },
    ],
  },
  {
    title: "Sort By",
    icon: ArrowDownUp,
    items: [
      { title: "Newest", url: "/home/books?sortBy=new" },
    ],
  },
];


export function AppSidebar(props) {
  const pathname = usePathname();

  const isMovies = pathname.startsWith("/home/movies");
  const isBooks = pathname.startsWith("/home/books");

  const navMain = isMovies ? movieFilters : isBooks ? bookFilters : [];

  const choices = [
    {
      name: "Movies",
      logo: Clapperboard,
      path: "/home/movies",
      plan: "Find the best movies for you",
    },
    {
      name: "Books",
      logo: LibraryBig,
      path: "/home/books",
      plan: "Find the best books for you",
    },
    {
      name: "Favorites",
      logo: Star,
      path: "/home/favorites",
      plan: "Saved",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Switcher choices={choices} />
      </SidebarHeader>

      <SidebarContent>
        <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading filters...</div>}>
          {pathname !== "/home/favorites" && <NavMain items={navMain} />}
        </Suspense>
      </SidebarContent>


      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
