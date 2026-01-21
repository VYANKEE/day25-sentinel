import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Activity, Server, Cpu, Database, ArrowRight, 
  CheckCircle, Zap, Shield, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';

// --- SUB-COMPONENTS ---

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bento-card p-6 rounded-2xl hover:border-zinc-600 transition-colors"
  >
    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="dashboard-panel p-5 rounded-xl">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{title}</h4>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-bold text-white font-[JetBrains Mono]">{value}</span>
        </div>
      </div>
      <div className={`p-2 rounded-lg bg-zinc-900 ${color}`}>
        <Icon size={18} />
      </div>
    </div>
    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '60%' }}
        className={`h-full ${color.replace('text-', 'bg-')}`} 
      />
    </div>
    <p className="text-xs text-zinc-500 mt-2">{subtext}</p>
  </div>
);

// --- MAIN APPLICATION ---

export default function App() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- IMPORTANT: LIVE BACKEND URL LINKED HERE ---
  const API_URL = 'https://day25-sentinel.onrender.com'; 

  // Fetch Data Logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using the live API_URL instead of localhost
        const healthRes = await axios.get(`${API_URL}/health`);
        const metricsRes = await axios.get(`${API_URL}/metrics`);
        
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        const cpuLoad = metricsRes.data.cpu.loadAverage1Min;
        const memUsed = (metricsRes.data.memory.rss / 1024 / 1024).toFixed(0);

        setMetrics({ health: healthRes.data, data: metricsRes.data, cpuLoad, memUsed });
        
        setHistory(prev => {
          const newHistory = [...prev, { name: timestamp, cpu: cpuLoad, memory: memUsed }];
          return newHistory.slice(-20); // Keep last 20 points
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Backend offline or CORS error");
        setLoading(false);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const triggerStress = async () => {
    try {
      alert("⚠️ Initiating Stress Test: CPU will spike for 5 seconds!");
      await axios.get(`${API_URL}/stress-test`);
    } catch (error) {
      console.error(error);
      alert("Error connecting to stress test endpoint");
    }
  };

  const formatUptime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen bg-[#09090b]">
      
      {/* 1. NAVBAR */}
      <nav className="glass-nav fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Sentinel</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#dashboard" className="text-blue-400">Live Demo</a>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            v2.0 Now Available for Enterprise
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
            Infrastructure monitoring <br />
            <span className="text-zinc-500">reimagined for developers.</span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sentinel provides real-time visibility into your Node.js backend. 
            Track uptime, memory leaks, and CPU spikes with zero configuration.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#dashboard" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all flex items-center gap-2">
              View Live Metrics <ArrowRight size={18} />
            </a>
            <button className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-all">
              Read Documentation
            </button>
          </div>
        </motion.div>
      </section>

      {/* 3. WHY THIS MATTERS (Bento Grid) */}
      <section id="features" className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Monitoring is Critical</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Without observability, you are flying blind. Sentinel exposes the internal health 
              of your applications before customers report downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Zap}
              title="Real-time Latency" 
              desc="Detect slow endpoints instantly. CPU load averages allow you to scale horizontally before traffic spikes crash your server."
              delay={0.1}
            />
            <FeatureCard 
              icon={Shield}
              title="Memory Leak Detection" 
              desc="Node.js processes can consume heap memory silently. Track RSS usage over time to identify leaks early."
              delay={0.2}
            />
            <FeatureCard 
              icon={CheckCircle}
              title="99.9% Uptime SLA" 
              desc="Automated health checks ensure your load balancer only routes traffic to healthy instances."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURE (How it Works) */}
      <section id="architecture" className="py-24 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-900/20 text-blue-400 text-xs font-semibold mb-6">
              ARCHITECTURE
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">How Sentinel Works</h2>
            
            <div className="space-y-8">
              {[
                { title: 'Data Collection', desc: 'Node.js `os` and `process` modules harvest raw system metrics directly from the kernel.' },
                { title: 'API Exposure', desc: 'Express.js exposes a lightweight JSON endpoint `/metrics` that acts as the telemetry stream.' },
                { title: 'Visualization', desc: 'React polls this stream, parsing raw bytes into human-readable graphs and alerts.' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono text-sm text-zinc-300">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{step.title}</h4>
                    <p className="text-zinc-400 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 font-mono text-sm text-zinc-400">
            <div className="flex gap-2 mb-4 border-b border-zinc-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              <span className="ml-2 text-zinc-500">server.js</span>
            </div>
            <p><span className="text-purple-400">const</span> <span className="text-blue-400">metrics</span> = <span className="text-yellow-300">await</span> process.getMetrics();</p>
            <p className="mt-2"><span className="text-purple-400">app</span>.get(<span className="text-green-400">'/telemetry'</span>, (req, res) ={'{'}</p>
            <p className="pl-4">res.json({'{'}</p>
            <p className="pl-8 text-blue-300">cpu: <span className="text-orange-300">metrics.loadAvg</span>,</p>
            <p className="pl-8 text-blue-300">memory: <span className="text-orange-300">metrics.heapUsed</span>,</p>
            <p className="pl-8 text-blue-300">uptime: <span className="text-orange-300">process.uptime()</span></p>
            <p className="pl-4">{'}'});</p>
            <p>{'}'});</p>
          </div>
        </div>
      </section>

      {/* 5. LIVE DASHBOARD (The Product) */}
      <section id="dashboard" className="py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Live Instance Metrics</h2>
              <p className="text-zinc-400 text-sm mt-1">
                Stream from: <span className="font-mono text-blue-400">{API_URL}</span>
              </p>
            </div>
            <div className="flex gap-4">
               {/* Stress Test Button Included */}
               <button 
                  onClick={triggerStress}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Zap size={14} /> TRIGGER LOAD
                </button>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  CONNECTED
                </div>
            </div>
          </div>

          {loading ? (
            <div className="h-64 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-500">
              Connecting to Server...
            </div>
          ) : (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
              {/* Top Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StatCard 
                  title="Status" 
                  value={metrics?.health?.status} 
                  subtext="System Operational"
                  icon={Shield} 
                  color="text-emerald-400"
                />
                <StatCard 
                  title="CPU Load" 
                  value={`${metrics?.cpuLoad.toFixed(2)}%`} 
                  subtext="1-min Average"
                  icon={Cpu} 
                  color="text-blue-400"
                />
                <StatCard 
                  title="Memory RSS" 
                  value={`${metrics?.memUsed} MB`} 
                  subtext="Physical RAM Used"
                  icon={Database} 
                  color="text-purple-400"
                />
                <StatCard 
                  title="Uptime" 
                  value={formatUptime(metrics?.health?.uptime)} 
                  subtext="Since last restart"
                  icon={Server} 
                  color="text-orange-400"
                />
              </div>

              {/* Chart Area */}
              <div className="h-[300px] w-full dashboard-panel rounded-xl p-4">
                 <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                       <BarChart3 size={16} /> Resource Utilization Trend
                    </h4>
                 </div>
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history}>
                      <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="name" hide />
                      <YAxis hide domain={[0, 'auto']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} fill="url(#colorCpu)" />
                      <Area type="monotone" dataKey="memory" stroke="#a855f7" strokeWidth={2} fill="transparent" />
                    </AreaChart>
                  </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-12 border-t border-zinc-900 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <Activity size={16} className="text-zinc-500" />
             <span className="text-zinc-500 font-semibold">Sentinel</span>
          </div>
          <p className="text-zinc-600 text-sm">© 2026 Sentinel Inc. Built for Enterprise.</p>
        </div>
      </footer>
    </div>
  );
}