'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { MapPin, LandPlot, TrendingDown, AlertCircle, Eye, Ruler, Clock, FileText } from 'lucide-react'

const RiverMap = dynamic(() => import('@/components/RiverMap'), { ssr: false })

export default function EncroachmentPage() {
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
      title: 'Encroachment Zones',
      value: data.encroachment.length,
      color: 'yellow',
      icon: <MapPin className="w-5 h-5" />
    },
    {
      title: 'Riverbank Seized',
      value: '40%',
      color: 'red',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      title: 'Width Loss Detected',
      value: '25-60m',
      color: 'orange',
      icon: <Ruler className="w-5 h-5" />
    },
    {
      title: 'Total Area Lost',
      value: '2,400 ha',
      color: 'purple',
      icon: <LandPlot className="w-5 h-5" />
    }
  ]

  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'MNDWI Water Detection',
      description: 'Modified Normalized Difference Water Index (MNDWI) from Sentinel-2 bands 3 and 11 detects water boundaries with 95% accuracy. Cloud-free composites ensure consistent monitoring.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Temporal Comparison',
      description: 'Compare 2016 vs 2026 river boundaries to quantify encroachment. Automated change detection flags width loss >10% as critical encroachment requiring legal action.'
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: 'Precision Measurement',
      description: '10m spatial resolution from Sentinel-2 enables precise measurement of river width changes. Sub-pixel analysis detects encroachment as small as 5 meters.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'NRCC Compliance',
      description: 'Generates evidence packages for National River Conservation Commission (NRCC) enforcement. Includes GIS shapefiles, time-stamped imagery, and area calculations.'
    }
  ]

  const methodology = [
    {
      step: '1',
      title: 'Baseline Establishment',
      description: '2016 river boundaries extracted using MNDWI threshold (>0.3 indicates water). Multi-temporal compositing reduces seasonal variation and cloud contamination.'
    },
    {
      step: '2',
      title: 'Current State Mapping',
      description: '2026 boundaries mapped using identical methodology. Sentinel-1 SAR fills gaps during monsoon season when optical imagery is cloud-obscured.'
    },
    {
      step: '3',
      title: 'Change Analysis',
      description: 'Overlay analysis calculates area difference between 2016 and 2026 polygons. Width loss measured at 100m intervals along river centerline for granular statistics.'
    },
    {
      step: '4',
      title: 'Encroachment Flagging',
      description: 'Zones with >10% width loss or >0.5 hectare area loss flagged as critical. Land use classification identifies illegal structures (buildings, land fill) within lost area.'
    }
  ]

  const impacts = [
    '40% of Dhaka riverbanks are illegally seized',
    '2,400 hectares lost in Dhaka division (2016-2026)',
    'River width reduced by 25-60 meters in critical zones',
    'Flood capacity decreased by 18% in affected areas',
    'Groundwater recharge reduced by 12 million cubic meters/year',
    'Navigation routes blocked in 23 river segments'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium mb-4">
            <LandPlot className="w-4 h-4" />
            Nodi Dokhol (নদী দখল) Detection
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Illegal River <span className="text-gradient">Encroachment</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Detect silent land grabs using satellite-based temporal analysis. NodiWatch compares river boundaries 
            across 10 years to identify illegal filling and construction, protecting 1,400+ rivers from encroachment.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card p-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                stat.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                stat.color === 'red' ? 'bg-red-500/20 text-red-400' :
                stat.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                'bg-purple-500/20 text-purple-400'
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
          <h2 className="text-2xl font-bold text-white mb-4">Encroachment Zones Map</h2>
          <p className="text-slate-400 mb-6">
            Yellow markers indicate detected encroachment zones. Click for detailed width loss statistics and temporal imagery.
          </p>
          {!loading && <RiverMap data={data} activeLayer="encroachment" />}
        </div>

        {/* Before/After Comparison */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Temporal Comparison: 2016 vs 2026</h2>
          <p className="text-slate-400 mb-6">
            Side-by-side satellite imagery showing river width reduction due to illegal land filling. 
            Red overlay indicates area lost to encroachment.
          </p>
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="/encroachment_comparison.png"
              alt="River encroachment comparison 2016 vs 2026"
              width={1200}
              height={600}
              className="w-full"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Detection Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="glass-card p-6 hover:border-yellow-500 transition-all">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-4">
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

        {/* Impacts */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Environmental & Economic Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {impacts.map((impact, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <p className="text-slate-300">{impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
