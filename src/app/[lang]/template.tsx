import { ViewTransition } from "react";

/**
 * Page transitions. Unlike the layout, a template re-mounts on every navigation, so the old
 * page plays its exit animation and the new one its enter animation (CSS in globals.css).
 * The browser's View Transitions API animates snapshots on the compositor – no JS per frame.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
