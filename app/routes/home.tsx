import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-100">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1 className="text-gradient">Track Your Applications & Resume Ratings</h1>

          {!loadingResumes && resumes?.length === 0 ? (
            <h2 className="text-2xl font-semibold text-white/90 drop-shadow-md mt-4">
              No resumes found. Upload your first resume to get AI-powered feedback.
            </h2>
          ) : (
            <h2 className="text-2xl font-semibold text-white/90 drop-shadow-md mt-4">
              Review your previous submissions and see detailed performance insights.
            </h2>
          )}
        </div>

        {/* Loading Animation */}
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center mt-10">
            <img
              src="/images/resume-scan-2.gif"
              className="w-[220px] opacity-90"
              alt="Loading resumes"
            />
            <p className="text-gray-300 mt-4 animate-pulse">
              Fetching your resume data...
            </p>
          </div>
        )}

        {/* Resumes List */}
        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12 gap-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-xl">
            <p className="text-white/90 text-lg">
              Ready to boost your resume score and stand out?
            </p>
            <Link
              to="/upload"
              className="primary-button text-xl font-semibold hover:scale-105 hover:shadow-indigo-500/40 transition-all"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
