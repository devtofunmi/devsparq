"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
      } else {
        setUser(null);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth");
  };

  return (
    <nav className="bg-[rgba(15,23,42,0.6)] backdrop-blur-md border-b border-white/10 py-6 px-6 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
         <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-[#6E00FF] to-[#0096FF] bg-clip-text text-transparent">
            DevSparq
          </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <a href="#what" className="hover:text-[#6E00FF] transition">
              What is DevSparq?
            </a>
          </li>
          <li>
            <a href="#features" className="hover:text-[#6E00FF] transition">
              Features
            </a>
          </li>
          <li>
            <a href="#cta" className="hover:text-[#6E00FF] transition">
              Get Started
            </a>
          </li>
          {user ? (
            <>
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-[#6E00FF] transition"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#6E00FF] cursor-pointer text-white rounded-lg"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <a href="/auth" className="hover:text-[#6E00FF] cursor-pointer transition">
                Log In
              </a>
            </li>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden cursor-pointer text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 px-4">
          <a href="#what" className="block py-2 hover:text-[#6E00FF] transition">
            What is DevSparq?
          </a>
          <a
            href="#features"
            className="block py-2 hover:text-[#6E00FF] transition"
          >
            Features
          </a>
          <a href="#cta" className="block py-2 hover:text-[#6E00FF] transition">
            Get Started
          </a>
          {user ? (
            <>
              <a
                href="/dashboard"
                className="block py-2 hover:text-[#6E00FF] transition"
              >
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="w-full text-left cursor-pointer py-2 text-red-500 hover:text-red-400 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <a
              href="/auth"
              className="block py-2 hover:text-[#6E00FF] transition"
            >
              Log In
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
