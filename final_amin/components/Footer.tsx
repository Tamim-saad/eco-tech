'use client'

import Link from 'next/link'
import { Waves, Github, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const links = {
    Platform: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Pollution Tracking', href: '/pollution' },
      { name: 'Encroachment Detection', href: '/encroachment' },
      { name: 'Erosion Monitoring', href: '/erosion' },
    ],
    Resources: [
      { name: 'Analysis', href: '/analysis' },
      { name: 'Reports', href: '/reports' },
      { name: 'About', href: '/about' },
      { name: 'Documentation', href: '#' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Data Usage', href: '#' },
      { name: 'Contact Us', href: '#' },
    ],
  }

  const stakeholders = [
    'Department of Environment (DoE)',
    'National River Conservation Commission (NRCC)',
    'Bangladesh Water Development Board (BWDB)',
    'Ministry of Water Resources',
    'Environmental Courts',
    'Green Banking Initiative',
  ]

  return (
    <footer className="border-t border-slate-700 glass-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">NodiWatch</h2>
                <p className="text-xs text-slate-400">River Surveillance AI</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-4">
              AI-powered satellite surveillance protecting Bangladesh&apos;s 1,400+ rivers from pollution, encroachment, and erosion.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition-all text-slate-400 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@nodiwatch.gov.bd"
                className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition-all text-slate-400 hover:text-white"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition-all text-slate-400 hover:text-white"
                aria-label="Location"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stakeholders */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Key Stakeholders
          </h3>
          <div className="flex flex-wrap gap-3">
            {stakeholders.map((stakeholder) => (
              <span
                key={stakeholder}
                className="px-3 py-1 glass-card text-xs text-slate-400 rounded-full"
              >
                {stakeholder}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} NodiWatch. Built for Eco-Tech Hackathon 2026. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <span>Powered by Sentinel-2, Google Earth Engine & Next.js</span>
            <span className="hidden md:block">•</span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
