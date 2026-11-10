import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowRight,
  LoaderCircle,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Countdown for requesting another OTP
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // Send login OTP
  const handleSendOtp = async (e) => {
    e?.preventDefault?.();

    if (loading || cooldown > 0) return;

    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: false,
      },
    });

    setLoading(false);

    if (error) {
      const isRateLimited =
        error.status === 429 ||
        error.message.toLowerCase().includes("rate limit");

      if (isRateLimited) {
        setError("Too many email requests. Please wait before trying again.");
        setCooldown(60);
      } else {
        setError(error.message);
      }

      return;
    }

    setCooldown(60);
    setStep("otp");
    setMessage("Login code sent! Please check your email.");
  };

  // Verify login OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: otp,
      type: "email",
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    // Load the customer's existing profile
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      setLoading(false);
      setError("Login succeeded, but we couldn't load your account.");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, phone")
      .eq("id", userData.user.id)
      .maybeSingle();

    setLoading(false);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    if (!profile) {
      navigate("/profile-setup", { replace: true });
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#faf9ff] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-violet-100/50">
        {step === "email" && (
          <>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <Mail size={28} />
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              Welcome back
            </p>

            <h1 className="mt-2 font-[Outfit] text-3xl font-extrabold text-slate-900">
              Login to GizmoHub
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your registered email address. We'll send you a verification
              code to log in.
            </p>

            <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || cooldown > 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-4 font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={19} className="animate-spin" />
                    Sending...
                  </>
                ) : cooldown > 0 ? (
                  `Try again in ${cooldown}s`
                ) : (
                  <>
                    Send login code
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              New to GizmoHub?{" "}
              <Link
                to="/register"
                className="font-bold text-violet-700 hover:text-violet-900"
              >
                Create an account
              </Link>
            </p>
          </>
        )}

        {step === "otp" && (
          <>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <ShieldCheck size={28} />
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              Account verification
            </p>

            <h1 className="mt-2 font-[Outfit] text-3xl font-extrabold text-slate-900">
              Check your email
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter the login code sent to:
              <span className="block font-bold text-slate-800">{email}</span>
            </p>

            <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Verification code
                </label>

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter 6-digit code"
                  className="w-full rounded-xl border border-slate-200 px-4 py-4 text-center text-2xl font-extrabold tracking-[0.25em] outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 placeholder:text-sm placeholder:tracking-normal"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              {message && (
                <p
                  role="status"
                  className="rounded-xl bg-green-50 p-3 text-sm text-green-700"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-4 font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={19} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={19} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading || cooldown > 0}
                className="w-full py-2 text-sm font-bold text-violet-700 hover:text-violet-900 disabled:cursor-not-allowed disabled:text-slate-400"
              >
                {loading
                  ? "Please wait..."
                  : cooldown > 0
                    ? `Resend code in ${cooldown}s`
                    : "Resend login code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setError("");
                  setMessage("");
                }}
                className="flex w-full items-center justify-center gap-2 py-2 text-sm font-bold text-slate-500 hover:text-violet-700"
              >
                <ArrowLeft size={16} />
                Change email address
              </button>
            </form>
          </>
        )}

        <p className="mt-8 text-center text-xs text-slate-400">
          Your account security matters to us.
        </p>
      </div>
    </main>
  );
}
