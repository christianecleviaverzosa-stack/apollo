import {
  selectIsSheetOpen,
  setCurrentSheet,
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@apollo/ui';
import {} from '@apollo/ui';

const SidebarSheet = () => {
  const isOpen = selectIsSheetOpen('sidebar');
  const handleOpenChange = (state?: boolean) => {
    if (!state) {
      setCurrentSheet({ open: false });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetClose />
        <SheetHeader>
          <SheetTitle>title</SheetTitle>
        </SheetHeader>
        [content]
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
