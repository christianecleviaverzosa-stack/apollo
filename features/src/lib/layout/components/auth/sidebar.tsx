export const Sidebar = () => {
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
