"use strict";(()=>{var e={};e.id=75,e.ids=[75],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7826:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>h,requestAsyncStorage:()=>u,routeModule:()=>d,serverHooks:()=>p,staticGenerationAsyncStorage:()=>m});var i={};r.r(i),r.d(i,{POST:()=>c});var n=r(9303),o=r(8716),a=r(3131),s=r(7070),l=r(4837);async function c(e){try{let{type:t,location:r,date:i,analysis:n,severity:o,detectedIssues:a}=await e.json();if(!t||!r||!n)return s.NextResponse.json({error:"Missing required fields: type, location, analysis"},{status:400});let c=await (0,l.lr)({type:t,location:r,date:i||new Date().toISOString(),analysis:n,severity:o||"medium",detectedIssues:a||[]});return s.NextResponse.json({success:!0,data:{summary:c,generatedAt:new Date().toISOString()}})}catch(e){return console.error("Report generation error:",e),s.NextResponse.json({error:e instanceof Error?e.message:"Report generation failed"},{status:500})}}let d=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/ai/report/route",pathname:"/api/ai/report",filename:"route",bundlePath:"app/api/ai/report/route"},resolvedPagePath:"E:\\Downloads\\Competition\\eco-tech\\prototype\\src\\app\\api\\ai\\report\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:u,staticGenerationAsyncStorage:m,serverHooks:p}=d,g="/api/ai/report/route";function h(){return(0,a.patchFetch)({serverHooks:p,staticGenerationAsyncStorage:m})}},4837:(e,t,r)=>{r.d(t,{F_:()=>l,UL:()=>s,lr:()=>c});var i=r(1258);let n=new i.$D(process.env.GEMINI_API_KEY||""),o=[{category:i.OA.HARM_CATEGORY_HARASSMENT,threshold:i.MN.BLOCK_MEDIUM_AND_ABOVE},{category:i.OA.HARM_CATEGORY_HATE_SPEECH,threshold:i.MN.BLOCK_MEDIUM_AND_ABOVE},{category:i.OA.HARM_CATEGORY_SEXUALLY_EXPLICIT,threshold:i.MN.BLOCK_MEDIUM_AND_ABOVE},{category:i.OA.HARM_CATEGORY_DANGEROUS_CONTENT,threshold:i.MN.BLOCK_MEDIUM_AND_ABOVE}],a=`You are NodiWatch AI, an expert environmental monitoring assistant specialized in Bangladesh's river ecosystem crisis. You serve the people of Bangladesh with Islamic values, recognizing that protecting Allah's creation (Amana) is part of our faith.

You help analyze:

1. **নদী দূষণ (River Pollution)**: Industrial effluent detection, spectral analysis (NDTI, CDOM indices), pollution source attribution, factory compliance tracking

2. **নদী দখল (River Encroachment)**: Illegal land filling detection, riverbank boundary changes, 2016-2026 comparisons, area loss calculations

3. **নদী ভাঙন (Riverbank Erosion)**: SAR-based erosion tracking, retreat rate calculation, risk zone identification, population displacement estimates

Key Statistics:
- 60% of Bangladesh's rivers are severely polluted
- 40% of Dhaka's riverbanks are illegally occupied
- ~10,000 hectares lost annually to erosion ($500M economic loss)
- 1M+ people displaced by erosion each year

Technical Stack:
- Sentinel-2 (10m optical), Sentinel-1 SAR, Landsat 8/9 (30m)
- Google Earth Engine for processing
- Random Forest for pollution classification
- CNN for water segmentation
- Bayesian models for factory attribution

Respond with Islamic values and environmental stewardship (Khalifa concept). When greeting, use "Assalamu-'Alaikum". When analyzing images, identify pollution indicators (color, turbidity, thermal plumes), encroachment evidence (structures, land filling), or erosion signs (bank retreat, sediment patterns). End responses with "JazakAllah khair" (May Allah reward you with good) when appropriate.`;async function s(e,t,r){let i=n.getGenerativeModel({model:"gemini-2.5-flash",safetySettings:o}),a={pollution:`Analyze this image for river pollution indicators. Look for:
- Water discoloration (red/brown from tanneries, blue/purple from textile dyes, grey from industrial effluent)
- Turbidity levels and suspended particles
- Surface foam or oil slicks
- Thermal discharge plumes
- Visible waste or debris

Provide a JSON response with:
{
  "analysis": "Detailed description of observed pollution",
  "severity": "low|medium|high|critical",
  "confidence": 0.0-1.0,
  "pollutionType": "textile|tannery|thermal|chemical|sewage|mixed",
  "detectedIssues": ["issue1", "issue2"],
  "spectralIndicators": "Description of color/spectral evidence",
  "recommendations": ["action1", "action2"]
}`,encroachment:`Analyze this image for river encroachment indicators. Look for:
- Structures built on riverbank or floodplain
- Land filling or sand deposition
- Reduced river width compared to natural boundaries
- Construction materials or equipment near water
- Vegetation removal along banks

Provide a JSON response with:
{
  "analysis": "Detailed description of observed encroachment",
  "severity": "low|medium|high|critical",
  "confidence": 0.0-1.0,
  "encroachmentType": "residential|commercial|industrial|agricultural|infrastructure",
  "detectedIssues": ["issue1", "issue2"],
  "estimatedArea": "Description of affected area",
  "recommendations": ["action1", "action2"]
}`,erosion:`Analyze this image for riverbank erosion indicators. Look for:
- Bank undercutting or collapse
- Exposed soil layers or tree roots
- Sediment plumes in water
- Slumped or tilted structures
- Changed waterline position

Provide a JSON response with:
{
  "analysis": "Detailed description of observed erosion",
  "severity": "low|medium|high|critical",
  "confidence": 0.0-1.0,
  "erosionType": "bank_collapse|undercutting|surface_erosion|mass_wasting",
  "detectedIssues": ["issue1", "issue2"],
  "riskAssessment": "Description of potential risks",
  "recommendations": ["action1", "action2"]
}`,general:`Analyze this environmental image related to river monitoring in Bangladesh. Identify any signs of:
- Pollution (water discoloration, effluent discharge)
- Encroachment (illegal construction, land filling)
- Erosion (bank collapse, land loss)

Provide a JSON response with:
{
  "analysis": "Detailed environmental assessment",
  "primaryConcern": "pollution|encroachment|erosion|none",
  "severity": "low|medium|high|critical",
  "confidence": 0.0-1.0,
  "detectedIssues": ["issue1", "issue2"],
  "recommendations": ["action1", "action2"]
}`};try{let n;let o=await i.generateContent([{text:a[r]},{inlineData:{mimeType:t,data:e}}]),s=(await o.response).text(),l=s.match(/```json\s*([\s\S]*?)\s*```/)||s.match(/\{[\s\S]*\}/);try{n=JSON.parse(l?l[1]||l[0]:s)}catch{n={analysis:s,severity:"medium",confidence:.7,detectedIssues:["Analysis completed - see detailed response"],recommendations:["Review findings and verify on-site"]}}return{analysis:n.analysis||s,severity:n.severity||"medium",confidence:n.confidence||.7,detectedIssues:n.detectedIssues||[],recommendations:n.recommendations||[]}}catch(e){throw console.error("Gemini image analysis error:",e),Error("Failed to analyze image. Please try again.")}}async function l(e,t=[],r){let i=n.getGenerativeModel({model:"gemini-2.5-flash",safetySettings:o,systemInstruction:a});try{let n=t.filter(e=>e.content&&e.content.trim().length>0).map(e=>({role:e.role,parts:[{text:e.content}]})),o=i.startChat({history:n.length>0?n:void 0,generationConfig:{maxOutputTokens:1500,temperature:.7}}),a=r?`[NAVIGATION CONTEXT]
${r}

[USER QUESTION]
${e}`:e,s=await o.sendMessage(a);return(await s.response).text()}catch(e){throw console.error("Gemini chat error:",e),Error("Failed to get AI response. Please try again.")}}async function c(e){let t=n.getGenerativeModel({model:"gemini-2.5-flash",safetySettings:o}),r=`Generate a formal environmental evidence report summary for legal/enforcement purposes:

Report Type: ${e.type}
Location: ${e.location}
Date: ${e.date}
AI Analysis: ${e.analysis}
Severity Level: ${e.severity}
Detected Issues: ${e.detectedIssues.join(", ")}

Create a professional summary suitable for submission to Bangladesh's Department of Environment (DoE) or National River Conservation Commission (NRCC). Include:
1. Executive summary (2-3 sentences)
2. Key findings
3. Recommended enforcement actions
4. Supporting satellite data references

Use formal language appropriate for regulatory submission.`;try{let e=await t.generateContent(r);return(await e.response).text()}catch(e){throw console.error("Gemini report generation error:",e),Error("Failed to generate report summary.")}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[948,434],()=>r(7826));module.exports=i})();