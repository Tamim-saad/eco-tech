'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  TrendingUp, TrendingDown, AlertTriangle, Droplets, MapPin,
  Factory, Clock, CheckCircle, User, Calendar
} from 'lucide-react'

// Dynamic imports for client-only components
const RiverMap = dynamic(() => import('@/components/RiverMap'), { ssr: false })
const PollutionChart = dynamic(() => import('@/components/PollutionChart'), { ssr: false })

export default function Dashboard() {
  const [activeLayer, setActiveLayer] = useState<'all' | 'pollution' | 'encroachment' | 'factories'>('all')
  const [data, setData] = useState<any>({
    pollution: [],
    factories: [],
    encroachment: [],
    rivers: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load all data files
    Promise.all([
      fetch('/data/pollution.json').then(r => r.json()),
      fetch('/data/factories.json').then(r => r.json()),
      fetch('/data/encroachment.json').then(r => r.json()),
      fetch('/data/rivers.geojson').then(r => r.json())
    ]).then(([pollution, factories, encroachment, rivers]) => {
      setData({ pollution, factories, encroachment, rivers })
      setLoading(false)
    }).catch(error => {
      console.error('Error loading data:', error)
      setLoading(false)
    })
  }, [])

  // Calculate stats from loaded data
  const stats = [
    {
      title: 'Active Alerts',
      value: data.pollution.filter((p: any) => p.severity === 'High').length + data.encroachment.length,
      change: '+12%',
      trend: 'up',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'red'
    },
    {
      title: 'Pollution Hotspots',
      value: data.pollution.length,
      change: '+8%',
      trend: 'up',
      icon: <Droplets className="w-5 h-5" />,
      color: 'purple'
    },
    {
      title: 'Encroachment Zones',
      value: data.encroachment.length,
      change: '+15%',
      trend: 'up',
      icon: <MapPin className="w-5 h-5" />,
      color: 'yellow'
    },
    {
      title: 'Monitored Factories',
      value: data.factories.length,
      change: 'Stable',
      trend: 'stable',
      icon: <Factory className="w-5 h-5" />,
      color: 'blue'
    },
  ]

  // Recent alerts combining pollution and encroachment
  const recentAlerts = [
    ...data.pollution.filter((p: any) => p.severity === 'High').slice(0, 3).map((p: any) => ({
      id: p.id,
      type: 'Pollution',
      location: p.location,
      severity: p.severity,
      time: '2 hours ago',
      icon: <Droplets className="w-4 h-4" />,
      color: 'red'
    })),
    ...data.encroachment.slice(0, 2).map((e: any) => ({
      id: e.id,
      type: 'Encroachment',
      location: e.location,
      severity: 'High',
      time: '5 hours ago',
      icon: <MapPin className="w-4 h-4" />,
      color: 'yellow'
    }))
  ].slice(0, 5)

  // River health status
  const riverHealth = [
    { name: 'Buriganga', status: 'Critical', score: 25, color: 'red' },
    { name: 'Turag', status: 'Poor', score: 35, color: 'orange' },
    { name: 'Shitalakshya', status: 'Moderate', score: 55, color: 'yellow' },
    { name: 'Balu', status: 'Fair', score: 65, color: 'blue' },
    { name: 'Brahmaputra', status: 'Good', score: 75, color: 'green' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">River Surveillance Dashboard</h1>
            <p className="text-slate-400">Real-time monitoring of Bangladesh&apos;s river ecosystem</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 glass-card">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-slate-300">Live Monitoring</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass-card text-sm text-slate-300">
              <Clock className="w-4 h-4" />
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card p-6 hover:border-teal-500 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'red' ? 'bg-red-500/20 text-red-400' :
                  stat.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                  stat.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {stat.icon}
                </div>
                {stat.trend === 'up' ? (
                  <div className="flex items-center gap-1 text-xs text-red-400">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                ) : stat.trend === 'down' ? (
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <TrendingDown className="w-4 h-4" />
                    {stat.change}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400">{stat.change}</div>
                )}
              </div>
              <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Layer Controls */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Interactive River Map</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveLayer('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeLayer === 'all'
                        ? 'bg-teal-500 text-white'
                        : 'glass-card text-slate-300 hover:text-white'
                    }`}
                  >
                    All Layers
                  </button>
                  <button
                    onClick={() => setActiveLayer('pollution')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeLayer === 'pollution'
                        ? 'bg-purple-500 text-white'
                        : 'glass-card text-slate-300 hover:text-white'
                    }`}
                  >
                    Pollution
                  </button>
                  <button
                    onClick={() => setActiveLayer('encroachment')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeLayer === 'encroachment'
                        ? 'bg-yellow-500 text-white'
                        : 'glass-card text-slate-300 hover:text-white'
                    }`}
                  >
                    Encroachment
                  </button>
                  <button
                    onClick={() => setActiveLayer('factories')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeLayer === 'factories'
                        ? 'bg-blue-500 text-white'
                        : 'glass-card text-slate-300 hover:text-white'
                    }`}
                  >
                    Factories
                  </button>
                </div>
              </div>
              {!loading && <RiverMap data={data} activeLayer={activeLayer} />}
              {loading && (
                <div className="h-96 rounded-lg bg-slate-800/50 animate-pulse flex items-center justify-center">
                  <p className="text-slate-400">Loading map data...</p>
                </div>
              )}
            </div>

            {/* Pollution Trends Chart */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Pollution Trends (2016-2026)</h2>
              <PollutionChart />
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Recent Alerts</h2>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">
                  {recentAlerts.length} Active
                </span>
              </div>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                      alert.color === 'red'
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-yellow-500/10 border-yellow-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        alert.color === 'red'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {alert.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-white">{alert.type}</p>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            alert.severity === 'High'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-1">{alert.location}</p>
                        <p className="text-xs text-slate-500">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* River Health Status */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">River Health Status</h2>
              <div className="space-y-4">
                {riverHealth.map((river, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{river.name}</span>
                      <span className={`text-xs font-semibold ${
                        river.color === 'red' ? 'text-red-400' :
                        river.color === 'orange' ? 'text-orange-400' :
                        river.color === 'yellow' ? 'text-yellow-400' :
                        river.color === 'blue' ? 'text-blue-400' :
                        'text-green-400'
                      }`}>
                        {river.status} ({river.score}/100)
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          river.color === 'red' ? 'bg-red-500' :
                          river.color === 'orange' ? 'bg-orange-500' :
                          river.color === 'yellow' ? 'bg-yellow-500' :
                          river.color === 'blue' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${river.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 gradient-primary text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Generate Weekly Report
                </button>
                <button className="w-full px-4 py-3 glass-card hover:bg-slate-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  Submit Citizen Report
                </button>
                <button className="w-full px-4 py-3 glass-card hover:bg-slate-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  View Resolved Cases
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
