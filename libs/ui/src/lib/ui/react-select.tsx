import {
  components,
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  ControlProps,
} from 'react-select';
import { X, ChevronDown } from 'lucide-react';

export function ReactSelectClearIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: ClearIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.ClearIndicator {...props}>
      <X
        className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
        strokeWidth={2}
      />
    </components.ClearIndicator>
  );
}

export function ReactSelectDropdownIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  const isOpen = props.selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown
        className={`h-4 w-4 text-muted-foreground transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`}
        strokeWidth={2}
      />
    </components.DropdownIndicator>
  );
}

export function ReactSelectControl<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: ControlProps<Option, IsMulti, Group>) {
  const { children } = props;

  return (
    <components.Control
     
      className="!border !border-input"
       {...props}
    >
      <div className='flex w-full'>{children}</div>
    </components.Control>
  );
}
