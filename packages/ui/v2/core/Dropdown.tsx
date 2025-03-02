import { CheckCircleIcon } from "@heroicons/react/outline";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { ComponentProps, forwardRef } from "react";
import { Icon } from "react-feather";

import { classNames } from "@calcom/lib";

export const Dropdown = DropdownMenuPrimitive.Root;

type DropdownMenuTriggerProps = ComponentProps<typeof DropdownMenuPrimitive["Trigger"]>;
export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className = "", ...props }, forwardedRef) => (
    <DropdownMenuPrimitive.Trigger
      {...props}
      className={
        props.asChild
          ? className
          : `inline-flex items-center rounded-md bg-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1 group-hover:text-black ${className}`
      }
      ref={forwardedRef}
    />
  )
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuTriggerItem = DropdownMenuPrimitive.TriggerItem;

type DropdownMenuContentProps = ComponentProps<typeof DropdownMenuPrimitive["Content"]>;
export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ children, align = "end", ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.Content
        portalled={props.portalled}
        align={align}
        {...props}
        className="w-50 relative z-10 mt-1 -ml-0 origin-top-right rounded-md bg-white text-sm ring-1 ring-black ring-opacity-5 focus:outline-none"
        ref={forwardedRef}>
        {children}
      </DropdownMenuPrimitive.Content>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

type DropdownMenuLabelProps = ComponentProps<typeof DropdownMenuPrimitive["Label"]>;
export const DropdownMenuLabel = (props: DropdownMenuLabelProps) => (
  <DropdownMenuPrimitive.Label {...props} className="px-3 py-2 text-neutral-500" />
);

type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive["CheckboxItem"]>;
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className = "", ...props }, forwardedRef) => (
    <DropdownMenuPrimitive.Item
      className={`text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
      {...props}
      ref={forwardedRef}
    />
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

type DropdownMenuCheckboxItemProps = ComponentProps<typeof DropdownMenuPrimitive["CheckboxItem"]>;
export const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.CheckboxItem {...props} ref={forwardedRef}>
        {children}
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckCircleIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </DropdownMenuPrimitive.CheckboxItem>
    );
  }
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

type DropdownMenuRadioItemProps = ComponentProps<typeof DropdownMenuPrimitive["RadioItem"]>;
export const DropdownMenuRadioItem = forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.RadioItem {...props} ref={forwardedRef}>
        {children}
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckCircleIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </DropdownMenuPrimitive.RadioItem>
    );
  }
);
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

type DropdownItemProps = {
  children: React.ReactNode;
  color?: "destructive";
  StartIcon?: Icon;
  EndIcon?: Icon;
  href?: string;
  disabled?: boolean;
} & ButtonOrLinkProps;

type ButtonOrLinkProps = ComponentProps<"button"> & ComponentProps<"a">;
export function ButtonOrLink({ href, ...props }: ButtonOrLinkProps) {
  const isLink = typeof href !== "undefined";
  const ButtonOrLink = isLink ? "a" : "button";

  const content = <ButtonOrLink {...props} />;

  if (isLink) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export const DropdownItem = (props: DropdownItemProps) => {
  const { StartIcon, EndIcon } = props;

  return (
    <ButtonOrLink
      {...props}
      className={classNames(
        "inline-flex items-center px-3 py-[10px] text-gray-600",
        props.color === "destructive" ? "hover:bg-red-100 hover:text-red-700" : " hover:bg-gray-100"
      )}>
      <>
        {StartIcon && <StartIcon />}
        <div className="mx-2 text-black">{props.children}</div>
        {EndIcon && <EndIcon />}
      </>
    </ButtonOrLink>
  );
};

export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;

export default Dropdown;
