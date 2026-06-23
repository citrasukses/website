"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginCatalogAdmin, type LoginState } from "@/app/admin/catalog/actions";

const initialState: LoginState = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="min-h-11 bg-signal-500 px-5 py-3 text-sm font-semibold text-white hover:bg-signal-600 disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function CatalogLoginForm() {
  const [state, action] = useActionState(loginCatalogAdmin, initialState);
  return (
    <form action={action} className="mt-8 grid gap-4">
      <label className="grid gap-2 text-sm font-semibold text-graphite-800">
        Admin password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="min-h-11 border border-graphite-300 bg-white px-3 font-normal"
        />
      </label>
      {state.error ? <p className="text-sm font-semibold text-signal-600">{state.error}</p> : null}
      <SubmitButton />
    </form>
  );
}

