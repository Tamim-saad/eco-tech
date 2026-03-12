"use strict";(()=>{var e={};e.id=76,e.ids=[76],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9016:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>f,requestAsyncStorage:()=>m,routeModule:()=>u,serverHooks:()=>h,staticGenerationAsyncStorage:()=>p});var a={};r.r(a),r.d(a,{GET:()=>d,POST:()=>c});var i=r(9303),n=r(8716),o=r(3131),s=r(7070),l=r(4837);async function c(e){try{let{message:t,history:r=[],pageContext:a=""}=await e.json();if(!t||"string"!=typeof t)return s.NextResponse.json({error:"Message is required"},{status:400});if(t.length>2e3)return s.NextResponse.json({error:"Message too long. Maximum: 2000 characters"},{status:400});let i=r.slice(-10),n=await (0,l.F_)(t,i,a);return s.NextResponse.json({success:!0,data:{message:n,timestamp:new Date().toISOString()}})}catch(e){return console.error("Chat API error:",e),s.NextResponse.json({error:e instanceof Error?e.message:"Chat failed"},{status:500})}}async function d(){return s.NextResponse.json({error:"Method not allowed. Use POST with JSON body."},{status:405})}let u=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/ai/chat/route",pathname:"/api/ai/chat",filename:"route",bundlePath:"app/api/ai/chat/route"},resolvedPagePath:"E:\\Downloads\\Competition\\eco-tech\\prototype\\src\\app\\api\\ai\\chat\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:m,staticGenerationAsyncStorage:p,serverHooks:h}=u,g="/api/ai/chat/route";function f(){return(0,o.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:p})}},4837:(e,t,r)=>{r.d(t,{F_:()=>l,UL:()=>s,lr:()=>c});var a=r(1258);let i=new a.$D(process.env.GEMINI_API_KEY||""),n=[{category:a.OA.HARM_CATEGORY_HARASSMENT,threshold:a.MN.BLOCK_MEDIUM_AND_ABOVE},{category:a.OA.HARM_CATEGORY_HATE_SPEECH,threshold:a.MN.BLOCK_MEDIUM_AND_ABOVE},{category:a.OA.HARM_CATEGORY_SEXUALLY_EXPLICIT,threshold:a.MN.BLOCK_MEDIUM_AND_ABOVE},{category:a.OA.HARM_CATEGORY_DANGEROUS_CONTENT,threshold:a.MN.BLOCK_MEDIUM_AND_ABOVE}],o=`You are NodiWatch AI, an expert environmental monitoring assistant specialized in Bangladesh's river ecosystem crisis. You serve the people of Bangladesh with Islamic values, recognizing that protecting Allah's creation (Amana) is part of our faith.

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

Respond with Islamic values and environmental stewardship (Khalifa concept). When greeting, use "Assalamu-'Alaikum". When analyzing images, identify pollution indicators (color, turbidity, thermal plumes), encroachment evidence (structures, land filling), or erosion signs (bank retreat, sediment patterns). End responses with "JazakAllah khair" (May Allah reward you with good) when appropriate.`;async function s(e,t,r){let a=i.getGenerativeModel({model:"gemini-2.5-flash",safetySettings:n}),o={pollution:`Analyze this image for river pollution indicators. Look for:
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
}`};try{let i;let n=await a.generateContent([{text:o[r]},{inlineData:{mimeType:t,data:e}}]),s=(await n.response).text(),l=s.match(/```json\s*([\s\S]*?)\s*```/)||s.match(/\{[\s\S]*\}/);try{i=JSON.parse(l?l[1]||l[0]:s)}catch{i={analysis:s,severity:"medium",confidence:.7,detectedIssues:["Analysis completed - see detailed response"],recommendations:["Review findings and verify on-site"]}}return{analysis:i.analysis||s,severity:i.severity||"medium",confidence:i.confidence||.7,detectedIssues:i.detectedIssues||[],recommendations:i.recommendations||[]}}catch(e){throw console.error("Gemini image analysis error:",e),Error("Failed to analyze image. Please try again.")}}async function l(e,t=[],r){let a=i.getGenerativeModel({model:"gemini-2.5-flash",safetySettings:n,systemInstruction:o});try{let i=t.filter(e=>e.content&&e.content.trim().length>0).map(e=>({role:e.role,parts:[{text:e.content}]})),n=a.startChat({history:i.length>0?i:void 0,generationConfig:{maxOutputTokens:1500,temperature:.7}}),o=r?`[NAVIGATION CONTEXT]
${r}

[USER QUESTION]
${e}`:e,s=await n.sendMessage(o);return(await s.response).text()}catch(e){throw console.error("Gemini chat error:",e),Error("Failed to get AI response. Please try again.")}}async function c(e){let t=i.getGenerativeModel({model:"gemini-2.5-flash",safetySettings:n}),r=`Generate a formal environmental evidence report summary for legal/enforcement purposes:

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

Use formal language appropriate for regulatory submission.`;try{let e=await t.generateContent(r);return(await e.response).text()}catch(e){throw console.error("Gemini report generation error:",e),Error("Failed to generate report summary.")}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[948,434],()=>r(9016));module.exports=a})();