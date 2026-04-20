import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { RepoStarData } from '../lib/starMarket';

interface StarPriceChartProps {
  repo: RepoStarData;
}

const StarPriceChart = ({ repo }: StarPriceChartProps) => {
  return (
    <div className="w-full h-[400px] bg-card rounded-xl border p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">{repo.full_name} Star Performance</h3>
          <p className="text-sm text-muted-foreground">Historical 1:1 Star-Price Correlation</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${repo.price.toLocaleString()}</div>
          <div className={`text-sm ${repo.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {repo.change24h >= 0 ? '+' : ''}{repo.change24h.toFixed(2)}% (24h)
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={repo.history}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#888' }}
            minTickGap={30}
          />
          <YAxis 
            hide 
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#888', marginBottom: '4px' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StarPriceChart;
