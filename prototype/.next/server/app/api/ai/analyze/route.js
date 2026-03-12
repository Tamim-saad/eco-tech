"use strict";(()=>{var e={};e.id=233,e.ids=[233],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2783:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>y,patchFetch:()=>f,requestAsyncStorage:()=>m,routeModule:()=>u,serverHooks:()=>g,staticGenerationAsyncStorage:()=>p});var i={};a.r(i),a.d(i,{GET:()=>d,POST:()=>c});var r=a(9303),n=a(8716),o=a(3131),s=a(7070),l=a(4837);async function c(e){try{let t=await e.formData(),a=t.get("image"),i=t.get("reportType")||"general";if(!a)return s.NextResponse.json({error:"No image provided"},{status:400});if(!["image/jpeg","image/png","image/webp","image/gif"].includes(a.type))return s.NextResponse.json({error:"Invalid image type. Supported: JPEG, PNG, WebP, GIF"},{status:400});if(a.size>10485760)return s.NextResponse.json({error:"Image too large. Maximum size: 10MB"},{status:400});let r=await a.arrayBuffer(),n=Buffer.from(r).toString("base64"),o=await (0,l.UL)(n,a.type,i);return s.NextResponse.json({success:!0,data:{...o,filename:a.name,filesize:a.size,mimeType:a.type,analyzedAt:new Date().toISOString()}})}catch(e){return console.error("Image analysis error:",e),s.NextResponse.json({error:e instanceof Error?e.message:"Analysis failed"},{status:500})}}async function d(){return s.NextResponse.json({error:"Method not allowed. Use POST with multipart/form-data."},{status:405})}let u=new r.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/ai/analyze/route",pathname:"/api/ai/analyze",filename:"route",bundlePath:"app/api/ai/analyze/route"},resolvedPagePath:"E:\\Downloads\\Competition\\eco-tech\\prototype\\src\\app\\api\\ai\\analyze\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:m,staticGenerationAsyncStorage:p,serverHooks:g}=u,y="/api/ai/analyze/route";function f(){return(0,o.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:p})}},4837:(e,t,a)=>{a.d(t,{F_:()=>l,UL:()=>s,lr:()=>c});var i=a(1258);let r=new i.$D(process.env.GEMINI_API_KEY||""),n=[{category:i.OA.HARM_CATEGORY_HARASSMENT,threshold:i.MN.BLOCK_MEDIUM_AND_ABOVE},{category:i.OA.HARM_CATEGORY_HATE_SPEECH,threshold:i.MN.BLOCK_MEDIUM_AND_ABOVE},{category:i.OA.HARM_CATEGORY_SEXUALLY_EXPLICIT,threshold:i.MN.BLOCK_MEDIUM_AND_ABOVE},{category:i.OA.HARM_CATEGORY_DANGEROUS_CONTENT,threshold:i.MN.BLOCK_MEDIUM_AND_ABOVE}],o=`You are NodiWatch AI, an expert environmental monitoring assistant specialized in Bangladesh's river ecosystem crisis. You serve the people of Bangladesh with Islamic values, recognizing that protecting Allah's creation (Amana) is part of our faith.

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

Respond with Islamic values and environmental stewardship (Khalifa concept). When greeting, use "Assalamu-'Alaikum". When analyzing images, identify pollution indicators (color, turbidity, thermal plumes), encroachment evidence (structures, land filling), or erosion signs (bank retreat, sediment patterns). End responses with "JazakAllah khair" (May Allah reward you with good) when appropriate.`;async function s(e,t,a){let i=r.getGenerativeModel({model:"gemini-2.5-flash",safetySettings:n}),o={pollution:`Analyze this image for river pollution indicators. Look for:
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
}`};try{let r;let n=await i.generateContent([{text:o[a]},{inlineData:{mimeType:t,data:e}}]),s=(await n.response).text(),l=s.match(/```json\s*([\s\S]*?)\s*```/)||s.match(/\{[\s\S]*\}/);try{r=JSON.parse(l?l[1]||l[0]:s)}catch{r={analysis:s,severity:"medium",confidence:.7,detectedIssues:["Analysis completed - see detailed response"],recommendations:["Review findings and verify on-site"]}}return{analysis:r.analysis||s,severity:r.severity||"medium",confidence:r.confidence||.7,detectedIssues:r.detectedIssues||[],recommendations:r.recommendations||[]}}catch(e){throw console.error("Gemini image analysis error:",e),Error("Failed to analyze image. Please try again.")}}async function l(e,t=[],a){let i=r.getGenerativeModel({model:"gemini-2.5-flash",safetySettings:n,systemInstruction:o});try{let r=t.filter(e=>e.content&&e.content.trim().length>0).map(e=>({role:e.role,parts:[{text:e.content}]})),n=i.startChat({history:r.length>0?r:void 0,generationConfig:{maxOutputTokens:1500,temperature:.7}}),o=a?`[NAVIGATION CONTEXT]
${a}

[USER QUESTION]
${e}`:e,s=await n.sendMessage(o);return(await s.response).text()}catch(e){throw console.error("Gemini chat error:",e),Error("Failed to get AI response. Please try again.")}}async function c(e){let t=r.getGenerativeModel({model:"gemini-2.5-flash",safetySettings:n}),a=`Generate a formal environmental evidence report summary for legal/enforcement purposes:

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

Use formal language appropriate for regulatory submission.`;try{let e=await t.generateContent(a);return(await e.response).text()}catch(e){throw console.error("Gemini report generation error:",e),Error("Failed to generate report summary.")}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),i=t.X(0,[948,434],()=>a(2783));module.exports=i})();