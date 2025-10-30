import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
  { title: "Resumind | Auth" },
  { name: "description", content: "Log into your account" },
]);

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1] || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover bg-no-repeat min-h-screen flex items-center justify-center p-6">
      {/* Outer gradient border container */}
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 shadow-lg w-full max-w-md">
        {/* Inner white content box */}
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 text-center">
          {/* Header section */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <h2 className="text-gray-600 text-lg">
              Log in to continue your job journey
            </h2>
          </div>

          {/* Action button section */}
          <div>
            {isLoading ? (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-400 to-pink-400 text-white font-semibold text-lg shadow-md animate-pulse"
              >
                Signing you in...
              </button>
            ) : auth.isAuthenticated ? (
              <button
                onClick={auth.signOut}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-400 to-rose-500 text-white font-semibold text-lg shadow-md hover:scale-[1.02] transition-transform duration-200"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={auth.signIn}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold text-lg shadow-md hover:scale-[1.02] transition-transform duration-200"
              >
                Log In
              </button>
            )}
          </div>

          {/* Optional message */}
          <p className="text-sm text-gray-500">
            Your data is securely stored and synced with your account.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Auth;
