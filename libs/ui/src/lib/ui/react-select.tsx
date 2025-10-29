import {
  components,
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  ControlProps,
  ThemeConfig,
  StylesConfig,
} from "react-select";
import ReactSelect, { Props } from "react-select";
import { X, ChevronDown } from "lucide-react";

/* -------------------- THEME -------------------- */
const reactSelectTheme: ThemeConfig = (theme) => ({
  ...theme,
  borderRadius: 6,
  colors: {
    ...theme.colors,
    primary: "hsl(var(--primary))",
    primary75: "hsl(var(--primary))",
    primary50: "hsl(var(--primary))",
    primary25: "hsl(var(--muted))",
  },
});

/* -------------------- STYLES (typed factory) -------------------- */
const createReactSelectStyles = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(): StylesConfig<Option, IsMulti, Group> => ({
  control: (base) => ({
    ...base,
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--input))",
    boxShadow: "none",
    minHeight: "2.25rem",
    "&:hover": {
      borderColor: "hsl(var(--foreground))",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "hsl(var(--muted-foreground))",
    fontSize: "0.875rem",
    fontWeight: 400,
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "hsl(var(--popover))",
    border: "1px solid hsl(var(--border))",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "hsl(var(--accent))"
      : "transparent",
    color: state.isFocused
      ? "hsl(var(--accent-foreground))"
      : "hsl(var(--foreground))",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "hsl(var(--accent))",
    borderRadius: "0.375rem",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "hsl(var(--accent-foreground))",
    fontWeight: 500,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "hsl(var(--accent-foreground))",
    ":hover": {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  }),
  input: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
  }),
  singleValue: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
  }),
});

/* -------------------- CUSTOM COMPONENTS -------------------- */
function ReactSelectClearIndicator<
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

function ReactSelectDropdownIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  const isOpen = props.selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown
        className={`h-4 w-4 text-muted-foreground transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
        strokeWidth={2}
      />
    </components.DropdownIndicator>
  );
}

function ReactSelectControl<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: ControlProps<Option, IsMulti, Group>) {
  const { children } = props;

  return (
    <components.Control
      className="!border !border-input !min-h-[41px]"
      {...props}
    >
      <div className="flex w-full">{children}</div>
    </components.Control>
  );
}

/* -------------------- BASE WRAPPER -------------------- */
export function ReactSelectBase<Option, IsMulti extends boolean = false>(
  props: Props<Option, IsMulti>
) {
  return (
    <ReactSelect
      className="text-sm min-w-48"
      components={{
        ClearIndicator: ReactSelectClearIndicator,
        DropdownIndicator: ReactSelectDropdownIndicator,
        Control: ReactSelectControl,
        ...(props.components || {}),
      }}
      styles={{
        ...createReactSelectStyles<Option, IsMulti, GroupBase<Option>>(),
        ...props.styles,
      }}
      theme={reactSelectTheme}
      {...props}
    />
  );
}
