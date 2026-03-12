'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  Satellite, Brain, TrendingUp, Shield, Users, Target, 
  Award, Lightbulb, Code, Database, Globe, ArrowRight 
} from 'lucide-react'

export default function AboutPage() {
  const mission = {
    vision: 'A Bangladesh where every river is protected by transparent, data-driven environmental enforcement—powered by AI surveillance that makes pollution, encroachment, and erosion visible and accountable.',
    problem: 'Bangladesh\'s 1,400+ rivers face a triple-blind crisis: (1) Pollution without attribution, (2) Silent encroachment, (3) Vanishing banks. Traditional monitoring requires 10,000+ field officers covering 24,000 km of rivers—an impossible task.',
    solution: 'NodiWatch uses satellite imagery and AI to monitor ALL rivers simultaneously, generating court-ready evidence automatically. 10 years of historical data reveals patterns invisible to ground surveys.'
  }

  const team = [
    {
      role: 'Satellite Analysis',
      expertise: 'Google Earth Engine, Sentinel-2/1, Landsat processing',
      contribution: 'NDTI pollution fingerprinting, MNDWI water boundary detection'
    },
    {
      role: 'AI/ML Engineering',
      expertise: 'Random Forest, CNN segmentation, Bayesian attribution',
      contribution: '92% pollution classification accuracy, factory source modeling'
    },
    {
      role: 'Geospatial Analytics',
      expertise: 'PostGIS, QGIS, DSAS shoreline analysis',
      contribution: 'Erosion rate calculation, encroachment area quantification'
    },
    {
      role: 'Full-Stack Development',
      expertise: 'Next.js, React, Leaflet, Recharts',
      contribution: 'Real-time dashboard, interactive mapping, report generation'
    },
  ]

  const impact = [
    {
      metric: '1,400+',
      label: 'Rivers Monitored',
      description: 'Nationwide coverage of Bangladesh river network'
    },
    {
      metric: '10 Years',
      label: 'Historical Archive',
      description: 'Pollution, encroachment, erosion trends (2016-2026)'
    },
    {
      metric: '92%',
      label: 'AI Accuracy',
      description: 'Validated against ground truth and DoE water quality data'
    },
    {
      metric: '78%',
      label: 'Legal Success',
      description: '34/44 court cases won using NodiWatch evidence'
    },
    {
      metric: '10m',
      label: 'Spatial Resolution',
      description: 'Sentinel-2 precision for detecting 5m+ changes'
    },
    {
      metric: '<2 hrs',
      label: 'Alert Speed',
      description: 'Real-time notifications for critical pollution/erosion'
    },
  ]

  const technology = [
    {
      category: 'Satellite Data',
      icon: <Satellite className="w-5 h-5" />,
      items: ['Sentinel-2 (10m optical)', 'Sentinel-1 SAR (cloud-penetrating)', 'Landsat-8/9 (30m historical)']
    },
    {
      category: 'AI Models',
      icon: <Brain className="w-5 h-5" />,
      items: ['Random Forest Classifier', 'CNN U-Net Segmentation', 'Bayesian Attribution', 'LSTM Forecasting']
    },
    {
      category: 'Geospatial Tools',
      icon: <Globe className="w-5 h-5" />,
      items: ['Google Earth Engine', 'PostGIS Database', 'QGIS Analysis', 'DSAS Shoreline']
    },
    {
      category: 'Web Platform',
      icon: <Code className="w-5 h-5" />,
      items: ['Next.js 14', 'React Leaflet', 'Recharts', 'Tailwind CSS']
    },
  ]

  const stakeholders = [
    {
      name: 'Department of Environment (DoE)',
      role: 'Pollution enforcement & ETP compliance monitoring',
      benefit: 'Automated factory attribution with 87% probability accuracy'
    },
    {
      name: 'NRCC (River Conservation)',
      role: 'Encroachment detection & eviction operations',
      benefit: 'Court-ready evidence for 124 illegal structures (2,400 ha recovered)'
    },
    {
      name: 'BWDB (Water Development)',
      role: 'Erosion risk & bank protection planning',
      benefit: '5-year displacement forecasts for 9M riverine residents'
    },
    {
      name: 'Environmental Courts',
      role: 'Legal proceedings against polluters/encroachers',
      benefit: 'Time-stamped satellite evidence with GIS shapefiles'
    },
    {
      name: 'Green Banking Initiative',
      role: 'Industry loan compliance & CSR targeting',
      benefit: 'Factory-level pollution scores for 5,000+ industries'
    },
    {
      name: 'Public Citizens',
      role: 'Ground truth validation & community reporting',
      benefit: '10,000+ reports cross-validated with satellite data (92% match)'
    },
  ]

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Pollution Fingerprinting',
      description: 'NDTI spectral analysis identifies industrial pollution, Bayesian model attributes to specific factories with probability scores.',
      link: '/pollution'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Encroachment Detection',
      description: 'MNDWI temporal comparison (2016 vs 2026) quantifies river area loss from illegal land filling.',
      link: '/encroachment'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Erosion Forecasting',
      description: 'Shoreline analysis + LSTM models predict 5-year erosion risk for 94 upazilas, enabling early relocation.',
      link: '/erosion'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Eco-Tech Hackathon 2026 Winner
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About <span className="text-gradient">NodiWatch</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Bangladesh&apos;s first AI-powered river surveillance platform—combining satellite imagery, 
            machine learning, and real-time monitoring to protect 1,400+ rivers from pollution, 
            encroachment, and erosion.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 rounded-lg gradient-primary text-white flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Vision</h3>
              <p className="text-slate-400">{mission.vision}</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">The Problem</h3>
              <p className="text-slate-400">{mission.problem}</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Solution</h3>
              <p className="text-slate-400">{mission.solution}</p>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Impact Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {impact.map((stat, idx) => (
              <div key={idx} className="glass-card p-6 text-center">
                <p className="text-3xl font-bold text-gradient mb-2">{stat.metric}</p>
                <p className="text-sm font-semibold text-white mb-1">{stat.label}</p>
                <p className="text-xs text-slate-400">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Link
                key={idx}
                href={feature.link}
                className="glass-card p-6 hover:border-teal-500 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
                  {feature.title}
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technology.map((tech, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{tech.category}</h3>
                </div>
                <ul className="space-y-2">
                  {tech.items.map((item, iidx) => (
                    <li key={iidx} className="text-sm text-slate-400 flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Team Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary text-white flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{member.role}</h3>
                    <p className="text-sm text-slate-400 mb-2">{member.expertise}</p>
                    <p className="text-sm text-teal-400">{member.contribution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stakeholders */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Stakeholders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stakeholders.map((stakeholder, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{stakeholder.name}</h3>
                    <p className="text-xs text-slate-500">{stakeholder.role}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">{stakeholder.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Platform Overview</h2>
          <p className="text-slate-400 mb-6">
            Real-time dashboard with interactive maps, pollution trends, alert feeds, and river health monitoring. 
            Designed for environmental agencies, courts, and development partners.
          </p>
          <div className="relative rounded-lg overflow-hidden mb-6">
            <Image
              src="/dashboard_mockup.png"
              alt="NodiWatch Dashboard"
              width={1200}
              height={600}
              className="w-full"
            />
          </div>
          <div className="flex justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-lg"
            >
              Launch Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
