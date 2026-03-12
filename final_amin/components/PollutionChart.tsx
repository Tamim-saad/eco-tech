'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function PollutionChart() {
  // Time series data (2016-2026)
  const data = [
    { year: '2016', buriganga: 0.45, turag: 0.38, shitalakshya: 0.32, balu: 0.28 },
    { year: '2017', buriganga: 0.48, turag: 0.41, shitalakshya: 0.35, balu: 0.30 },
    { year: '2018', buriganga: 0.52, turag: 0.44, shitalakshya: 0.37, balu: 0.32 },
    { year: '2019', buriganga: 0.56, turag: 0.47, shitalakshya: 0.40, balu: 0.35 },
    { year: '2020', buriganga: 0.59, turag: 0.50, shitalakshya: 0.43, balu: 0.37 },
    { year: '2021', buriganga: 0.63, turag: 0.53, shitalakshya: 0.46, balu: 0.40 },
    { year: '2022', buriganga: 0.67, turag: 0.56, shitalakshya: 0.49, balu: 0.43 },
    { year: '2023', buriganga: 0.71, turag: 0.60, shitalakshya: 0.52, balu: 0.46 },
    { year: '2024', buriganga: 0.74, turag: 0.63, shitalakshya: 0.55, balu: 0.49 },
    { year: '2025', buriganga: 0.77, turag: 0.66, shitalakshya: 0.58, balu: 0.52 },
    { year: '2026', buriganga: 0.81, turag: 0.69, shitalakshya: 0.61, balu: 0.55 },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-slate-700">
          <p className="text-sm font-semibold text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: NDTI {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="year"
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
            label={{ value: 'NDTI Index', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="buriganga"
            stroke="#ef476f"
            strokeWidth={2}
            name="Buriganga"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="turag"
            stroke="#ffd166"
            strokeWidth={2}
            name="Turag"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="shitalakshya"
            stroke="#06d6a0"
            strokeWidth={2}
            name="Shitalakshya"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="balu"
            stroke="#118ab2"
            strokeWidth={2}
            name="Balu"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
