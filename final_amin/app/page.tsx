'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, Satellite, Brain, TrendingUp, Shield, MapPin, AlertTriangle,
  Factory, LandPlot, Mountain, Building2, Scale, Globe, Users, Cpu, Database, MonitorPlay
} from 'lucide-react'

export default function Home() {
  // Real stats from Bangladesh environmental research
  const stats = [
    { value: '1,400+', label: 'Rivers to Monitor', change: 'Nationwide coverage' },
    { value: '60%', label: 'Industrial Pollution', change: 'Of Dhaka river pollution' },
    { value: '40%', label: 'Riverbanks Seized', change: 'By land grabbers (Dhaka)' },
    { value: '10K ha', label: 'Land Lost Annually', change: '$500M economic loss' },
  ]

  const threeThreats = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Accountability Gap',
      bengali: 'দূষণ শনাক্তকরণ',
      description: 'While pollution is visible, the specific source is untraceable among clustered factories, preventing legal action. 60% of industrial pollution goes unprosecuted.',
      color: 'red',
      href: '/pollution'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Silent Encroachment',
      bengali: 'নদী দখল',
      description: 'Illegal land filling ("Nodi Dokhol") is slow and incremental, often undetected until river flow is permanently altered. 40% of Dhaka riverbanks are seized.',
      color: 'yellow',
      href: '/encroachment'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Vanishing Banks',
      bengali: 'নদী ভাঙন',
      description: 'Riverbank erosion swallows ~10,000 hectares annually, displacing over 1 million people across 94 upazilas. Climate change accelerates erosion by 13% through 2050.',
      color: 'orange',
      href: '/erosion'
    },
  ]

  const features = [
    {
      icon: <Satellite className="w-8 h-8" />,
      title: 'Satellite Surveillance',
      description: '10 years of Sentinel-2 (10m optical), Sentinel-1 SAR (cloud-penetrating), and Landsat imagery processed in Google Earth Engine',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Analysis',
      description: 'Random Forest classification (92% accuracy) and CNN segmentation for water boundary detection and pollution fingerprinting',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Temporal Analysis',
      description: 'Compare 2016 vs 2026 river boundaries using MNDWI water segmentation to quantify encroachment and erosion over time',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Court-Ready Evidence',
      description: 'Generate legal-grade proof with time-series satellite evidence for environmental courts and NRCC enforcement',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Factory Attribution',
      description: 'Bayesian probability model assigns likelihood scores to nearby industries using spectral signatures and distance weighting',
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: 'Real-Time Alerts',
      description: 'Automated notifications for pollution spikes (NDTI >0.7), encroachment (>10% width loss), and erosion risks',
    },
  ]

  const beneficiaries = [
    { icon: <Building2 className="w-5 h-5" />, name: 'DoE', desc: 'Pollution tracking' },
    { icon: <Globe className="w-5 h-5" />, name: 'NRCC', desc: '1,400+ river monitoring' },
    { icon: <Mountain className="w-5 h-5" />, name: 'BWDB', desc: 'Erosion early warning' },
    { icon: <Scale className="w-5 h-5" />, name: 'Banks', desc: 'Green Banking compliance' },
    { icon: <Scale className="w-5 h-5" />, name: 'Courts', desc: 'Time-series evidence' },
    { icon: <Users className="w-5 h-5" />, name: 'Public', desc: '9M+ citizens at risk' },
  ]

  const techStack = [
    { icon: <Satellite className="w-5 h-5" />, name: 'Sentinel-2', desc: '10m optical, 5-day revisit' },
    { icon: <Satellite className="w-5 h-5" />, name: 'Sentinel-1 SAR', desc: 'Radar, cloud-penetrating' },
    { icon: <Cpu className="w-5 h-5" />, name: 'Google Earth Engine', desc: 'Cloud processing' },
    { icon: <Brain className="w-5 h-5" />, name: 'AI Models', desc: 'CNN + Random Forest' },
    { icon: <Database className="w-5 h-5" />, name: 'PostGIS', desc: 'Geospatial database' },
    { icon: <MonitorPlay className="w-5 h-5" />, name: 'Next.js', desc: 'Web dashboard' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 opacity-30" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Eco-Tech Hackathon 2026 Winner
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Protect Bangladesh&apos;s Rivers with
                <span className="text-gradient block mt-2">AI-Powered Surveillance</span>
              </h1>
              
              <p className="text-xl text-slate-300">
                NodiWatch combines satellite imagery, machine learning, and real-time monitoring 
                to detect <span className="text-red-400 font-semibold">pollution</span>, 
                <span className="text-yellow-400 font-semibold"> illegal encroachment</span>, and 
                <span className="text-orange-400 font-semibold"> riverbank erosion</span> across Bangladesh.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-teal-500/50 hover:scale-105"
                >
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 glass-card hover:bg-slate-800 text-white rounded-lg font-semibold transition-all"
                >
                  Learn More
                </Link>
              </div>

              {/* Beneficiaries */}
              <div>
                <p className="text-sm text-slate-400 mb-3">Trusted by</p>
                <div className="flex flex-wrap gap-3">
                  {beneficiaries.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 glass-card text-sm">
                      <div className="text-teal-400">{b.icon}</div>
                      <div>
                        <span className="font-semibold text-white">{b.name}</span>
                        <span className="text-slate-400 text-xs ml-1">· {b.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl blur-2xl opacity-20"></div>
              <Image
                src="/polluted_river.png"
                alt="Polluted river in Bangladesh"
                width={600}
                height={400}
                className="relative rounded-xl shadow-2xl border border-slate-700"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-danger text-white px-6 py-3 rounded-lg shadow-xl backdrop-blur-sm">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  60% of rivers polluted by industrial waste
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-700 glass-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-gradient mb-2">{stat.value}</p>
                <p className="text-sm text-white font-medium mb-1">{stat.label}</p>
                <p className="text-xs text-slate-400">{stat.change}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Triple-Blind Crisis */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              The <span className="text-red-400">Triple-Blind</span> Crisis
            </h2>
            <p className="text-xl text-slate-300">
              Bangladesh&apos;s river ecosystem faces three interconnected threats that traditional monitoring cannot adequately address.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {threeThreats.map((threat, idx) => (
              <Link
                key={idx}
                href={threat.href}
                className="group glass-card p-6 hover:border-teal-500 transition-all hover:scale-105"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  threat.color === 'red' ? 'bg-red-500/20 text-red-400' :
                  threat.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {threat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  {threat.title}
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-slate-400 mb-3">{threat.bengali}</p>
                <p className="text-slate-300">{threat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">How NodiWatch Works</h2>
            <p className="text-xl text-slate-300">
              Combining cutting-edge AI with satellite surveillance to protect river ecosystems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 hover:border-teal-500 transition-all group"
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 gradient-primary text-white group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Technology Stack</h2>
            <p className="text-slate-400">Powered by industry-leading geospatial and AI technologies</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {techStack.map((tech, i) => (
              <div key={i} className="glass-card p-4 text-center hover:border-teal-500 transition-all">
                <div className="text-teal-400 flex justify-center mb-2">{tech.icon}</div>
                <p className="text-sm font-semibold text-white mb-1">{tech.name}</p>
                <p className="text-xs text-slate-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="gradient-primary rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Explore the Platform?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Access real-time river monitoring, pollution detection, and comprehensive 
                analysis tools to protect Bangladesh&apos;s water resources.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-xl"
                >
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/pollution"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
