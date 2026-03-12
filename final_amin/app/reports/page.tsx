'use client'

import { FileText, Download, Calendar, Filter, TrendingUp, AlertTriangle, Building2, Scale } from 'lucide-react'

export default function ReportsPage() {
  const reportTypes = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Pollution Attribution Report',
      description: 'Factory-specific pollution probability with time-stamped satellite evidence. Includes NDTI trends, spectral signatures, and legal compliance section.',
      format: 'PDF, 12-18 pages',
      audience: 'DoE, Environmental Courts',
      color: 'purple'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Encroachment Evidence Package',
      description: '2016 vs 2026 boundary comparison with area calculations, GIS shapefiles, and encroacher identification. Court-admissible format.',
      format: 'PDF + GeoJSON, 8-12 pages',
      audience: 'NRCC, Land Courts',
      color: 'yellow'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Erosion Risk Assessment',
      description: '5-year erosion forecast with population displacement estimates, infrastructure risk maps, and mitigation cost-benefit analysis.',
      format: 'PDF, 15-20 pages',
      audience: 'BWDB, Disaster Management',
      color: 'orange'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Comprehensive River Health',
      description: 'Multi-threat assessment combining pollution, encroachment, and erosion metrics. Stakeholder-specific recommendations for all agencies.',
      format: 'PDF, 25-35 pages',
      audience: 'Ministry, Development Partners',
      color: 'teal'
    },
  ]

  const sampleReports = [
    {
      title: 'Buriganga River Pollution Report',
      date: 'January 2026',
      type: 'Pollution Attribution',
      status: 'Legal Action Taken',
      findings: '87 factories identified, 23 with ETP non-compliance',
      outcome: '12 factories fined BDT 45 crore, 3 temporarily closed'
    },
    {
      title: 'Turag Encroachment Case Study',
      date: 'December 2025',
      type: 'Encroachment Evidence',
      status: 'Court Proceedings',
      findings: '124 illegal structures, 2,400 ha river area lost',
      outcome: 'NRCC demolition order for 67 structures (ongoing)'
    },
    {
      title: 'Padma Erosion Hotspot Analysis',
      date: 'November 2025',
      type: 'Erosion Risk Assessment',
      findings: '15-45 m/year erosion rate, 12,000 families at risk',
      outcome: 'BWDB allocated BDT 120 crore for bank protection'
    },
    {
      title: 'Dhaka Rivers Comprehensive Assessment',
      date: 'October 2025',
      type: 'River Health Report',
      findings: 'Multi-threat analysis: 68% pollution, 40% encroachment',
      outcome: 'High Court directive for coordinated cleanup (2026-2030)'
    },
  ]

  const reportFeatures = [
    'Time-stamped satellite imagery (2016-2026)',
    'AI-generated pollution source probability',
    'GIS shapefiles for legal proceedings',
    'Spectral analysis graphs (NDTI, MNDWI)',
    'Factory compliance status (ETP, permits)',
    'Area & volume calculations (encroachment)',
    'Erosion rate & displacement forecasts',
    'Cost-benefit analysis for mitigation',
    'Stakeholder-specific recommendations',
    'Legal reference framework (citations)',
    'Multilingual support (Bengali, English)',
    'Export formats (PDF, GeoJSON, shapefile)'
  ]

  const stakeholders = [
    {
      name: 'Department of Environment (DoE)',
      reports: 'Pollution Attribution, Factory Compliance',
      usage: 'Legal action against polluters, ETP monitoring'
    },
    {
      name: 'NRCC (National River Conservation)',
      reports: 'Encroachment Evidence, River Health',
      usage: 'Eviction operations, river restoration planning'
    },
    {
      name: 'BWDB (Water Development Board)',
      reports: 'Erosion Risk Assessment, Infrastructure Impact',
      usage: 'Bank protection prioritization, flood forecasting'
    },
    {
      name: 'Environmental Courts',
      reports: 'All types with legal compliance section',
      usage: 'Evidence evaluation, injunction decisions'
    },
    {
      name: 'Green Banking Initiative',
      reports: 'Factory Pollution Attribution',
      usage: 'Loan compliance for industries, CSR targeting'
    },
    {
      name: 'Development Partners (World Bank, ADB)',
      reports: 'Comprehensive River Health',
      usage: 'Investment prioritization, impact assessment'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            Evidence Generation & Reporting
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Automated <span className="text-gradient">Report Generation</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Generate court-ready evidence packages, compliance reports, and risk assessments for 
            environmental enforcement agencies, legal proceedings, and policy planning.
          </p>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {reportTypes.map((report, idx) => (
            <div key={idx} className="glass-card p-6 hover:border-teal-500 transition-all">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                report.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                report.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                report.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                'bg-teal-500/20 text-teal-400'
              }`}>
                {report.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{report.title}</h3>
              <p className="text-slate-400 mb-4">{report.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Format: {report.format}</span>
                <span className="text-teal-400">{report.audience}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sample Reports */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Recent Reports</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 glass-card hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Generate New
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {sampleReports.map((report, idx) => (
              <div key={idx} className="glass-card p-6 hover:border-teal-500 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{report.title}</h3>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                        {report.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {report.type}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 glass-card hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Key Findings</p>
                    <p className="text-sm text-slate-300">{report.findings}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Outcome</p>
                    <p className="text-sm text-slate-300">{report.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Features */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Report Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm">
                  ✓
                </div>
                <p className="text-slate-300 text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stakeholders */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Stakeholder Usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stakeholders.map((stakeholder, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{stakeholder.name}</h3>
                    <p className="text-xs text-slate-500">Reports: {stakeholder.reports}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">{stakeholder.usage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
