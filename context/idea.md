
Problem Statement *
(Briefly describe the problem your solution addresses in 50 words)
Bangladesh's river ecosystem faces a "triple-blind" crisis.

 (1) The Accountability Gap: While pollution is visible, the specific source is often untraceable among clustered factories, preventing legal action.

 (2) The Silent Encroachment: Illegal land filling ("Nodi Dokhol") is slow and incremental, often undetected until the river flow is permanently altered. Current manual inspections are reactive, dangerous for inspectors, and lack the temporal data required for court evidence.

 (3) The Vanishing Banks: Riverbank erosion ("Nodi Vangon") silently swallows ~10,000 hectares of land every year, displacing over 1 million people annually across ~94 upazilas. The erosion is geographically widespread, climate-accelerated, and nearly impossible to monitor in real-time through traditional field surveys.


Propose Solution *
Outline your idea , its unique features in 120 words

"NodiWatch" is an AI-powered satellite surveillance system for Bangladesh that combines pollution fingerprinting, river encroachment ("nodi dokhol"), and riverbank erosion ("nodi vangon") detection. Using 10 years of Sentinel‑2, Sentinel-1 SAR, and Landsat imagery processed in the cloud, it 

(1) flags pollution hotspots as color‑coded risk zones, 

(2) classifies likely polluter type—textile dyeing, tannery, or thermal discharge—via multispectral indices and pattern recognition, 

(3) detects encroachment by comparing historical water boundaries with current shorelines,

(4) detects and predicts riverbank erosion hotspots using SAR imagery and AI segmentation — providing early warning before a bank collapses,

(5) assigns probability scores to nearby industries using proximity and signature matching.
The platform produces triple heatmaps (pollution severity, encroachment severity, and erosion risk) and exports evidence reports to help DoE, BWDB, and local land authorities prioritize inspections and restoration. It supports a web dashboard, alerts for sudden spikes, and citizen photo validation for ground truth.


Target Beneficiaries *
Primary: Dept. of Environment (DoE), National River Conservation Commission (NRCC), Bangladesh Water Development Board (BWDB).
Secondary: Banks & Financial Institutions (To automate "Green Banking" due diligence—denying loans to flagged polluters).
Legal Bodies: Environmental Courts (providing admissible time-series evidence).
Disaster Management: DDM & UNDP Bangladesh (using erosion risk maps for preemptive evacuation and resettlement planning).


Expected impact *
Dual Enforcement: Simultaneously catch polluters and land grabbers using one platform.
Historical Evidence: 10-year comparison provides legal-grade proof of river narrowing for court cases.
Predictive Alerts: Probability scoring helps authorities inspect high-risk factories first, saving resources.
Flood Prevention: Identifying encroached sections guides riverbank restoration projects to reduce urban flooding.
Erosion Early Warning: Satellite-based erosion risk maps alert authorities before ~10,000 hectares are lost annually — protecting ~1 million displaced people per year and reducing the $500 million annual economic loss from "Nodi Vangon."
Climate Resilience: Erosion is projected to increase 13% by 2050 due to climate change — NodiWatch provides the real-time intelligence infrastructure needed to adapt.


Outline the Challenges of your idea *
Historical Data Gaps: Cloud-free images from 10 years ago may be limited for some river segments (mitigated by using Sentinel-1 SAR which works through clouds).

Mixed Signals: When multiple industries cluster (e.g., Hazaribagh has both tanneries and dyeing units), separating individual contributions is difficult without ground validation.

Legal Complexity: Satellite evidence of encroachment needs calibration with land records to stand in court.

Dynamic Changes: Flash floods or dredging activities can legitimately alter river width, requiring context-aware algorithms to avoid false positives.

Erosion vs. Natural Deposition: Rivers in Bangladesh naturally deposit and erode sediment seasonally — distinguishing harmful erosion from natural sedimentation cycles requires careful model training.


Outline Technical Features of your project *

1. Temporal Analysis Engine: Compares Sentinel-2 imagery (2016 vs. 2026) to detect changes in river surface area—shrinkage indicates "nodi dokhol."

2. Spectral Fingerprinting Module: Calculates NDTI (turbidity), thermal anomalies (power plants), and custom color ratios (textile dyes) to classify pollution types.

3. Probabilistic Attribution System: For each hotspot, the system queries OpenStreetMap/industry databases within a 500m radius, then assigns likelihood scores (e.g., "Textile Mill A: 78% probability, Tannery B: 22%").

4. Erosion Detection & Prediction Engine: Uses Sentinel-1 SAR time-series data (12-day revisit cycle) processed in Google Earth Engine to detect riverbank retreat — unaffected by monsoon cloud cover. An AI segmentation model (fine-tuned on Bangladesh river data) identifies eroded land and predicts high-risk erosion corridors.

5. Triple Heatmap Visualization: Interactive web dashboard showing pollution intensity (red = severe), encroachment severity (yellow = high fill-up), and erosion risk (orange = high erosion probability) overlaid on a live map.

6. Alert System: Automated notifications when pollution spikes above thresholds, encroachment exceeds 10% of baseline river width, or erosion rate crosses a critical threshold.


Outline the use of Artificial Intelligence in your idea *

We deploy a three-layer AI approach:

(1) Image Segmentation CNN (or fine-tuned SAM — Segment Anything Model) identifies water pixels and tracks river boundary changes over time — used for both "nodi dokhol" and "nodi vangon" detection. The model is trained on historical Google Earth imagery (2003–2025) with annotated erosion events, achieving ~86% mean IoU accuracy.

(2) Random Forest Classifier learns spectral signatures—training on labeled samples where textile effluent shows high Red/Blue ratios, tanneries show high turbidity + organic signals, and thermal pollution shows temperature spikes.

(3) Erosion Prediction Model: Uses ML integrated with Sentinel-2 spectral indices and Sentinel-1 SAR backscatter within GEE to identify and predict erosion hotspots. SVM and ANN models are also used to model the probability of riverbank collapse over future seasons.

The AI auto-generates industry-type predictions, then a Bayesian probability model weighs distance + pollution pattern to rank nearby factories by likelihood of being the source. This transforms raw satellite data into actionable intelligence for enforcement teams.



Technology/ Platform Used *
Google Earth Engine (Multi-year Satellite Data Processing — Sentinel-2, Sentinel-1 SAR, Landsat) , Python + TensorFlow/Scikit-learn (AI Models) , OpenStreetMap API (Industry Geolocation) , PostGIS (Geospatial Database for Historical Comparison), React/NextJs (Web Dashboard)


Current Stage of Your Idea *
Early Prototype
Create your own Google Form
Does this form look suspicious? Report


