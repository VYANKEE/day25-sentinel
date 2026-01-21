# 🛡️ Sentinel - Enterprise System Health Dashboard

> **Day 26 of 45 Days Coding Challenge**


## 🚀 Live Demo
- **Frontend Dashboard:** [https://day25-sentinel.vercel.app/](https://day25-sentinel.vercel.app/)
- **Backend Telemetry API:** `https://day25-sentinel.onrender.com/metrics`

---

## 💡 Why I Built This? (The Problem)
In modern backend development, **"Observability"** is often an afterthought. Beginners deploy Node.js servers and "hope" they stay running. But in production, servers crash due to:
- **Silent Memory Leaks:** Variables causing Heap memory to grow until the server runs out of RAM.
- **CPU Spikes:** Heavy computational tasks blocking the single-threaded Event Loop.
- **Zombie Processes:** Services that are "running" but not responding.

I built **Sentinel** to solve the "Flying Blind" problem. It provides a real-time, graphical window into the server's internal health without needing expensive enterprise tools like Datadog or New Relic.

---

## ⚙️ Architecture & How It Works
Sentinel follows a **Client-Server Telemetry Architecture**:

1.  **The Backend (Node.js/Express):**
    - Uses the native `os` and `process` modules to harvest low-level system data directly from the kernel.
    - Exposes a lightweight JSON stream via the `/metrics` endpoint.


2.  **The Frontend (React + Vite):**
    - Polls the telemetry stream every 2 seconds.
    - Uses **Recharts** to visualize time-series data (CPU Load vs. Memory RSS).
    - Designed with **Tailwind CSS** using a glassmorphism/bento-grid aesthetic for a premium developer experience.

---

## ✨ Key Features
- **Real-Time Visualization:** Live graphs tracking CPU Load Averages and Memory usage (RSS/Heap).
- **Leak Detection:** Monitors physical RAM usage to spot potential memory leaks early.
- **Stress Testing Mode:** Built-in button to trigger a heavy computational load on the server to visualize how the system handles pressure.
- **Zero-Config:** No database required; it pulls data straight from the runtime environment.
- **Enterprise UI:** Fully responsive, dark-mode "SaaS" aesthetic.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons.
- **Backend:** Node.js, Express.js, Native OS Module.
- **Deployment:** Vercel (Frontend), Render (Backend).

---

## 💻 How to Run Locally

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/sentinel.git](https://github.com/your-username/sentinel.git)
cd sentinel
