const express = require('express');
const cors = require('cors');
const os = require('os');
const process = require('process');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Allows frontend to hit this API

// 1. Root Route
app.get('/', (req, res) => {
    res.send('Server is running. Access endpoints at /health or /metrics');
});

// 2. Health Endpoint
// Purpose: Quick check to see if the server is alive and how long it's been running.
app.get('/health', (req, res) => {
    const uptimeSeconds = process.uptime();
    
    res.json({
        status: 'UP',
        uptime: uptimeSeconds,
        timestamp: new Date().toISOString()
    });
});

// 3. Metrics Endpoint
// Purpose: Deep dive into resource consumption.
app.get('/metrics', (req, res) => {
    // Memory Usage
    const memoryUsage = process.memoryUsage();
    
    // CPU Load (Average over 1, 5, and 15 minutes)
    // Returns an array, we take the 1-minute average for simplicity
    const loadAvg = os.loadavg(); 

    res.json({
        memory: {
            rss: memoryUsage.rss, // Resident Set Size (Total memory allocated)
            heapTotal: memoryUsage.heapTotal, // V8's memory usage
            heapUsed: memoryUsage.heapUsed,
        },
        cpu: {
            loadAverage1Min: loadAvg[0], // 1 minute load average
            coreCount: os.cpus().length
        },
        platform: {
            os: os.type(),
            release: os.release()
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});