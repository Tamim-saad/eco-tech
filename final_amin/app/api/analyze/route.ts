import { NextRequest, NextResponse } from "next/server";
import { analyzeSatelliteImage, compareImages, detectPollutionSources } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, imageData, imageData2, analysisType, comparisonType } = body;

    if (!action) {
      return NextResponse.json(
        { error: "Action type is required" },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case "analyze":
        if (!imageData) {
          return NextResponse.json(
            { error: "Image data is required" },
            { status: 400 }
          );
        }
        result = await analyzeSatelliteImage(imageData, analysisType);
        break;

      case "compare":
        if (!imageData || !imageData2) {
          return NextResponse.json(
            { error: "Two images are required for comparison" },
            { status: 400 }
          );
        }
        result = await compareImages(imageData, imageData2, comparisonType);
        break;

      case "detect-sources":
        if (!imageData) {
          return NextResponse.json(
            { error: "Image data is required" },
            { status: 400 }
          );
        }
        result = await detectPollutionSources(imageData);
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: error.message || "Analysis failed" },
      { status: 500 }
    );
  }
}
