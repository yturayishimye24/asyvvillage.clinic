import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Activity,
  FileText,
  Bell,
  Check,
  X,
  Clock,
  TrendingUp,
  Menu,
  LogOut,
  Settings,
  ChevronDown,
  AlertCircle,
  Package,
  UserCheck,
  Calendar
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {toast,ToastContainer} from "react-toastify"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminPage = () => {
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("name")
    localStorage.removeItem("role");
    toast.success("Logged from admin successfully!")
    setTimeout(navigate("/"),10000)
    
  }
  const navigate=useNavigate();
  const [forbidden,setForbidden] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(5);
  const [requests, setRequests] = useState([
    {
      id: 1,
      nurse: 'Jane Doe',
      type: 'Medicine Request',
      item: 'Paracetamol 500mg',
      quantity: '50 units',
      urgency: 'High',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      nurse: 'John Smith',
      type: 'Equipment Request',
      item: 'Blood Pressure Monitor',
      quantity: '2 units',
      urgency: 'Medium',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: 3,
      nurse: 'Mary Johnson',
      type: 'Medicine Request',
      item: 'Insulin',
      quantity: '30 vials',
      urgency: 'High',
      date: '2024-01-14',
      status: 'pending'
    }
  ]);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Robert Williams',
      age: 45,
      gender: 'Male',
      disease: 'Diabetes',
      addedBy: 'Jane Doe',
      date: '2024-01-15',
      status: 'Under Treatment'
    },
    {
      id: 2,
      name: 'Sarah Brown',
      age: 32,
      gender: 'Female',
      disease: 'Hypertension',
      addedBy: 'John Smith',
      date: '2024-01-15',
      status: 'Stable'
    },
    {
      id: 3,
      name: 'Michael Davis',
      age: 28,
      gender: 'Male',
      disease: 'Asthma',
      addedBy: 'Mary Johnson',
      date: '2024-01-14',
      status: 'Under Treatment'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      age: 55,
      gender: 'Female',
      disease: 'Arthritis',
      addedBy: 'Jane Doe',
      date: '2024-01-14',
      status: 'Stable'
    },
    {
      id: 5,
      name: 'James Martinez',
      age: 38,
      gender: 'Male',
      disease: 'Hypertension',
      addedBy: 'John Smith',
      date: '2024-01-13',
      status: 'Under Treatment'
    }
  ]);

  const handleRequestAction = (id, action) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: action } : req
    ));
    if (action === 'approved' || action === 'rejected') {
      setNotifications(prev => Math.max(0, prev - 1));
    }
  };

  const diseaseData = {
    labels: ['Diabetes', 'Hypertension', 'Asthma', 'Arthritis', 'Heart Disease', 'Cancer'],
    datasets: [
      {
        label: 'Male',
        data: [25, 30, 15, 10, 12, 8],
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: 'Female',
        data: [20, 28, 12, 18, 10, 12],
        backgroundColor: 'rgba(156, 163, 175, 0.8)',
        borderColor: 'rgba(107, 114, 128, 1)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 13
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  
  const patientTrendsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Patients',
        data: [12, 19, 15, 25, 22, 30, 28],
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          return gradient;
        },
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(0, 0, 0, 1)',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      }
    ]
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      change: '+12%',
      icon: Users,
      color: 'bg-black'
    },
    {
      title: 'Pending Requests',
      value: requests.filter(r => r.status === 'pending').length,
      change: `${notifications} new`,
      icon: Clock,
      color: 'bg-gray-600'
    },
    {
      title: 'Active Nurses',
      value: '8',
      change: '+2 this week',
      icon: UserCheck,
      color: 'bg-gray-700'
    },
    {
      title: 'Appointments',
      value: '24',
      change: 'Today',
      icon: Calendar,
      color: 'bg-gray-800'
    }
  ];
  useEffect(()=>{
    const token= localStorage.getItem("token")
    const role= localStorage.getItem("role")
    if(!token){
        toast.error("Only admins access this page");
        navigate("/")
        return
    }
    if(role !== "admin"){
        toast.error("You don't have admin role")
        navigate("/")
        return;
    }
  },[navigate])
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Activity className="text-white" size={20} />
              </div>
              <div>
                <h2 className="font-bold text-lg">Clinic</h2>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'patients', label: 'Patients', icon: Users },
            { id: 'requests', label: 'Requests', icon: Package, badge: requests.filter(r => r.status === 'pending').length },
            { id: 'reports', label: 'Reports', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  activeTab === item.id 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    {item.badge > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        activeTab === item.id ? 'bg-white text-black' : 'bg-black text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition" onClick={handleLogout}>
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

    
      <main className="flex-1 overflow-y-auto bg-gray-50">
       
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div>
                  <p className="font-semibold text-sm">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`${stat.color} p-3 rounded-xl`}>
                          <Icon className="text-white" size={24} />
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                    </div>
                  );
                })}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Patient Trends</h3>
                  <div className="h-64">
                    <Line data={patientTrendsData} options={trendOptions} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Top Diseases by Gender</h3>
                  <div className="h-64">
                    <Bar data={diseaseData} options={chartOptions} />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {patients.slice(0, 3).map(patient => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-semibold">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{patient.name}</p>
                          <p className="text-sm text-gray-600">Added by {patient.addedBy}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{patient.disease}</p>
                        <p className="text-xs text-gray-500">{patient.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="bg-white rounded-2xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">All Patients</h3>
                  <input 
                    type="text" 
                    placeholder="Search patients..."
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Age/Gender</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Disease</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Added By</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {patients.map(patient => (
                      <tr key={patient.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold">
                              {patient.name.charAt(0)}
                            </div>
                            <span className="font-semibold">{patient.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{patient.age} / {patient.gender}</td>
                        <td className="px-6 py-4 font-medium">{patient.disease}</td>
                        <td className="px-6 py-4 text-gray-600">{patient.addedBy}</td>
                        <td className="px-6 py-4 text-gray-600">{patient.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            patient.status === 'Stable' 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {patient.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-4">
              {requests.map(request => (
                <div key={request.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold">{request.item}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          request.urgency === 'High' 
                            ? 'bg-red-50 text-red-700' 
                            : 'bg-yellow-50 text-yellow-700'
                        }`}>
                          {request.urgency} Priority
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">Requested By</p>
                          <p className="font-semibold">{request.nurse}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Type</p>
                          <p className="font-semibold">{request.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Quantity</p>
                          <p className="font-semibold">{request.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Date</p>
                          <p className="font-semibold">{request.date}</p>
                        </div>
                      </div>
                    </div>
                    {request.status === 'pending' ? (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleRequestAction(request.id, 'approved')}
                          className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition flex items-center gap-2 font-semibold"
                        >
                          <Check size={16} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRequestAction(request.id, 'rejected')}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition flex items-center gap-2 font-semibold"
                        >
                          <X size={16} />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className={`px-4 py-2 rounded-xl font-semibold ${
                        request.status === 'approved'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2">Reports Coming Soon</h3>
              <p className="text-gray-600">This feature will be available in the next update.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
              <Settings size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2">Settings</h3>
              <p className="text-gray-600">Configure your admin preferences here.</p>
            </div>
          )}
        </div>
      </main>
      <ToastContainer/>
    </div>
  );
};

export default AdminPage;