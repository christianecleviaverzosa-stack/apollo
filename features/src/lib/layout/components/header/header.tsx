import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SidebarTrigger,
} from '@apollo/ui';
import { User, Bell } from 'lucide-react';

const MyAccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          My Account
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>My Profile</DropdownMenuItem>
          <DropdownMenuItem>Security</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Terms & Conditions</DropdownMenuItem>
          <DropdownMenuItem>About Megaton</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NotificationPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <span className="hidden md:block">Notifications</span>
          <div className="relative">
            <Bell />
            <div className="absolute h-2 w-2 top-0 right-0.5 bg-destructive rounded-full" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 max-h-52 p-0 overflow-y-scroll"
        align="end"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-wrap border-b last:border-0 p-3 items-center gap-1"
          >
            <p className="text-xs flex-1 font-semibold space-y-1">
              New Lead Arrived!
            </p>
            <p className="text-xs">{index} min ago</p>
            <p className="text-xs w-full">
              You've received a lead from archangel1998@gmail.com
            </p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export const Header = () => {
  return (
    <header
      data-testid="header"
      className="flex md:justify-end items-center p-4 space-x-1 border-b"
    >
      {/** Mobile Sidebar Burger Menu */}
      <div className="flex gap-2 items-center md:hidden flex-1">
        <SidebarTrigger />
        <h1 className="font-semibold text-lg">Megaton</h1>
      </div>
      {/** Desktop: User Greeting */}
      <h2 className="hidden md:block flex-1">Hi Christian, Welcome back!</h2>
      <NotificationPopover />
      <MyAccountDropdown />
    </header>
  );
};
