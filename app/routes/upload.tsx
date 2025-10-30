import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const { fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading the file...");

    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusText("Error: Failed to convert PDF to image");

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image");

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) return setStatusText("Error: Failed to analyze resume");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-gray-100">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          {/* Headline */}
          <h1 className="text-gradient">Smart feedback for your dream job</h1>

          {/* Processing or Intro Text */}
          {isProcessing ? (
            <>
              <h2 className="text-2xl font-semibold text-white drop-shadow-lg">
                {statusText}
              </h2>
              <img
                src="/images/resume-scan.gif"
                className="w-full max-w-xl mx-auto mt-4"
                alt="Processing resume"
              />
            </>
          ) : (
            <h2 className="text-2xl font-bold text-white drop-shadow-md mt-4">
              Drop your resume for an ATS score and improvement tips
            </h2>
          )}

          {/* Upload Form */}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 mt-10 bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-2xl mx-auto border border-white/10"
            >
              {/* Input Fields */}
              <div className="form-div">
                <label
                  htmlFor="company-name"
                  className="text-gray-200 font-semibold"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Enter company name"
                  id="company-name"
                  className="bg-white/10 text-white placeholder-gray-400 rounded-xl p-4 w-full border border-white/20 focus:ring-2 focus:ring-indigo-400 transition-all backdrop-blur-sm"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title" className="text-gray-200 font-semibold">
                  Job Title
                </label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Enter job title"
                  id="job-title"
                  className="bg-white/10 text-white placeholder-gray-400 rounded-xl p-4 w-full border border-white/20 focus:ring-2 focus:ring-indigo-400 transition-all backdrop-blur-sm"
                />
              </div>

              <div className="form-div">
                <label
                  htmlFor="job-description"
                  className="text-gray-200 font-semibold"
                >
                  Job Description
                </label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Paste job description or key skills"
                  id="job-description"
                  className="bg-white/10 text-white placeholder-gray-400 rounded-xl p-4 w-full border border-white/20 focus:ring-2 focus:ring-indigo-400 transition-all backdrop-blur-sm"
                />
              </div>

              {/* File Uploader */}
              <div className="form-div">
                <label htmlFor="uploader" className="text-gray-200 font-semibold">
                  Upload Resume
                </label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              {/* Analyze Button */}
              <button
                type="submit"
                className="primary-button bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 shadow-lg hover:shadow-indigo-500/40 text-lg font-semibold rounded-full py-3 transition-all"
              >
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
