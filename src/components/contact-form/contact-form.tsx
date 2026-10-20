"use client";

import { useActionState } from "react";
import { buttonStyles } from "@/components/button-link/button-link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { sendContactMessage } from "@/lib/contact/actions";
import { contactLimits, formFields, initialContactState, type ContactField } from "@/lib/contact/schema";
import styles from "./contact-form.module.css";
import { TurnstileWidget } from "./turnstile-widget";

interface ContactFormProps {
  lang: Locale;
  labels: Dictionary["contact"]["form"];
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm({ lang, labels }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactState);

  if (state.status === "success") {
    return (
      <p className={styles.success} role="status">
        {labels.success}
      </p>
    );
  }

  const failed = state.status === "error" ? state : null;
  const invalid = (field: ContactField) => failed?.fields.includes(field) ?? false;
  const errorMessage =
    failed && failed.error !== "validation" ? labels.errors[failed.error] : null;

  return (
    // React resets the form after each submission; defaultValue then refills it after a failed attempt.
    <form action={formAction} className={styles.form}>
      <input type="hidden" name={formFields.locale} value={lang} />

      <div className={styles.field}>
        <label htmlFor="contact-name">{labels.name}</label>
        <input
          id="contact-name"
          name={formFields.name}
          type="text"
          autoComplete="name"
          required
          maxLength={contactLimits.nameMax}
          defaultValue={failed?.values.name}
          aria-invalid={invalid("name")}
          aria-describedby={invalid("name") ? "contact-name-error" : undefined}
        />
        {invalid("name") ? (
          <p id="contact-name-error" className={styles.fieldError}>
            {labels.errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-email">{labels.email}</label>
        <input
          id="contact-email"
          name={formFields.email}
          type="email"
          autoComplete="email"
          required
          maxLength={contactLimits.emailMax}
          defaultValue={failed?.values.email}
          aria-invalid={invalid("email")}
          aria-describedby={invalid("email") ? "contact-email-error" : undefined}
        />
        {invalid("email") ? (
          <p id="contact-email-error" className={styles.fieldError}>
            {labels.errors.email}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">{labels.message}</label>
        <textarea
          id="contact-message"
          name={formFields.message}
          rows={7}
          required
          minLength={contactLimits.messageMin}
          maxLength={contactLimits.messageMax}
          defaultValue={failed?.values.message}
          aria-invalid={invalid("message")}
          aria-describedby={invalid("message") ? "contact-message-error" : undefined}
        />
        {invalid("message") ? (
          <p id="contact-message-error" className={styles.fieldError}>
            {labels.errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it in. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">{labels.honeypot}</label>
        <input id="contact-website" name={formFields.honeypot} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey ? <TurnstileWidget siteKey={turnstileSiteKey} lang={lang} resetKey={state} /> : null}

      <p className={styles.note}>{labels.privacyNote}</p>

      {errorMessage ? (
        <p className={styles.formError} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button type="submit" className={`${buttonStyles.button} ${buttonStyles.primary}`} disabled={pending}>
        {pending ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
