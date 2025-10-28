import { ModeToggle, SidebarTrigger } from '@apollo/ui';

export const Header = () => {
  return (
    <header className="p-4 justify-between items-center flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <SidebarTrigger className="-ml-1" />
      <div className="flex justify-end">
        <ModeToggle />
      </div>
    </header>
  );
};
