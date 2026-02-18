"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    institute: "",
  });
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/auth/me`, { credentials: "include" });
        const data = await res.json();

        if (data.authenticated) {
          setLoggedInUser(data.data);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isAdmin ? "/auth/admin-login" : "/auth/user-login";
    const payload = isAdmin
      ? { name: form.name, email: form.email, phone: form.phone, institute: form.institute }
      : { username: form.username, email: form.email, phone: form.phone, institute: form.institute };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // Fetch session immediately
      const sessionRes = await fetch(`${apiUrl}/auth/me`, { credentials: "include" });
      const sessionData = await sessionRes.json();

      if (sessionData.authenticated) {
        setLoggedInUser(sessionData.data);
        alert(data.message || "Login successful!");
      } else {
        alert("Login succeeded but session not established!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      await fetch(`${apiUrl}/auth/logout`, { method: "POST", credentials: "include" });
      setLoggedInUser(null);
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  // ====== UI ======
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Checking session...</p>
      </div>
    );
  }

  // If already logged in
  if (loggedInUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gr-100 via-white to-green-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome back, {loggedInUser.username || loggedInUser.name || "User"}! 
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            You’re already logged in as {loggedInUser.admin ? "Counsellor" : "User"}.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {loggedInUser.admin && (
              <button
                onClick={() => router.push("/admin")}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 hover:scale-105"
              >
                Go to Admin Page
              </button>
            )}
            {!loggedInUser.admin && (
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Go to Dashboard
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
        <div className="flex mb-6">
          <button
            type="button"
            className={`flex-1 py-2 rounded-l-lg ${!isAdmin ? "bg-cyan-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
            onClick={() => setIsAdmin(false)}
          >
            User Login
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-r-lg ${isAdmin ? "bg-cyan-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
            onClick={() => setIsAdmin(true)}
          >
            Admin Login
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          {isAdmin ? "Counsellor Login" : "User Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isAdmin ? (
            <>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Counsellor Name" className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:text-white" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:text-white" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:text-white" />
              <input name="institute" value={form.institute} onChange={handleChange} placeholder="Institute Name" className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:text-white" />
            </>
          ) : (
            <>
              <input name="username" value={form.username} onChange={handleChange} placeholder="Username (optional)" className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:text-white" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:text-white" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:text-white" />
              <input name="institute" value={form.institute} onChange={handleChange} placeholder="Institute Name" className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:text-white" />
            </>
          )}
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg">
            {isAdmin ? "Login as Counsellor" : "Login as User"}
          </button>
        </form>
      </div>
    </div>
  );
}
