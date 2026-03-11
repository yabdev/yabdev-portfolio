"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/api";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Assuming your backend /api/auth/login expects this payload
      const token = await adminLogin({ username, password });
      localStorage.setItem("admin_token", token);
      router.push("/admin/projects"); // Redirect to projects after login
    } catch (err) {
      setError("Invalid credentials or server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md glass-panel p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-white/5 rounded-full mb-4">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="font-jakarta text-2xl font-bold text-white">System Access</h1>
          <p className="text-primary-muted text-sm text-center mt-2">Restricted area. Please authenticate to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-sm text-center">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
            <input 
              required 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full bg-black/50 border border-border rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input 
              required 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-black/50 border border-border rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-70"
          >
            {isLoading ? "Authenticating..." : "Establish Connection"}
          </button>
        </form>
      </div>
    </div>
  );
}