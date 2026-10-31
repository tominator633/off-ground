"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/icons/check-icon";
import { CopyIcon } from "@/components/icons/copy-icon";
import styles from "./copy-button.module.css";

interface CopyButtonProps {
  /** What goes to the clipboard */
  text: string;
  /** Button name for screen readers, e.g. "Copy the phone number" */
  label: string;
  /** Shown (and announced) for a moment after copying */
  copiedLabel: string;
}

/** Older way of copying: select the text in a hidden field and run the copy command. */
function copyWithSelection(text: string): boolean {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    field.remove();
  }
}

/** Small round button that copies a contact detail; turns into a tick with "Copied" for a moment. */
export function CopyButton({ text, label, copiedLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  // Back to the copy icon after a moment
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard API missing or not allowed – fall back to copying a selected hidden field
      if (copyWithSelection(text)) setCopied(true);
    }
  }

  return (
    <span className={styles.wrap}>
      <button type="button" className={styles.button} data-copied={copied} onClick={copy} aria-label={label}>
        {copied ? <CheckIcon className={styles.icon} /> : <CopyIcon className={styles.icon} />}
      </button>
      {/* Live region: screen readers hear "Copied", sighted users see it next to the button */}
      <span className={styles.toast} data-visible={copied} role="status">
        {copied ? copiedLabel : ""}
      </span>
    </span>
  );
}
