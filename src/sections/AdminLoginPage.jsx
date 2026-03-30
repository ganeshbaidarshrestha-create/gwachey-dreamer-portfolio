import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { Container } from "../components/Container";

const LOCAL_ADMIN_PASSWORD = "gwachey-admin";

export function AdminLoginPage({ onBack, onSuccess, isLocalAdminAvailable = true }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isLocalAdminAvailable) {
      setError("Local admin is only available on this device during local development.");
      return;
    }

    if (password !== LOCAL_ADMIN_PASSWORD) {
      setError("Incorrect password.");
      return;
    }

    setError("");
    setPassword("");
    onSuccess();
  };

  return (
    <section className="poetry-room section-shell relative min-h-screen overflow-hidden border-b border-white/6 py-24 sm:py-28 lg:py-32">
      <div className="admin-login-backdrop pointer-events-none absolute inset-0" />
      <Container className="relative z-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <div className="book-panel rounded-[2.3rem] p-8 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3 text-[#d9ccb7]">
              <LockKeyhole size={18} />
              <p className="text-[0.68rem] uppercase tracking-[0.35em]">Private Access</p>
            </div>
            <h1 className="mt-6 max-w-lg font-serif text-4xl italic leading-[0.96] text-[#fff6e8] sm:text-5xl">
              Admin Login
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9ccb7] sm:leading-9">
              {isLocalAdminAvailable
                ? "This is the hidden local control room for your portfolio. Only users who know the private access pattern and password should arrive here."
                : "For safety, the local admin is disabled outside localhost. Use the portfolio normally on public deployments, and manage content from your local machine."}
            </p>

            <form onSubmit={handleSubmit} className="mt-10">
              <label className="block">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.3em] text-[#cfbfa4]">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={!isLocalAdminAvailable}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/[0.06]"
                />
              </label>
              {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
              <button
                type="submit"
                disabled={!isLocalAdminAvailable}
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-abyss transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <ShieldCheck size={16} />
                {isLocalAdminAvailable ? "Enter Dashboard" : "Local Access Only"}
              </button>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
