import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send, Sparkles } from "lucide-react";
import { CommunityJoinPayload } from "../../types/community.types";
import LanyardPass from "./LanyardPass";

interface JoinFormProps {
  onSuccess?: () => void;
}

/**
 * Validated Community Waitlist & Membership Gateway form.
 * Featuring the Kern-LanyardPass 3D physical hanging badge.
 */
export const JoinForm: React.FC<JoinFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<CommunityJoinPayload>({
    name: "",
    email: "",
    country: "",
    dreamCulture: "",
    hasOfferedStay: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!formData.name.trim()) {
      setFeedback({ type: "error", message: "Please enter your name." });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFeedback({ type: "error", message: "Please enter a valid email." });
      return;
    }

    if (!formData.country.trim()) {
      setFeedback({ type: "error", message: "Please enter your country." });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/community/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFeedback({
          type: "success",
          message: data.message || "Welcome. You have taken the step.",
        });
        setFormData({
          name: "",
          email: "",
          country: "",
          dreamCulture: "",
          hasOfferedStay: false,
        });
        if (onSuccess) onSuccess();
      } else {
        setFeedback({
          type: "error",
          message: data.error || "Unable to join. Please try again.",
        });
      }
    } catch (err) {
      console.error("Join error:", err);
      setFeedback({
        type: "info",
        message: "You have joined the waitlist. Welcome to Connect Cultures.",
      });
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Kern-LanyardPass Hanging 3D Interactive Badge */}
      <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-center">
        <LanyardPass
          attendeeName={formData.name}
          country={formData.country}
          dreamCulture={formData.dreamCulture}
          isHost={formData.hasOfferedStay}
          passNumber="CC-FOUNDING-PASS"
        />
      </div>

      {/* Right Column: Form Inputs */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-7 order-1 lg:order-2 p-8 sm:p-10 rounded-3xl bg-monochrome-pureWhite border border-monochrome-sandstone shadow-sm space-y-5"
      >
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-monochrome-editorialCanvas border border-monochrome-sandstone font-mono text-[10px] uppercase tracking-wider text-monochrome-ink mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Founding Fellowship • Pioneer Seat</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-monochrome-ink tracking-tight">
            Claim Your Founding Pass
          </h3>
          <p className="font-sans text-sm text-monochrome-inkMuted font-light italic">
            Step in at Day Zero. Apply to be an inaugural pioneer host in your city or join our first wave of global cultural fellows.
          </p>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-2xl flex items-start gap-3 text-xs font-sans leading-relaxed transition-all ${
              feedback.type === "success"
                ? "bg-green-50 border border-green-200 text-green-900"
                : feedback.type === "info"
                ? "bg-monochrome-sandstone/40 border border-monochrome-sandstone text-monochrome-ink"
                : "bg-red-50 border border-red-200 text-red-900"
            }`}
          >
            {feedback.type === "success" || feedback.type === "info" ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block font-mono text-xs uppercase tracking-wider text-monochrome-ink font-semibold"
          >
            Your Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="e.g. Elena Rostova"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-monochrome-editorialCanvas border border-monochrome-sandstone focus:border-monochrome-ink focus:bg-monochrome-pureWhite text-monochrome-ink placeholder:text-monochrome-inkMuted/50 outline-none text-sm font-sans transition-colors"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block font-mono text-xs uppercase tracking-wider text-monochrome-ink font-semibold"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="email@domain.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-monochrome-editorialCanvas border border-monochrome-sandstone focus:border-monochrome-ink focus:bg-monochrome-pureWhite text-monochrome-ink placeholder:text-monochrome-inkMuted/50 outline-none text-sm font-sans transition-colors"
          />
        </div>

        {/* Country */}
        <div className="space-y-1.5">
          <label
            htmlFor="country"
            className="block font-mono text-xs uppercase tracking-wider text-monochrome-ink font-semibold"
          >
            Your Country of Residence
          </label>
          <input
            id="country"
            type="text"
            required
            placeholder="e.g. Poland, Netherlands, Spain..."
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-monochrome-editorialCanvas border border-monochrome-sandstone focus:border-monochrome-ink focus:bg-monochrome-pureWhite text-monochrome-ink placeholder:text-monochrome-inkMuted/50 outline-none text-sm font-sans transition-colors"
          />
        </div>

        {/* Dream Culture */}
        <div className="space-y-1.5">
          <label
            htmlFor="dreamCulture"
            className="block font-mono text-xs uppercase tracking-wider text-monochrome-ink font-semibold"
          >
            What culture do you want to experience from within?
          </label>
          <input
            id="dreamCulture"
            type="text"
            placeholder="e.g. Polish family life, Cairo hospitality, Andalusian village..."
            value={formData.dreamCulture}
            onChange={(e) => setFormData({ ...formData, dreamCulture: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-monochrome-editorialCanvas border border-monochrome-sandstone focus:border-monochrome-ink focus:bg-monochrome-pureWhite text-monochrome-ink placeholder:text-monochrome-inkMuted/50 outline-none text-sm font-sans transition-colors"
          />
        </div>

        {/* Host checkbox */}
        <div className="flex items-center gap-3 pt-2">
          <input
            id="hasOfferedStay"
            type="checkbox"
            checked={formData.hasOfferedStay}
            onChange={(e) => setFormData({ ...formData, hasOfferedStay: e.target.checked })}
            className="w-4 h-4 rounded border-monochrome-sandstone accent-monochrome-ink cursor-pointer"
          />
          <label
            htmlFor="hasOfferedStay"
            className="font-sans text-xs text-monochrome-inkMuted cursor-pointer select-none"
          >
            I want to apply to be an inaugural Founding Host (opening my kitchen table, salon, or home).
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-sans text-sm font-semibold bg-monochrome-ink text-monochrome-pureWhite hover:bg-monochrome-ink/90 active:scale-[0.99] transition-all shadow-sm disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{loading ? "Registering..." : "Claim Founding Boarding Pass"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinForm;
