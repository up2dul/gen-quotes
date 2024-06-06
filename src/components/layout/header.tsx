import { AlignJustify } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { cn, getUserData } from '~/lib/utils';
import { Link } from '~/router';
import { useAuthStore } from '~/store';

export const Header = () => {
  const { pathname } = useLocation();
  const { logout } = useAuthStore();
  const userData = getUserData();

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-16 md:px-32 lg:px-56 xl:px-64">
      <nav className="gap-6 text-lg font-medium flex items-center">
        <Link
          to="/home"
          className={cn(
            'transition-colors hover:text-foreground',
            pathname === '/home' ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          Home
        </Link>
        <Link
          to="/settings"
          className={cn(
            'transition-colors hover:text-foreground',
            pathname === '/settings'
              ? 'text-foreground'
              : 'text-muted-foreground',
          )}
        >
          Settings
        </Link>
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <AlignJustify className="h-6 w-6 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>@{userData.username}</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
