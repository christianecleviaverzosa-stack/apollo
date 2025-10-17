import { Outlet } from 'react-router-dom';
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
} from '@apollo/ui';
import { User, Bell, Menu } from 'lucide-react';

const NotificationPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
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

const MyAccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
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

const Sidebar = () => {
  return (
    <aside
      data-testid="sidebar"
      className="w-64 bg-primary hidden md:block p-6"
    >
      <div className="flex flex-col items-center justify-between h-full">
        {/** Brand Logo */}
        <div className="bg-gray-200 h-24 w-28" />
        {/** System Datetime */}
        <div className="flex flex-col items-center space-y-1">
          <p className="text-primary-foreground text-sm">
            Friday, October 17, 2025
          </p>
          <p className="text-primary-foreground text-xs">12:30 PM</p>
        </div>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header
      data-testid="header"
      className="flex md:justify-end items-center bg-primary p-4 space-x-1"
    >
      {/** Mobile Sidebar Burger Menu */}
      <div className="md:hidden flex-1">
        <Button>
          <Menu />
        </Button>
      </div>
      {/** Desktop: User Greeting */}
      <h1 className="hidden md:block flex-1 text-primary-foreground">
        Hi Christian, Welcome back!
      </h1>
      <NotificationPopover />
      <MyAccountDropdown />
    </header>
  );
};

export const AuthLayout = () => {
  return (
    <div
      data-testid="auth-layout-container"
      className="flex min-h-screen max-h-screen overflow-hidden"
    >
      {/* Sidebar */}
      <Sidebar />
      {/** Header & Scrollable Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
