"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  ChevronRight,
  Home,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { pageTitles } from "@/lib/constants";
import { useAuth } from "@/context/auth-context";

interface NavbarProps {
  portal: "admin" | "customer" | "technician";
  onMenuToggle: () => void;
}

export function Navbar({ portal, onMenuToggle }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const pageTitle = pageTitles[pathname] || "Dashboard";

  const phone = user?.phone || "";
  const maskedPhone = phone
    ? `+91 ${phone.slice(0, 5)}****`
    : "User";
  const initials = phone ? phone.slice(-2).toUpperCase() : "U";
  const avatarUrl = user?.id
    ? `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.id}`
    : "";

  return (
    <header
      className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Home className="size-3.5" />
          <ChevronRight className="size-3.5" />
          <span className="text-foreground font-medium">{pageTitle}</span>
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" onClick={onMenuToggle}>
            <Menu className="size-5" />
          </Button>

          <Button variant="ghost" size="icon-sm">
            <Search className="size-4" />
          </Button>

          <Button variant="ghost" size="icon-sm" className="relative">
            <Bell className="size-4" />
            <span className="absolute right-1 top-1 flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
          </Button>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full"
                />
              }
            >
              <Avatar size="sm">
                {avatarUrl && <AvatarImage src={avatarUrl} alt="Avatar" />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{maskedPhone}</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(`/${portal}/profile`)}>
                <User className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
