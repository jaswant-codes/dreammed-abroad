"use client";

import { useId } from "react";
import Link from "next/link";

export function LegalConsent() {
  const consentId = useId();

  return (
    <div className="rounded-xl border border-border-light bg-surface/60 p-3">
      <label htmlFor={consentId} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
        <input
          id={consentId}
          name="legalConsent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-border-light text-sky focus:ring-sky"
        />
        <span>
          I have read and agree to the{" "}
          <Link href="/privacy-policy" target="_blank" className="font-semibold text-sky hover:text-navy transition-colors">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms-and-conditions" target="_blank" className="font-semibold text-sky hover:text-navy transition-colors">
            Terms & Conditions
          </Link>
          .
        </span>
      </label>
    </div>
  );
}
