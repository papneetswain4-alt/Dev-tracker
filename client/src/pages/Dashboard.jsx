import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [logs, setLogs] = useState([]);
  const [hours, setHours] = useState(0);
  const [problems, setProblems] = useState(0);
  const navigate = useNavigate();

  // ================= FETCH LOGS =================
  const fetchLogs = async () => {
    try {
      const res = await API.get("/logs");
      setLogs(res.data);
    } catch (err) {
      alert("Session expired. Login again.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // ================= ADD TODAY LOG =================
  const addTodayLog = async () => {
    try {
      await API.post("/logs", {
        hours: Number(hours),
        problems: Number(problems)
      });

      setHours(0);
      setProblems(0);
      fetchLogs();
    } catch (err) {
      alert("Error adding log");
    }
  };

  // ================= TOTALS =================
  const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);
  const totalProblems = logs.reduce((sum, log) => sum + log.problems, 0);

  // ================= STREAK =================
  const calculateStreak = () => {
    if (logs.length === 0) return 0;

    const sortedLogs = [...logs].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < sortedLogs.length; i++) {
      const logDate = new Date(sortedLogs[i].date);
      const diff =
        (currentDate - logDate) / (1000 * 60 * 60 * 24);

      if (Math.floor(diff) === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  // ================= PRODUCTIVITY SCORE =================
  const productivityScore =
    totalHours * 5 +
    totalProblems * 3 +
    calculateStreak() * 10;

  // ================= CHART DATA =================
  const chartData = logs.map((log) => ({
    date: log.date,
    hours: log.hours,
    problems: log.problems
  }));

  // ================= FULL YEAR HEATMAP =================
  const generateFullYearData = () => {
    const days = [];
    const today = new Date();
    const start = new Date(today);
    start.setFullYear(today.getFullYear() - 1);

    const firstDayOfWeek = start.getDay();

    // Add empty cells before first date
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ empty: true });
    }

    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      const dateCopy = new Date(d);
      const formatted = dateCopy.toISOString().split("T")[0];

      const log = logs.find((l) => l.date === formatted);

      days.push({
        date: formatted,
        hours: log ? log.hours : 0
      });
    }

    return days;
  };

  const heatmapData = generateFullYearData();

  const totalContributions = heatmapData.reduce(
    (sum, day) => sum + (day.hours || 0),
    0
  );

  // ================= RETURN =================
  return (
    <div className="dashboard">

      {/* Navbar */}
      <div className="navbar">
        <h2>Dev Tracker 🚀</h2>
        <div className="nav-right">
          <span>👤 {user?.name}</span>
          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="card">
          <h3>Total Coding Hours</h3>
          <p>{totalHours}</p>
        </div>

        <div className="card">
          <h3>Total Problems Solved</h3>
          <p>{totalProblems}</p>
        </div>

        <div className="card">
          <h3>🔥 Current Streak</h3>
          <p>{calculateStreak()} days</p>
        </div>

        <div className="card highlight">
          <h3>🧠 Productivity Score</h3>
          <p>{productivityScore}</p>
        </div>
      </div>
    {/* Add Section */}
      <div className="add-section">
        <h2>Add Today’s Progress</h2>

        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <input
          type="number"
          placeholder="Problems"
          value={problems}
          onChange={(e) => setProblems(e.target.value)}
        />

        <button onClick={addTodayLog}>Add</button>
      </div>
      {/* Chart */}
      <div className="chart-section">
        <h2>Weekly Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#30363d" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line
              type="natural"
              dataKey="hours"
              stroke="#00ff99"
              strokeWidth={3}
            />
            <Line
              type="natural"
              dataKey="problems"
              stroke="#ff4d4d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Heatmap */}
      <div className="heatmap-section">
        <h2>
          {totalContributions} contributions in the last year
        </h2>

        <div className="heatmap-wrapper">

          <div className="day-labels">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="heatmap-grid">
            {heatmapData.map((day, index) => {
              if (day.empty) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="heatmap-cell"
                    style={{ backgroundColor: "transparent" }}
                  />
                );
              }

              return (
                <div
                    key={day.date}
                    className="heatmap-cell"
                    style={{
                        backgroundColor:
                        day.hours === 0
                            ? "#21262d"
                            : day.hours < 2
                            ? "#0e4429"
                            : day.hours < 4
                            ? "#006d32"
                            : "#26a641",
                        border: "1px solid #30363d"
                    }}
                    title={`${day.date} - ${day.hours} hrs`}
                />

              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <span>Less</span>
          <div className="legend-box" style={{ background: "#161b22" }} />
          <div className="legend-box" style={{ background: "#0e4429" }} />
          <div className="legend-box" style={{ background: "#006d32" }} />
          <div className="legend-box" style={{ background: "#26a641" }} />
          <span>More</span>
        </div>
      </div>

      

      {/* Logs */}
      <div className="logs">
        <h2>All Logs</h2>
        {logs.map((log) => (
          <div key={log._id} className="log-item">
            {log.date} → {log.hours} hrs | {log.problems} problems
          </div>
        ))}
      </div>

    </div>
  );
}
