"use client";

import { useState } from "react";
import { Upload, Loader2, CheckCircle, AlertCircle, Image as ImageIcon } from "lucide-react";

interface AIAnalyzerProps {
  analysisType?: "pollution" | "erosion" | "encroachment";
  title?: string;
  description?: string;
}

export default function AIAnalyzer({
  analysisType = "pollution",
  title = "AI-Powered Satellite Analysis",
  description = "Upload a satellite image for intelligent analysis using Gemini AI",
}: AIAnalyzerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setError(null);
      setResult(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setAnalyzing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(",")[1];

        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "analyze",
            imageData: base64Data,
            analysisType,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Analysis failed");
        }

        setResult(data.data);
        setAnalyzing(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (err: any) {
      setError(err.message || "Failed to analyze image");
      setAnalyzing(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-teal-500 transition-all bg-slate-800/30"
        >
          {preview ? (
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImageIcon className="w-12 h-12 text-slate-400 mb-4" />
              <p className="text-sm text-slate-400 mb-2">
                Click to upload satellite image
              </p>
              <p className="text-xs text-slate-500">
                JPEG, PNG or WebP (max 10MB)
              </p>
            </div>
          )}
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
          />
        </label>
      </div>

      {/* Analyze Button */}
      {selectedFile && (
        <button
          onClick={analyzeImage}
          disabled={analyzing}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            analyzing
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
        >
          {analyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing with Gemini AI...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Analyze Image
            </>
          )}
        </button>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-400">Analysis Error</p>
            <p className="text-sm text-red-300 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !analyzing && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Analysis Complete</span>
          </div>

          {/* Display results based on analysis type */}
          {analysisType === "pollution" && result.pollutionType && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Pollution Type</p>
                  <p className="text-lg font-bold text-white">
                    {result.pollutionType}
                  </p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Severity</p>
                  <p
                    className={`text-lg font-bold ${
                      result.severity === "Critical"
                        ? "text-red-400"
                        : result.severity === "High"
                        ? "text-orange-400"
                        : result.severity === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {result.severity}
                  </p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Confidence</p>
                  <p className="text-lg font-bold text-white">
                    {result.confidence}%
                  </p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Affected Area</p>
                  <p className="text-lg font-bold text-white">
                    {result.affectedArea}
                  </p>
                </div>
              </div>

              {result.spectralIndicators && (
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Spectral Indicators
                  </p>
                  <ul className="space-y-1">
                    {result.spectralIndicators.map((indicator: string, i: number) => (
                      <li key={i} className="text-sm text-slate-400">
                        • {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.recommendations && (
                <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                  <p className="text-sm font-medium text-teal-400 mb-2">
                    AI Recommendations
                  </p>
                  <ul className="space-y-1">
                    {result.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="text-sm text-slate-300">
                        • {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Raw response fallback */}
          {result.rawResponse && !result.pollutionType && (
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-sm font-medium text-white mb-2">AI Analysis</p>
              <p className="text-sm text-slate-400 whitespace-pre-wrap">
                {result.rawResponse}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
