"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { LegalConsent } from "@/components/forms/LegalConsent";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const legalConsent = formData.get("legalConsent") === "on";

    if (!legalConsent) {
      setError("Please accept the Privacy Policy and Terms & Conditions to continue.");
      setLoading(false);
      return;
    }

    const data = {
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      legalConsent,
      source: "contact-page",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit");
      }
      
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-success-light rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-navy mb-2">Message Sent!</h3>
        <p className="text-sm text-text-secondary">
          We&apos;ll get back to you within 24 hours.
        </p>
        <Button onClick={() => setSuccess(false)} variant="outline" className="mt-4 rounded-full">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="contactName" className="text-sm font-medium text-navy">Full Name *</Label>
        <Input id="contactName" name="fullName" required placeholder="Your full name" className="rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contactPhone" className="text-sm font-medium text-navy">Phone *</Label>
          <Input id="contactPhone" name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" className="rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactEmail" className="text-sm font-medium text-navy">Email *</Label>
          <Input id="contactEmail" name="email" type="email" required placeholder="your@email.com" className="rounded-xl" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contactMessage" className="text-sm font-medium text-navy">Message *</Label>
        <Textarea id="contactMessage" name="message" required placeholder="How can we help you?" rows={5} className="rounded-xl resize-none" />
      </div>

      <LegalConsent />

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-navy hover:bg-navy-light text-white rounded-full font-semibold py-5"
      >
        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</> : "Send Message"}
      </Button>
    </form>
  );
}
