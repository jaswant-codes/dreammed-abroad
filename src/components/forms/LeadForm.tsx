"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { LegalConsent } from "@/components/forms/LegalConsent";

interface LeadFormProps {
  source?: string;
  country?: string;
  compact?: boolean;
}

export function LeadForm({ source = "website", country, compact = false }: LeadFormProps) {
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
      neetScore: formData.get("neetScore") as string,
      preferredCountry: (formData.get("preferredCountry") as string) || country || "",
      budget: formData.get("budget") as string,
      message: formData.get("message") as string,
      legalConsent,
      source,
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-success-light rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-navy mb-2">
          Application Submitted Successfully!
        </h3>
        <p className="text-sm text-text-secondary">
          Our counsellor will contact you within 24 hours. You can also reach us
          on WhatsApp for instant response.
        </p>
        <Button
          onClick={() => setSuccess(false)}
          variant="outline"
          className="mt-4 rounded-full"
        >
          Submit Another Application
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

      <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-4`}>
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-sm font-medium text-navy">
            Full Name *
          </Label>
          <Input
            id="fullName"
            name="fullName"
            required
            placeholder="Enter your full name"
            className="rounded-xl border-border-light focus:border-sky"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-medium text-navy">
            Phone Number *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+91 XXXXX XXXXX"
            className="rounded-xl border-border-light focus:border-sky"
          />
        </div>
      </div>

      <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-4`}>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-navy">
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="rounded-xl border-border-light focus:border-sky"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="neetScore" className="text-sm font-medium text-navy">
            NEET Score
          </Label>
          <Input
            id="neetScore"
            name="neetScore"
            placeholder="Enter your NEET score"
            className="rounded-xl border-border-light focus:border-sky"
          />
        </div>
      </div>

      {!country && (
        <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-4`}>
          <div className="space-y-1.5">
            <Label htmlFor="preferredCountry" className="text-sm font-medium text-navy">
              Preferred Country
            </Label>
            <select
              id="preferredCountry"
              name="preferredCountry"
              className="w-full h-10 rounded-xl border border-border-light px-3 text-sm bg-white focus:border-sky focus:outline-none focus:ring-1 focus:ring-sky"
            >
              <option value="">Select a country</option>
              <option value="Russia">Russia</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Georgia">Georgia</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Not Sure">Not Sure — Need Guidance</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="budget" className="text-sm font-medium text-navy">
              Budget Range
            </Label>
            <select
              id="budget"
              name="budget"
              className="w-full h-10 rounded-xl border border-border-light px-3 text-sm bg-white focus:border-sky focus:outline-none focus:ring-1 focus:ring-sky"
            >
              <option value="">Select budget range</option>
              <option value="Under 15 Lakhs">Under ₹15 Lakhs</option>
              <option value="15-25 Lakhs">₹15 - 25 Lakhs</option>
              <option value="25-35 Lakhs">₹25 - 35 Lakhs</option>
              <option value="Above 35 Lakhs">Above ₹35 Lakhs</option>
            </select>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-sm font-medium text-navy">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your requirements..."
          rows={3}
          className="rounded-xl border-border-light focus:border-sky resize-none"
        />
      </div>

      <LegalConsent />

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-navy hover:bg-navy-light text-white rounded-full font-semibold py-5 text-base shadow-md hover:shadow-lg transition-all"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Get Free Counselling"
        )}
      </Button>

      <p className="text-xs text-text-secondary text-center">
        Your information is 100% confidential. We never spam.
      </p>
    </form>
  );
}
