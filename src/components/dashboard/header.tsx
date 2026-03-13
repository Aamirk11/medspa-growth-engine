"use client";

import { useRouter } from "next/navigation";
import { Bell, Star, DollarSign, Calendar, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HeaderProps {
  title?: string;
}

const notifications = [
  {
    icon: UserCheck,
    text: "Overdue rebooking: Jessica M. is 14 days past her Botox appointment",
    time: "2 hours ago",
  },
  {
    icon: Star,
    text: "New 5-star review from Amanda K. on Google Business",
    time: "4 hours ago",
  },
  {
    icon: DollarSign,
    text: "Revenue milestone reached: $52K this month!",
    time: "1 day ago",
  },
  {
    icon: Calendar,
    text: "Schedule update: 3 new appointments booked for tomorrow",
    time: "1 day ago",
  },
];

export function Header({ title }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-card px-6">
      {title && (
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      )}

      <div className="flex-1" />

      <ThemeToggle />

      <Popover>
        <PopoverTrigger className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          <span className="sr-only">Notifications</span>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <div className="border-b px-4 py-3">
            <h3 className="text-sm font-semibold">Notifications</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification, i) => {
              const Icon = notification.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 border-b px-4 py-3 last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">{notification.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger className="relative h-9 w-9 rounded-full cursor-pointer focus:outline-none">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              SC
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">Dr. Sarah Chen</p>
            <p className="text-xs text-muted-foreground">
              sarah@glowaesthetics.com
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              toast.success("Signed out successfully");
              router.push("/");
            }}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
