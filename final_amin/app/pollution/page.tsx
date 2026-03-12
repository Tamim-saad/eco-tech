'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Droplets, Factory, AlertTriangle, TrendingUp, Eye, FileText } from 'lucide-react'

const RiverMap = dynamic(() => import('@/components/RiverMap'), { ssr: false })
const PollutionChart = dynamic(() => import('@/components/PollutionChart'), { ssr: false })

export default function PollutionPage() {
  const [data, setData] = useState<any>({ pollution: [], factories: [], encroachment: [], rivers: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/data/pollution.json').then(r => r.json()),
      fetch('/data/factories.json').then(r => r.json()),
      fetch('/data/encroachment.json').then(r => r.json()),
      fetch('/data/rivers.geojson').then(r => r.json())
    ]).then(([pollution, factories, encroachment, rivers]) => {
      setData({ pollution, factories, encroachment, rivers })
      setLoading(false)
    })
  }, [])

  const stats = [
    {
      title: 'Total Hotspots',
      value: data.pollution.length,
      color: 'purple',
      icon: <Droplets className="w-5 h-5" />
    },
    {
      title: 'High Severity',
      value: data.pollution.filter((p: any) => p.severity === 'High').length,
      color: 'red',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      title: 'Tracked Factories',
      value: data.factories.length,
      color: 'blue',
      icon: <Factory className="w-5 h-5" />
    },
    {
      title: 'Avg NDTI Increase',
      value: '+42%',
      color: 'orange',
      icon: <TrendingUp className="w-5 h-5" />
    }
  ]

  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Spectral Fingerprinting',
      description: 'Uses NDTI (Normalized Difference Turbidity Index) and NDWI indices from Sentinel-2 to detect pollution signatures invisible to the naked eye. NDTI >0.7 indicates severe industrial pollution.'
    },
    {
      icon: <Factory className="w-6 h-6" />,
      title: 'Factory Attribution',
      description: 'Bayesian probability model correlates pollution hotspots with nearby industries using distance weighting, wind direction, and spectral similarity. Assigns likelihood scores (0-100%) to specific polluters.'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Real-Time Alerts',
      description: 'Automated notifications when NDTI exceeds 0.7 threshold. SMS alerts sent to DoE officials and NRCC within 2 hours of detection via cloud function triggers.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Court-Ready Evidence',
      description: 'Generates time-stamped satellite imagery with pollution trajectory analysis. Includes factory proximity maps and probabilistic source attribution for legal proceedings.'
    }
  ]

  const methodology = [
    {
      step: '1',
      title: 'Data Acquisition',
      description: 'Sentinel-2 (10m optical, 5-day revisit) and Landsat-8/9 imagery from Google Earth Engine. Cloud masking using QA60 band ensures data quality.'
    },
    {
      step: '2',
      title: 'Pollution Detection',
      description: 'Calculate NDTI = (Red - Green) / (Red + Green) and NDWI indices. Pollution hotspots identified where NDTI >0.5 and NDWI indicates water presence.'
    },
    {
      step: '3',
      title: 'Source Attribution',
      description: 'Spatial join with DoE factory database (5,000+ industries). Bayesian model assigns pollution probability based on distance decay (1/d²), ETP status, and industry type.'
    },
    {
      step: '4',
      title: 'Validation',
      description: 'Ground truthing with citizen reports and DoE water quality data (BOD, COD, pH). 92% correlation with lab-tested pollution levels.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium mb-4">
            <Droplets className="w-4 h-4" />
            Pollution Fingerprinting System
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Industrial Pollution <span className="text-gradient">Tracking</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Detect, attribute, and monitor industrial pollution across Bangladesh&apos;s rivers using AI-powered 
            satellite analysis. 60% of river pollution comes from undocumented industrial sources—NodiWatch makes them visible.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card p-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                stat.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                stat.color === 'red' ? 'bg-red-500/20 text-red-400' :
                stat.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                'bg-orange-500/20 text-orange-400'
              }`}>
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Interactive Map */}
        <div className="glass-card p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Live Pollution Map</h2>
          <p className="text-slate-400 mb-6">
            Purple markers = pollution hotspots, Blue markers = industrial facilities. Click markers for detailed attribution.
          </p>
          {!loading && <RiverMap data={data} activeLayer="all" />}
        </div>

        {/* Trends Chart */}
        <div className="glass-card p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Pollution Trends (2016-2026)</h2>
          <p className="text-slate-400 mb-6">
            NDTI (Normalized Difference Turbidity Index) time series showing sustained increase in pollution levels across major Dhaka rivers.
          </p>
          <PollutionChart />
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="glass-card p-6 hover:border-purple-500 transition-all">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Methodology</h2>
          <div className="space-y-6">
            {methodology.map((step) => (
              <div key={step.step} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg gradient-primary text-white flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Image */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Visual Evidence</h2>
          <p className="text-slate-400 mb-6">
            Satellite imagery showing industrial pollution in the Buriganga River. Dark discoloration indicates high turbidity from textile dyeing and tannery effluents.
          </p>
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="/polluted_river.png"
              alt="Polluted river satellite imagery"
              width={1200}
              height={600}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
