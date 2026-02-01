import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.css";

const TooltipProvider = Tooltip.Provider;

const TooltipRoot = Tooltip.Root;

const TooltipTrigger = Tooltip.Trigger;

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof Tooltip.Content>,
  React.ComponentPropsWithoutRef<typeof Tooltip.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Tooltip.Portal>
    <Tooltip.Content
      ref={ref}
      sideOffset={sideOffset}
      className={`${styles.TooltipContent} ${className || ""}`}
      {...props}
    >
      {props.children}
    </Tooltip.Content>
  </Tooltip.Portal>
));
TooltipContent.displayName = Tooltip.Content.displayName;

export {
  TooltipRoot as Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
};
