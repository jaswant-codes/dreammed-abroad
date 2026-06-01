"use client";

import { useEffect, useState } from "react";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const POPUP_STORAGE_KEY = "dreammed_homepage_popup_last_seen";
const POPUP_DELAY_MS = 5000;
const POPUP_HIDE_DURATION_MS = 24 * 60 * 60 * 1000;

export function HomepageLeadPopup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lastSeenRaw = window.localStorage.getItem(POPUP_STORAGE_KEY);
    const lastSeen = lastSeenRaw ? Number(lastSeenRaw) : 0;
    const shouldShow = Date.now() - lastSeen > POPUP_HIDE_DURATION_MS;

    if (!shouldShow) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      document.body.style.overflow = "hidden";
    }, POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closePopup = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(POPUP_STORAGE_KEY, String(Date.now()));
    }
    setOpen(false);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: (formData.get("fullName") as string) || "",
      phone: (formData.get("phone") as string) || "",
      email: (formData.get("email") as string) || "",
      message: (formData.get("message") as string) || "",
      source: "homepage-popup",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit");
      }

      setSuccess(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(POPUP_STORAGE_KEY, String(Date.now()));
      }
    } catch (submissionError: any) {
      setError(submissionError.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/65 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close popup"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-border-light bg-white text-navy hover:bg-surface transition-colors"
        >
          <X className="w-4 h-4 mx-auto" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-sky-50/60 p-6 sm:p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky mb-3">Get Started</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-navy leading-tight">
              Secure Your MBBS Abroad Seat
            </h3>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              Share your basic details and our DreamMed counselors will guide you with university options, fees, and admission support.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-12 h-12 text-success mb-3" />
                <h4 className="text-xl font-bold text-navy">Thank You!</h4>
                <p className="text-sm text-text-secondary mt-2">
                  Your details were submitted successfully. Our team will contact you shortly.
                </p>
                <Button onClick={closePopup} className="mt-5 rounded-full bg-navy hover:bg-navy-light">
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="popupFullName" className="text-sm font-medium text-navy">Full Name *</Label>
                  <Input id="popupFullName" name="fullName" required placeholder="Enter your full name" className="rounded-xl" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="popupPhone" className="text-sm font-medium text-navy">Phone Number *</Label>
                  <Input id="popupPhone" name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" className="rounded-xl" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="popupEmail" className="text-sm font-medium text-navy">Email Address *</Label>
                  <Input id="popupEmail" name="email" type="email" required placeholder="your@email.com" className="rounded-xl" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="popupMessage" className="text-sm font-medium text-navy">Message</Label>
                  <Textarea id="popupMessage" name="message" placeholder="Tell us your requirement..." rows={3} className="rounded-xl resize-none" />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-navy hover:bg-navy-light text-white font-semibold"
                >
                  {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</> : "Get Free Counseling"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
