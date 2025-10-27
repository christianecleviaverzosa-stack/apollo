import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SidebarTrigger,
} from '@apollo/ui';
import { Bell } from 'lucide-react';

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
    <header className="p-4 justify-between items-center flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <SidebarTrigger className="-ml-1" />
      <div className="flex justify-end">
        <NotificationPopover />
      </div>
    </header>
  );
};
