import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  LoaderCircle,
  Pencil,
  Save,
  X,
  CheckCircle,
} from "lucide-react";

export default function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editingField, setEditingField] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadAccount = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        navigate("/login", { replace: true });
        return;
      }

      setUser(userData.user);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", userData.user.id)
        .maybeSingle();

      if (profileError) {
        setError(profileError.message);
      }

      setProfile(profileData);

      setFullName(profileData?.full_name || "");
      setPhone(profileData?.phone || "");

      setLoading(false);
    };

    loadAccount();
  }, [navigate]);

  // Start editing one field
  const handleEdit = (field) => {
    setFullName(profile?.full_name || "");
    setPhone(profile?.phone || "");
    setEditingField(field);
    setError("");
    setSuccess("");
  };

  // Cancel editing
  const handleCancel = () => {
    setFullName(profile?.full_name || "");
    setPhone(profile?.phone || "");
    setEditingField(null);
    setError("");
  };

  // Save the selected field
  const handleSave = async (e) => {
    e.preventDefault();

    if (!editingField || saving) return;

    const value = editingField === "full_name" ? fullName.trim() : phone.trim();

    if (editingField === "full_name" && !value) {
      setError("Please enter your full name.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updateData = {
        [editingField]: value || null,
        updated_at: new Date().toISOString(),
      };

      const { data, error: saveError } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id)
        .select("full_name, phone")
        .single();

      if (saveError) throw saveError;

      setProfile(data);
      setFullName(data.full_name || "");
      setPhone(data.phone || "");
      setEditingField(null);

      setSuccess(
        editingField === "full_name"
          ? "Name updated successfully!"
          : "Phone number updated successfully!",
      );
    } catch (err) {
      setError(err.message || "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-violet-600" size={32} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9ff] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-extrabold text-slate-900">My Account</h1>

        <p className="mt-2 text-slate-500">Manage your personal information.</p>

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle size={18} />
            {success}
          </p>
        )}

        <div className="mt-8 rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
          {/* Customer heading */}
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-violet-100 text-violet-700">
              <User size={30} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {profile?.full_name || "Customer"}
              </h2>

              <p className="text-sm text-slate-500">GizmoHub Customer</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* Email - Read only */}
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">
                Email Address
              </p>

              <div className="flex items-center gap-3 text-slate-800">
                <Mail size={19} className="text-violet-600" />
                {user?.email}
                <span className="text-xs text-slate-400">
                  (Cannot edit here)
                </span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">
                Full Name
              </p>

              {editingField === "full_name" ? (
                <form onSubmit={handleSave} className="space-y-3">
                  <input
                    type="text"
                    required
                    autoFocus
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    placeholder="Enter your full name"
                  />

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 font-bold text-white hover:bg-violet-700 disabled:opacity-60"
                    >
                      {saving ? (
                        <LoaderCircle size={17} className="animate-spin" />
                      ) : (
                        <Save size={17} />
                      )}
                      {saving ? "Saving..." : "Save"}
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-600 hover:bg-slate-50"
                    >
                      <X size={17} />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="group flex items-center gap-3">
                  <User size={19} className="text-violet-600" />

                  <span className="text-slate-800">
                    {profile?.full_name || "Not provided"}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleEdit("full_name")}
                    aria-label="Edit full name"
                    className="rounded-lg p-2 text-slate-400 opacity-0 transition hover:bg-violet-50 hover:text-violet-700 group-hover:opacity-100 focus:opacity-100"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">
                Phone Number
              </p>

              {editingField === "phone" ? (
                <form onSubmit={handleSave} className="space-y-3">
                  <input
                    type="tel"
                    autoFocus
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    placeholder="Enter your phone number"
                  />

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 font-bold text-white hover:bg-violet-700 disabled:opacity-60"
                    >
                      {saving ? (
                        <LoaderCircle size={17} className="animate-spin" />
                      ) : (
                        <Save size={17} />
                      )}
                      {saving ? "Saving..." : "Save"}
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-600 hover:bg-slate-50"
                    >
                      <X size={17} />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="group flex items-center gap-3">
                  <Phone size={19} className="text-violet-600" />

                  <span className="text-slate-800">
                    {profile?.phone || "Not provided"}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleEdit("phone")}
                    aria-label="Edit phone number"
                    className="rounded-lg p-2 text-slate-400 opacity-0 transition hover:bg-violet-50 hover:text-violet-700 group-hover:opacity-100 focus:opacity-100"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
