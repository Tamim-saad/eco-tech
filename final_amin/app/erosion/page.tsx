'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Mountain, Users, Home, TrendingUp, Eye, Waves, MapPin, FileText } from 'lucide-react'

const ErosionMap = dynamic(() => import('@/components/ErosionMap'), {
  ssr: false,
  loading: () => (
    <div className="glass-card overflow-hidden flex items-center justify-center" style={{ height: "550px" }}>
      <p className="text-slate-400">Loading erosion map...</p>
    </div>
  ),
})

export default function ErosionPage() {
  const stats = [
    {
      title: 'Land Lost Annually',
      value: '10K ha',
      color: 'orange',
      icon: <Mountain className="w-5 h-5" />
    },
    {
      title: 'People Displaced',
      value: '1M+',
      color: 'red',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Economic Loss',
      value: '$500M',
      color: 'purple',
      icon: <Home className="w-5 h-5" />
    },
    {
      title: 'Erosion Acceleration',
      value: '+13%',
      color: 'yellow',
      icon: <TrendingUp className="w-5 h-5" />
    }
  ]

  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Shoreline Change Detection',
      description: 'Multi-temporal Sentinel-1 SAR and Sentinel-2 optical imagery tracks riverbank movement with 10m precision. Automated edge detection identifies erosion zones advancing >5 meters/year.'
    },
    {
      icon: <Waves className="w-6 h-6" />,
      title: 'Erosion Rate Modeling',
      description: 'Time-series analysis (2016-2026) calculates annual erosion rates for 1,400+ rivers. Predictive models forecast 2030 erosion hotspots using rainfall, river flow, and soil data.'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Risk Zone Mapping',
      description: '94 upazilas classified by erosion severity (Low/Medium/High/Critical). Population density overlay identifies communities at highest displacement risk for early warning systems.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'BWDB Integration',
      description: 'Integrates with Bangladesh Water Development Board (BWDB) flood forecasting and riverbank protection planning. Provides evidence for $2.1B erosion mitigation infrastructure investment.'
    }
  ]

  const methodology = [
    {
      step: '1',
      title: 'Satellite Data Processing',
      description: 'Sentinel-1 SAR (12-day revisit) and Sentinel-2 optical (5-day) imagery from Google Earth Engine. SAR penetrates cloud cover during monsoon season for year-round monitoring.'
    },
    {
      step: '2',
      title: 'Shoreline Extraction',
      description: 'Water-land boundary detected using MNDWI (optical) and VH polarization (SAR). Automated edge detection with Canny algorithm and morphological smoothing reduces noise.'
    },
    {
      step: '3',
      title: 'Change Quantification',
      description: 'Digital Shoreline Analysis System (DSAS) calculates End Point Rate (EPR) and Linear Regression Rate (LRR) for each river segment. Erosion >10m/year flagged as critical.'
    },
    {
      step: '4',
      title: 'Risk Assessment',
      description: 'Combine erosion rate with population density, infrastructure proximity, and soil type. Machine learning model predicts 5-year displacement risk for 9 million riverine residents.'
    }
  ]

  const impacts = [
    {
      category: 'Human Displacement',
      stat: '1 million+ people',
      description: 'Displaced by riverbank erosion in 94 upazilas (2016-2026)'
    },
    {
      category: 'Agricultural Land',
      stat: '10,000 hectares/year',
      description: 'Fertile farmland lost to Padma, Jamuna, and Brahmaputra erosion'
    },
    {
      category: 'Economic Loss',
      stat: '$500 million annually',
      description: 'Lost productive land, destroyed homes, and infrastructure damage'
    },
    {
      category: 'Climate Acceleration',
      stat: '+13% by 2050',
      description: 'Erosion rate increase due to intensified monsoons and glacial melt'
    },
    {
      category: 'Infrastructure Risk',
      stat: '127 schools',
      description: 'Educational institutions within 500m of critical erosion zones'
    },
    {
      category: 'Internal Migration',
      stat: '200K/year',
      description: 'Climate refugees migrating to Dhaka slums from eroded villages'
    }
  ]

  const solutions = [
    {
      title: 'Early Warning System',
      description: 'SMS alerts to at-risk communities 6 months before predicted critical erosion based on satellite forecasting models.'
    },
    {
      title: 'Relocation Planning',
      description: 'Provide BWDB and local government with population-at-risk maps to plan dignified resettlement before displacement crisis.'
    },
    {
      title: 'Infrastructure Protection',
      description: 'Identify schools, hospitals, and critical infrastructure requiring immediate riverbank hardening or strategic relocation.'
    },
    {
      title: 'Investment Targeting',
      description: 'Direct $2.1B World Bank erosion mitigation fund to highest-impact zones using data-driven risk assessment.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium mb-4">
            <Mountain className="w-4 h-4" />
            Riverbank Erosion Monitoring
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Erosion Early <span className="text-gradient">Warning System</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Protect communities from riverbank erosion using satellite-based forecasting. 10,000 hectares of land 
            vanish annually—displacing over 1 million people. NodiWatch provides 6-month advance warnings for proactive relocation.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card p-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                stat.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                stat.color === 'red' ? 'bg-red-500/20 text-red-400' :
                stat.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Erosion Risk Map */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">SAR-Based Erosion Risk Corridors</h2>
          <p className="text-slate-400 mb-6">
            Real-time erosion monitoring along Jamuna River using Sentinel-1 SAR analysis. 
            Color-coded risk levels show critical zones (red) requiring immediate intervention.
          </p>
          <ErosionMap />
        </div>

        {/* Before/After Comparison */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Erosion Progression: 2016 vs 2026</h2>
          <p className="text-slate-400 mb-6">
            Satellite comparison showing dramatic riverbank retreat along the Padma River. Red overlay indicates 
            land lost to erosion—including entire villages and agricultural fields.
          </p>
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="/erosion_comparison.png"
              alt="Riverbank erosion comparison 2016 vs 2026"
              width={1200}
              height={600}
              className="w-full"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Monitoring Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="glass-card p-6 hover:border-orange-500 transition-all">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
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
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Environmental & Social Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impacts.map((impact, idx) => (
              <div key={idx} className="glass-card p-6">
                <p className="text-3xl font-bold text-gradient mb-2">{impact.stat}</p>
                <p className="text-sm font-semibold text-white mb-2">{impact.category}</p>
                <p className="text-sm text-slate-400">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">NodiWatch Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((solution, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-lg font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{solution.title}</h3>
                  <p className="text-slate-400">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
