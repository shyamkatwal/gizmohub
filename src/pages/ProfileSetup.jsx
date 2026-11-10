import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, Phone, LoaderCircle, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ProfileSetup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);
  const [error, setError] = useState("");

  // Check whether the customer is authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/register", { replace: true });
        return;
      }

      setEmail(data.user.email || "");
      setCheckingUser(false);
    };

    checkUser();
  }, [navigate]);

  // Save customer profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      setError("Your session has expired. Please register again.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("profiles").upsert(
      {
        id: userData.user.id,
        full_name: fullName.trim(),
        phone: phone.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/");
  };

  if (checkingUser) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-violet-600" size={32} />
      </main>
    );
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#faf9ff] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-violet-100/50">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
          <UserRound size={28} />
        </div>

        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          Almost there!
        </p>

        <h1 className="mt-2 font-[Outfit] text-3xl font-extrabold text-slate-900">
          Complete your profile
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Tell us a little about yourself to complete your GizmoHub account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Verified email address
            </label>

            <input
              type="email"
              value={email}
              readOnly
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Full name
            </label>

            <input
              id="fullName"
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Phone number
            </label>

            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
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
            disabled={loading || !fullName.trim() || !phone.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-4 font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle size={19} className="animate-spin" />
                Saving profile...
              </>
            ) : (
              <>
                Complete registration
                <ArrowRight size={19} />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Your information is securely stored with GizmoHub.
        </p>
      </div>
    </main>
  );
}
