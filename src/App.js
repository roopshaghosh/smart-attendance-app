import React, { useState, useEffect } from 'react';
import './App.css';

// ============================================
// LOGIN COMPONENT
// ============================================
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: email.split('@')[0],
      email: email,
      role: role
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>📚 MY MARK</h1>
        <p className="subtitle">Smart Attendance System</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label>Login as</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button type="submit" className="btn-primary btn-block">
            Login
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Teacher: teacher@test.com / any password</p>
          <p>Student: student@test.com / any password</p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// NAVBAR COMPONENT
// ============================================
function Navbar({ user, onLogout, currentPage, setCurrentPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">📚 MY MARK</h2>
        
        <div className="nav-links">
          <button 
            className={currentPage === 'dashboard' ? 'active' : ''} 
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          
          {user.role === 'teacher' && (
            <>
              <button 
                className={currentPage === 'generate-qr' ? 'active' : ''} 
                onClick={() => setCurrentPage('generate-qr')}
              >
                Generate QR
              </button>
              <button 
                className={currentPage === 'attendance' ? 'active' : ''} 
                onClick={() => setCurrentPage('attendance')}
              >
                Attendance
              </button>
              <button 
                className={currentPage === 'reports' ? 'active' : ''} 
                onClick={() => setCurrentPage('reports')}
              >
                Reports
              </button>
            </>
          )}
          
          {user.role === 'student' && (
            <>
              <button 
                className={currentPage === 'scan-qr' ? 'active' : ''} 
                onClick={() => setCurrentPage('scan-qr')}
              >
                Scan QR
              </button>
              <button 
                className={currentPage === 'my-attendance' ? 'active' : ''} 
                onClick={() => setCurrentPage('my-attendance')}
              >
                My Attendance
              </button>
            </>
          )}
        </div>
        
        <div className="user-section">
          <span className="user-name">{user.name}</span>
          <span className="user-role">({user.role})</span>
          <button onClick={onLogout} className="btn-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
}

// ============================================
// TEACHER DASHBOARD
// ============================================
function TeacherDashboard() {
  return (
    <div className="container">
      <h1>Teacher Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number" style={{color: '#667eea'}}>85</div>
          <div className="stat-label">Total Students</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number" style={{color: '#10b981'}}>92%</div>
          <div className="stat-label">Avg Attendance</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number" style={{color: '#f59e0b'}}>12</div>
          <div className="stat-label">Classes Today</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number" style={{color: '#ef4444'}}>5</div>
          <div className="stat-label">At Risk Students</div>
        </div>
      </div>

      <div className="card" style={{marginTop: '30px'}}>
        <h2>Your Classes</h2>
        <div className="classes-grid">
          <div className="class-card">
            <h3>Data Structures</h3>
            <p className="class-code">CS301</p>
            <p className="class-info">30 Students • 85% Attendance</p>
            <button className="btn-primary">View Details</button>
          </div>
          
          <div className="class-card">
            <h3>Web Development</h3>
            <p className="class-code">CS401</p>
            <p className="class-info">28 Students • 90% Attendance</p>
            <button className="btn-primary">View Details</button>
          </div>
          
          <div className="class-card">
            <h3>Operating System</h3>
            <p className="class-code">CS402</p>
            <p className="class-info">27 Students • 88% Attendance</p>
            <button className="btn-primary">View Details</button>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop: '30px'}}>
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">✅</span>
            <div className="activity-content">
              <p className="activity-title">Attendance marked for CS301</p>
              <p className="activity-time">2 hours ago</p>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">📝</span>
            <div className="activity-content">
              <p className="activity-title">New assignment created for CS401</p>
              <p className="activity-time">5 hours ago</p>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">⚠️</span>
            <div className="activity-content">
              <p className="activity-title">Low attendance alert - 3 students</p>
              <p className="activity-time">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// STUDENT DASHBOARD
// ============================================
function StudentDashboard() {
  return (
    <div className="container">
      <h1>Student Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number" style={{color: '#667eea'}}>5</div>
          <div className="stat-label">Enrolled Classes</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number" style={{color: '#10b981'}}>88%</div>
          <div className="stat-label">My Attendance</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number" style={{color: '#f59e0b'}}>3</div>
          <div className="stat-label">Pending Assignments</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number" style={{color: '#8b5cf6'}}>85%</div>
          <div className="stat-label">Average Score</div>
        </div>
      </div>

      <div className="card" style={{marginTop: '30px'}}>
        <h2>Today's Classes</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Room</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9:00 AM</td>
              <td>Operating System</td>
              <td>Prof. Nilesh Kunhare</td>
              <td>Room 301</td>
              <td><span className="badge badge-success">Present</span></td>
            </tr>
            <tr>
              <td>11:00 AM</td>
              <td>Web Development</td>
              <td>Prof. Rajneesh Kumar Patel</td>
              <td>Lab 2</td>
              <td><span className="badge badge-warning">Upcoming</span></td>
            </tr>
            <tr>
              <td>2:00 PM</td>
              <td>Data Structures </td>
              <td>Prof. Dheeresh Soni</td>
              <td>Room 305</td>
              <td><span className="badge badge-info">Upcoming</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{marginTop: '30px'}}>
        <h2>Pending Assignments</h2>
        <div className="assignments-list">
          <div className="assignment-item">
            <div className="assignment-info">
              <h3>Binary Search Tree Implementation</h3>
              <p>Data Structures • Due: Tomorrow</p>
            </div>
            <button className="btn-primary btn-sm">Submit</button>
          </div>
          <div className="assignment-item">
            <div className="assignment-info">
              <h3>Responsive Web Design Project</h3>
              <p>Web Development • Due: 3 days</p>
            </div>
            <button className="btn-primary btn-sm">Submit</button>
          </div>
          <div className="assignment-item">
            <div className="assignment-info">
              <h3>SQL Query Optimization</h3>
              <p>Database Systems • Due: 5 days</p>
            </div>
            <button className="btn-primary btn-sm">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// GENERATE QR CODE PAGE (TEACHER)
// ============================================
function GenerateQR() {
  const [selectedClass, setSelectedClass] = useState('CS301');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [expiryTime, setExpiryTime] = useState(300); // 5 minutes in seconds

  const generateQR = () => {
    setQrGenerated(true);
    setExpiryTime(300);
    
    // Start countdown
    const interval = setInterval(() => {
      setExpiryTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setQrGenerated(false);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <h1>Generate QR Code</h1>
      
      <div className="card">
        <h2>Select Class</h2>
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          className="select-large"
        >
          <option value="CS301">Data Structures (CS301)</option>
          <option value="CS401">Web Development (CS401)</option>
          <option value="CS402">Database Systems (CS402)</option>
        </select>

        <button 
          onClick={generateQR} 
          className="btn-primary btn-large"
          style={{marginTop: '20px'}}
        >
          📷 Generate QR Code
        </button>

        {qrGenerated && (
          <div className="qr-display">
            <div className="qr-code-placeholder">
              <div className="qr-grid">
                {[...Array(25)].map((_, i) => (
                  <div 
                    key={i} 
                    className="qr-pixel" 
                    style={{
                      background: Math.random() > 0.5 ? '#000' : '#fff'
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="qr-info">
              <p className="qr-class">Class: {selectedClass}</p>
              <p className="qr-timer">
                ⏱️ Expires in: <strong>{formatTime(expiryTime)}</strong>
              </p>
              <p className="qr-instruction">
                Students can scan this QR code to mark attendance
              </p>
            </div>

            <div className="qr-stats">
              <div className="stat-small">
                <span className="stat-number-small">0</span>
                <span className="stat-label-small">Students Scanned</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// SCAN QR PAGE (STUDENT)
// ============================================
function ScanQR() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const startScanning = () => {
    setScanning(true);
    // Simulate successful scan after 2 seconds
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Scan QR Code</h1>
      
      <div className="card">
        {!scanning && !scanned && (
          <>
            <div className="scan-placeholder">
              <div className="camera-icon">📷</div>
              <p>Position QR code within the frame</p>
            </div>
            <button 
              onClick={startScanning} 
              className="btn-primary btn-large"
            >
              Start Scanning
            </button>
          </>
        )}

        {scanning && (
          <div className="scanning-animation">
            <div className="scan-frame">
              <div className="scan-line"></div>
            </div>
            <p className="scanning-text">Scanning QR Code...</p>
          </div>
        )}

        {scanned && (
          <div className="scan-success">
            <div className="success-icon">✅</div>
            <h2>Attendance Marked Successfully!</h2>
            <div className="scan-details">
              <p><strong>Class:</strong> Data Structures (CS301)</p>
              <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>
            <button 
              onClick={() => setScanned(false)} 
              className="btn-primary"
            >
              Scan Another QR
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// ATTENDANCE VIEW PAGE (TEACHER)
// ============================================
function AttendanceView() {
  const [selectedClass, setSelectedClass] = useState('CS301');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const attendanceData = [
    { id: 1, name: 'Manasvi', studentId: 'S001', status: 'present', time: '9:05 AM' },
    { id: 2, name: 'Roopsha', studentId: 'S002', status: 'present', time: '9:03 AM' },
    { id: 3, name: 'Vani', studentId: 'S003', status: 'present', time: '9:04 AM' },
    { id: 4, name: 'Samriddhi', studentId: 'S004', status: 'present', time: '9:15 AM' },
    { id: 5, name: 'Kritika', studentId: 'S005', status: 'present', time: '9:04 AM' },
    { id: 6, name: 'Riya', studentId: 'S006', status: 'late', time: '9:04 AM' },
    { id: 7, name: 'Ayushi', studentId: 'S007', status: 'Absent', time: '-' },
    { id: 8, name: 'Ruchi', studentId: 'S008', status: 'present', time: '9:04 AM' },
  ];

  return (
    <div className="container">
      <h1>Attendance Records</h1>
      
      <div className="card">
        <div className="filters">
          <div className="filter-group">
            <label>Select Class</label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="CS301">Data Structures (CS301)</option>
              <option value="CS401">Web Development (CS401)</option>
              <option value="CS402">Database Systems (CS402)</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Select Date</label>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        <div className="attendance-summary">
          <div className="summary-item">
            <span className="summary-label">Total:</span>
            <span className="summary-value">8</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Present:</span>
            <span className="summary-value" style={{color: '#10b981'}}>7</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Absent:</span>
            <span className="summary-value" style={{color: '#ef4444'}}>1</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Late:</span>
            <span className="summary-value" style={{color: '#f59e0b'}}>1</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Rate:</span>
            <span className="summary-value" style={{color: '#667eea'}}>80%</span>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map(student => (
              <tr key={student.id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>
                  <span className={`badge badge-${
                    student.status === 'present' ? 'success' : 
                    student.status === 'late' ? 'warning' : 'danger'
                  }`}>
                    {student.status.toUpperCase()}
                  </span>
                </td>
                <td>{student.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================
// MY ATTENDANCE PAGE (STUDENT)
// ============================================
function MyAttendance() {
  const myAttendanceData = [
    { id: 1, class: 'Data Structures (CS301)', date: '2026-02-20', status: 'present', percentage: 92 },
    { id: 2, class: 'Web Development (CS401)', date: '2026-02-20', status: 'present', percentage: 88 },
    { id: 3, class: 'Database Systems (CS402)', date: '2026-02-19', status: 'absent', percentage: 85 },
    { id: 4, class: 'Data Structures (CS301)', date: '2026-02-19', status: 'late', percentage: 92 },
    { id: 5, class: 'Web Development (CS401)', date: '2026-02-18', status: 'present', percentage: 88 },
  ];

  return (
    <div className="container">
      <h1>My Attendance</h1>
      
      <div className="card">
        <h2>Overall Attendance Statistics</h2>
        <div className="stats-grid-small">
          <div className="stat-card-small">
            <div className="stat-number-medium" style={{color: '#10b981'}}>88%</div>
            <div className="stat-label">Overall Attendance</div>
          </div>
          <div className="stat-card-small">
            <div className="stat-number-medium" style={{color: '#667eea'}}>45</div>
            <div className="stat-label">Classes Attended</div>
          </div>
          <div className="stat-card-small">
            <div className="stat-number-medium" style={{color: '#ef4444'}}>6</div>
            <div className="stat-label">Classes Missed</div>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop: '30px'}}>
        <h2>Attendance History</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Date</th>
              <th>Status</th>
              <th>Class Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {myAttendanceData.map(record => (
              <tr key={record.id}>
                <td>{record.class}</td>
                <td>{record.date}</td>
                <td>
                  <span className={`badge badge-${
                    record.status === 'present' ? 'success' : 
                    record.status === 'late' ? 'warning' : 'danger'
                  }`}>
                    {record.status.toUpperCase()}
                  </span>
                </td>
                <td>{record.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================
// REPORTS PAGE (TEACHER)
// ============================================
function Reports() {
  return (
    <div className="container">
      <h1>Reports & Analytics</h1>
      
      <div className="card">
        <h2>Generate Report</h2>
        <div className="report-form">
          <div className="form-row">
            <div className="form-group">
              <label>Report Type</label>
              <select>
                <option>Attendance Summary</option>
                <option>Student Performance</option>
                <option>At-Risk Students</option>
                <option>Class Comparison</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Time Period</label>
              <select>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Semester</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>
          
          <div className="button-group">
            <button className="btn-primary">📊 Generate Excel</button>
            <button className="btn-primary">📄 Generate PDF</button>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop: '30px'}}>
        <h2>At-Risk Students</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Attendance</th>
              <th>Avg Score</th>
              <th>Risk Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S006</td>
              <td>Riya</td>
              <td>55%</td>
              <td>60%</td>
              <td><span className="badge badge-danger">HIGH</span></td>
              <td><button className="btn-sm btn-primary">Contact</button></td>
            </tr>
            <tr>
              <td>S007</td>
              <td>Ayushi</td>
              <td>72%</td>
              <td>75%</td>
              <td><span className="badge badge-warning">MEDIUM</span></td>
              <td><button className="btn-sm btn-primary">Contact</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('dashboard');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    if (user.role === 'teacher') {
      switch(currentPage) {
        case 'dashboard': return <TeacherDashboard />;
        case 'generate-qr': return <GenerateQR />;
        case 'attendance': return <AttendanceView />;
        case 'reports': return <Reports />;
        default: return <TeacherDashboard />;
      }
    } else {
      switch(currentPage) {
        case 'dashboard': return <StudentDashboard />;
        case 'scan-qr': return <ScanQR />;
        case 'my-attendance': return <MyAttendance />;
        default: return <StudentDashboard />;
      }
    }
  };

  return (
    <div className="App">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderPage()}
    </div>
  );
}

export default App;