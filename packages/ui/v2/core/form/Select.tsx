import { useId } from "@radix-ui/react-id";
import * as React from "react";
import ReactSelect, { components, GroupBase, InputProps, Props, SingleValue, MultiValue } from "react-select";

import classNames from "@calcom/lib/classNames";
import { useLocale } from "@calcom/lib/hooks/useLocale";

import { Label } from "./fields";

export type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group>;

export const InputComponent = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({
  inputClassName,
  ...props
}: InputProps<Option, IsMulti, Group>) => {
  return (
    <components.Input
      // disables our default form focus hightlight on the react-select input element
      inputClassName={classNames("focus:ring-0 focus:ring-offset-0", inputClassName)}
      {...props}
    />
  );
};

function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({ className, ...props }: SelectProps<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      className={classNames(
        "cal-react-select-container block h-[36px] w-full min-w-0 flex-1 rounded-md text-sm ",
        className
      )}
      classNamePrefix="cal-react-select"
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "var(--brand-color)",

          primary50: "rgba(209 , 213, 219, var(--tw-bg-opacity))",
          primary25: "rgba(244, 245, 246, var(--tw-bg-opacity))",
        },
      })}
      styles={{
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "var(--brand-color)" : state.isFocused ? "#F3F4F6" : "",
          color: state.isSelected ? "var(--brand-text-color)" : "black",
          ":active": {
            backgroundColor: state.isSelected ? "" : "var(--brand-color)",
            color: "var(--brand-text-color)",
          },
        }),
      }}
      components={{
        ...components,
        IndicatorSeparator: () => null,
        Input: InputComponent,
      }}
      {...props}
    />
  );
}

export const SelectField = function SelectField<
  Option,
  isMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: {
    name?: string;
    containerClassName?: string;
    label?: string;
    labelProps?: React.ComponentProps<typeof Label>;
    className?: string;
    error?: string;
  } & SelectProps<Option, isMulti, Group>
) {
  const { t } = useLocale();
  const { label = t(props.name || ""), containerClassName, labelProps, className, ...passThrough } = props;
  const id = useId();
  return (
    <div className={classNames(containerClassName)}>
      <div className={classNames(className)}>
        {!!label && (
          <Label htmlFor={id} {...labelProps} className={classNames(props.error && "text-red-900")}>
            {label}
          </Label>
        )}
      </div>
      <Select {...passThrough} />
    </div>
  );
};

/**
 * TODO: It should replace Select after through testing
 */
export function SelectWithValidation<
  Option extends { label: string; value: string },
  isMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  required = false,
  onChange,
  value,
  ...remainingProps
}: SelectProps<Option, isMulti, Group> & { required?: boolean }) {
  const [hiddenInputValue, _setHiddenInputValue] = React.useState(() => {
    if (value instanceof Array || !value) {
      return;
    }
    return value.value || "";
  });

  const setHiddenInputValue = React.useCallback((value: MultiValue<Option> | SingleValue<Option>) => {
    let hiddenInputValue = "";
    if (value instanceof Array) {
      hiddenInputValue = value.map((val) => val.value).join(",");
    } else {
      hiddenInputValue = value?.value || "";
    }
    _setHiddenInputValue(hiddenInputValue);
  }, []);

  React.useEffect(() => {
    if (!value) {
      return;
    }
    setHiddenInputValue(value);
  }, [value, setHiddenInputValue]);

  return (
    <div className={classNames("relative", remainingProps.className)}>
      <Select
        value={value}
        {...remainingProps}
        onChange={(value, ...remainingArgs) => {
          setHiddenInputValue(value);
          if (onChange) {
            onChange(value, ...remainingArgs);
          }
        }}
      />
      {required && (
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{
            opacity: 0,
            width: "100%",
            height: 1,
            position: "absolute",
          }}
          value={hiddenInputValue}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          // TODO:Not able to get focus to work
          // onFocus={() => selectRef.current?.focus()}
          required={required}
        />
      )}
    </div>
  );
}

export default Select;
