import "react";

// Next 16's App Router provides React's <ViewTransition> at runtime (enabled by
// experimental.viewTransition), but @types/react doesn't declare it yet.
declare module "react" {
  interface ViewTransitionProps {
    children?: React.ReactNode;
    name?: string;
    enter?: string | Record<string, string>;
    exit?: string | Record<string, string>;
    update?: string | Record<string, string>;
    share?: string | Record<string, string>;
    default?: string;
    onEnter?: (instance: unknown, types: string[]) => void;
    onExit?: (instance: unknown, types: string[]) => void;
  }
  export const ViewTransition: React.FC<ViewTransitionProps>;
}
