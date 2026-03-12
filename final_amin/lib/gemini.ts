import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Analyze a satellite image for pollution, erosion, or encroachment
 * @param imageData Base64 encoded image data
 * @param analysisType Type of analysis to perform
 * @returns AI-generated analysis results
 */
export async function analyzeSatelliteImage(
  imageData: string,
  analysisType: "pollution" | "erosion" | "encroachment" = "pollution"
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompts = {
    pollution: `Analyze this satellite image for water pollution indicators:
    - Identify pollution type (textile dye, tannery waste, thermal discharge, chemical)
    - Estimate severity level (Low/Medium/High/Critical)
    - Detect spectral anomalies (unusual colors, turbidity)
    - Estimate affected water area in square meters
    - Provide actionable recommendations for authorities
    
    Format your response as JSON with these fields:
    {
      "pollutionType": string,
      "severity": string,
      "confidence": number (0-100),
      "affectedArea": string,
      "spectralIndicators": string[],
      "recommendations": string[]
    }`,

    erosion: `Analyze this satellite image for riverbank erosion:
    - Identify visible erosion patterns
    - Estimate erosion rate indicators
    - Detect land-water boundary changes
    - Identify at-risk infrastructure (buildings, roads)
    - Provide risk assessment
    
    Format your response as JSON with these fields:
    {
      "erosionLevel": string,
      "visibleDamage": string[],
      "estimatedRetreatRate": string,
      "infrastructureAtRisk": string[],
      "riskAssessment": string,
      "recommendations": string[]
    }`,

    encroachment: `Analyze this satellite image for river encroachment:
    - Identify unauthorized structures on riverbanks
    - Detect changes in river width
    - Identify fill material or land grabbing indicators
    - Estimate encroached area
    - Provide evidence quality assessment
    
    Format your response as JSON with these fields:
    {
      "encroachmentDetected": boolean,
      "structures": string[],
      "riverWidthChange": string,
      "encroachingArea": string,
      "evidenceQuality": string,
      "recommendations": string[]
    }`,
  };

  const prompt = prompts[analysisType];

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageData,
        mimeType: "image/jpeg",
      },
    },
  ]);

  const response = await result.response;
  const text = response.text();

  try {
    // Try to parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { rawResponse: text };
  } catch (error) {
    return { rawResponse: text };
  }
}

/**
 * Compare two satellite images (before/after) to detect changes
 * @param image1 Base64 encoded first image (e.g., 2016)
 * @param image2 Base64 encoded second image (e.g., 2026)
 * @param comparisonType Type of comparison
 * @returns Change detection analysis
 */
export async function compareImages(
  image1: string,
  image2: string,
  comparisonType: "pollution" | "erosion" | "encroachment" = "encroachment"
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompts = {
    pollution: `Compare these two satellite images (before and after) to detect pollution changes:
    - Identify new pollution sources
    - Measure pollution spread increase/decrease
    - Detect color changes in water bodies
    - Quantify overall deterioration or improvement
    
    Provide analysis as JSON:
    {
      "overallChange": string,
      "pollutionIncrease": string,
      "newSources": string[],
      "improvements": string[],
      "quantitativeChange": string
    }`,

    erosion: `Compare these two satellite images (before and after) to measure erosion:
    - Calculate approximate land loss in meters
    - Identify most severely affected areas
    - Detect new erosion corridors
    - Estimate infrastructure impact
    
    Provide analysis as JSON:
    {
      "landLost": string,
      "erosionRate": string,
      "criticalZones": string[],
      "infrastructureImpact": string,
      "futureProjection": string
    }`,

    encroachment: `Compare these two satellite images (before and after) to detect river encroachment:
    - Measure river width reduction percentage
    - Identify new structures built on riverbanks
    - Detect fill material placement
    - Calculate lost river area
    
    Provide analysis as JSON:
    {
      "widthReduction": string,
      "newStructures": string[],
      "areaLost": string,
      "encroachmentType": string,
      "legalEvidence": string
    }`,
  };

  const prompt = prompts[comparisonType];

  const result = await model.generateContent([
    "First image (earlier date):",
    {
      inlineData: {
        data: image1,
        mimeType: "image/jpeg",
      },
    },
    "Second image (later date):",
    {
      inlineData: {
        data: image2,
        mimeType: "image/jpeg",
      },
    },
    prompt,
  ]);

  const response = await result.response;
  const text = response.text();

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { rawResponse: text };
  } catch (error) {
    return { rawResponse: text };
  }
}

/**
 * Detect pollution sources and generate factory attribution
 * @param imageData Base64 encoded satellite image
 * @returns Factory detection and pollution attribution
 */
export async function detectPollutionSources(imageData: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `Analyze this satellite image for pollution sources and industrial facilities:
  - Detect factory buildings and industrial structures
  - Identify effluent discharge points
  - Estimate pollution plume directions
  - Suggest probable industry type (textile, tannery, chemical)
  - Provide bounding box coordinates for detected sources (normalized 0-1000)
  
  Format response as JSON:
  {
    "sources": [
      {
        "type": string,
        "confidence": number,
        "location": string,
        "box_2d": [ymin, xmin, ymax, xmax],
        "pollutionType": string
      }
    ],
    "overallAssessment": string
  }`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageData,
        mimeType: "image/jpeg",
      },
    },
  ]);

  const response = await result.response;
  const text = response.text();

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { rawResponse: text };
  } catch (error) {
    return { rawResponse: text };
  }
}

/**
 * Generate a court-ready evidence report from analysis
 * @param analysisData Analysis results from previous functions
 * @param metadata Additional metadata (location, date, etc.)
 * @returns Formatted evidence report
 */
export async function generateEvidenceReport(
  analysisData: any,
  metadata: { location: string; date: string; type: string }
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Generate a court-ready evidence report based on this satellite imagery analysis:
  
  Analysis Data: ${JSON.stringify(analysisData)}
  Location: ${metadata.location}
  Date: ${metadata.date}
  Violation Type: ${metadata.type}
  
  Format the report with these sections:
  1. Executive Summary
  2. Technical Findings
  3. Evidence Quality Assessment
  4. Legal Implications
  5. Recommended Actions
  
  Use formal legal language suitable for environmental court proceedings in Bangladesh.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}
