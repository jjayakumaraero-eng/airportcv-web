"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Show when="signed-out">
        <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 p-1 shadow-sm md:flex">
          <SignInButton mode="modal">
            <button className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Sign in
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Create account
            </button>
          </SignUpButton>
        </div>

        <div className="flex md:hidden">
          <SignInButton mode="modal">
            <button className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Sign in
            </button>
          </SignInButton>
        </div>
      </Show>

      <Show when="signed-in">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 p-1 shadow-sm">
          <Link
            href="/dashboard"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Dashboard
          </Link>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-9 w-9",
              },
            }}
          />

          <SignOutButton>
            <button className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-700 md:inline-flex">
              Sign out
            </button>
          </SignOutButton>
        </div>
      </Show>
    </div>
  );
}