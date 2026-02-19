
Problem Statement *
(Briefly describe the problem your solution addresses in 50 words)
Bangladesh's river ecosystem faces a "double-blind" crisis.

 (1) The Accountability Gap: While pollution is visible, the specific source is often untraceable among clustered factories, preventing legal action.

 (2) The Silent Encroachment: Illegal land filling ("Nodi Dokhol") is slow and incremental, often undetected until the river flow is permanently altered. Current manual inspections are reactive, dangerous for inspectors, and lack the temporal data required for court evidence.


Propose Solution *
Outline your idea , its unique features in 120 words

“NodiWatch” is an AI-powered satellite surveillance system for Bangladesh that combines pollution fingerprinting with river encroachment (“nodi dokhol”) detection. Using 10 years of Sentinel‑2 and Landsat imagery processed in the cloud, it 

(1) flags pollution hotspots as color‑coded risk zones, 

(2) classifies likely polluter type—textile dyeing, tannery, or thermal discharge—via multispectral indices and pattern recognition, 

(3) detects encroachment by comparing historical water boundaries with current shorelines,

(4) assigns probability scores to nearby industries using proximity and signature matching.
The platform produces dual heatmaps (pollution severity and encroachment severity) and exports evidence reports to help DoE and local land authorities prioritize inspections and restoration. It supports a web dashboard, alerts for sudden spikes, and citizen photo validation for ground truth.



Target Beneficiaries *
Primary: Dept. of Environment (DoE), National River Conservation Commission (NRCC).
Secondary: Banks & Financial Institutions (To automate "Green Banking" due diligence—denying loans to flagged polluters).
Legal Bodies: Environmental Courts (providing admissible time-series evidence).


Expected impact *
Dual Enforcement: Simultaneously catch polluters and land grabbers using one platform.
Historical Evidence: 10-year comparison provides legal-grade proof of river narrowing for court cases.
Predictive Alerts: Probability scoring helps authorities inspect high-risk factories first, saving resources.
Flood Prevention: Identifying encroached sections guides riverbank restoration projects to reduce urban flooding.


Outline the Challenges of your idea *
Historical Data Gaps: Cloud-free images from 10 years ago may be limited for some river segments.

Mixed Signals: When multiple industries cluster (e.g., Hazaribagh has both tanneries and dyeing units), separating individual contributions is difficult without ground validation.
Legal Complexity: Satellite evidence of encroachment needs calibration with land records to stand in court.

Dynamic Changes: Flash floods or dredging activities can legitimately alter river width, requiring context-aware algorithms to avoid false positives


Outline Technical Features of your project *

Temporal Analysis Engine: Compares Sentinel-2 imagery (2016 vs. 2026) to detect changes in river surface area—shrinkage indicates “nodi dokhol.”

2.Spectral Fingerprinting Module: Calculates NDTI (turbidity), thermal anomalies (power plants), and custom color ratios (textile dyes) to classify pollution types.[sciencedirect +1]
3.Probabilistic Attribution System: For each hotspot, the system queries OpenStreetMap/industry databases within a 500m radius, then assigns likelihood scores (e.g., “Textile Mill A: 78% probability, Tannery B: 22%”)

4.Dual Heatmap Visualization: Interactive web dashboard showing pollution intensity (red = severe) overlayed with encroachment severity (yellow = high fill-up).
5.Alert System: Automated notifications when pollution spikes above thresholds or when encroachment exceeds 10% of baseline river width.


Outline the use of Artificial Intelligence in your idea *

We deploy a two-layer AI approach:
 (1) Image Segmentation CNN identifies water pixels and tracks river boundary changes over time (for “nodi dokhol” detection), and 
(2) Random Forest Classifier learns spectral signatures—training on labeled samples where textile effluent shows high Red/Blue ratios, tanneries show high turbidity + organic signals, and thermal pollution shows temperature spikes. 
The AI auto-generates industry-type predictions, then a Bayesian probability model weighs distance + pollution pattern to rank nearby factories by likelihood of being the source. This transforms raw satellite data into actionable intelligence for enforcement teams.



Technology/ Platform Used *
Google Earth Engine (Multi-year Satellite Data Processing) , Python + TensorFlow/Scikit-learn (AI Models) , OpenStreetMap API (Industry Geolocation)  ,PostGIS (Geospatial Database for Historical Comparison), React/NextJs


Current Stage of Your Idea *
Early Prototype
Create your own Google Form
Does this form look suspicious? Report


