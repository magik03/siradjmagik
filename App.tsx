import React, { useState, useEffect } from 'react';
import { Plus, Search, Server as ServerIcon, Database, Filter, XCircle } from 'lucide-react';
import { Server, ServerFormData } from './types';
import { ServerCard } from './components/ServerCard';
import { ServerForm } from './components/ServerForm';

type FilterType = 'all' | 'expired' | 'unpaid' | 'active';

const App: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<Server | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedServers = localStorage.getItem('my_servers');
    if (savedServers) {
      try {
        setServers(JSON.parse(savedServers));
      } catch (e) {
        console.error('Failed to parse servers', e);
      }
    }
  }, []);

  // Save to LocalStorage whenever servers change
  useEffect(() => {
    localStorage.setItem('my_servers', JSON.stringify(servers));
  }, [servers]);

  // Calculate end date based on start date and months duration
  const calculateEndDate = (startDate: Date, months: number): Date => {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + months);
    return endDate;
  };

  const handleAddServer = (data: ServerFormData) => {
    const now = new Date();
    const newServer: Server = {
      id: crypto.randomUUID(),
      ...data,
      startDate: now.toISOString(),
      endDate: calculateEndDate(now, data.duration).toISOString(),
    };
    setServers([newServer, ...servers]);
    setIsFormOpen(false);
    setActiveFilter('all'); // Reset filter to show the new server
  };

  const handleUpdateServer = (data: ServerFormData) => {
    if (!editingServer) return;
    
    const updatedServer: Server = {
      ...editingServer,
      ...data,
      endDate: calculateEndDate(new Date(editingServer.startDate), data.duration).toISOString(),
    };

    setServers(servers.map(s => s.id === updatedServer.id ? updatedServer : s));
    setEditingServer(null);
    setIsFormOpen(false);
  };

  const handleDeleteServer = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا السيرفر؟')) {
      setServers(servers.filter(s => s.id !== id));
    }
  };

  const openEditModal = (server: Server) => {
    setEditingServer(server);
    setIsFormOpen(true);
  };

  // Filter Logic
  const filteredServers = servers.filter(server => {
    // 1. Text Search
    if (searchTerm && !server.name.includes(searchTerm)) return false;

    // 2. Category Filter
    const isExpired = new Date() > new Date(server.endDate);
    
    switch (activeFilter) {
      case 'expired':
        return isExpired;
      case 'unpaid':
        return !server.isPaid;
      case 'active':
        return server.isPaid && !isExpired;
      case 'all':
      default:
        return true;
    }
  });

  // Stats Counts
  const totalCount = servers.length;
  const expiredCount = servers.filter(s => new Date() > new Date(s.endDate)).length;
  const unpaidCount = servers.filter(s => !s.isPaid).length;
  const activeCount = servers.filter(s => s.isPaid && new Date() <= new Date(s.endDate)).length;

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-blue-200 shadow-lg cursor-pointer" onClick={() => setActiveFilter('all')}>
              <Database size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">مدير السيرفرات</h1>
          </div>
          
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن سيرفر..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <button
            onClick={() => {
              setEditingServer(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">إضافة سيرفر</span>
            <span className="sm:hidden">جديد</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Interactive Stats / Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`p-4 rounded-xl shadow-sm border text-right transition-all duration-200 ${
              activeFilter === 'all' 
                ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
            }`}
          >
            <p className="text-sm text-gray-500 mb-1">إجمالي السيرفرات</p>
            <p className="text-2xl font-bold text-gray-800">{totalCount}</p>
          </button>

          <button 
            onClick={() => setActiveFilter('expired')}
            className={`p-4 rounded-xl shadow-sm border text-right transition-all duration-200 ${
              activeFilter === 'expired' 
                ? 'bg-red-50 border-red-500 ring-1 ring-red-500' 
                : 'bg-white border-gray-100 hover:border-red-200 hover:shadow-md'
            }`}
          >
            <p className="text-sm text-gray-500 mb-1">السيرفرات المنتهية</p>
            <p className="text-2xl font-bold text-red-600">{expiredCount}</p>
          </button>

          <button 
            onClick={() => setActiveFilter('unpaid')}
             className={`p-4 rounded-xl shadow-sm border text-right transition-all duration-200 ${
              activeFilter === 'unpaid' 
                ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500' 
                : 'bg-white border-gray-100 hover:border-orange-200 hover:shadow-md'
            }`}
          >
            <p className="text-sm text-gray-500 mb-1">غير خالص</p>
            <p className="text-2xl font-bold text-orange-500">{unpaidCount}</p>
          </button>

          <button 
            onClick={() => setActiveFilter('active')}
            className={`p-4 rounded-xl shadow-sm border text-right transition-all duration-200 ${
              activeFilter === 'active' 
                ? 'bg-green-50 border-green-500 ring-1 ring-green-500' 
                : 'bg-white border-gray-100 hover:border-green-200 hover:shadow-md'
            }`}
          >
            <p className="text-sm text-gray-500 mb-1">نشط ومدفوع</p>
            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
          </button>
        </div>

        {/* Filter Indicator (Only shows if filtering is active) */}
        {activeFilter !== 'all' && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">تصفية حسب:</span>
            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              {activeFilter === 'expired' && <span className="text-red-600">منتهي الصلاحية</span>}
              {activeFilter === 'unpaid' && <span className="text-orange-600">غير خالص</span>}
              {activeFilter === 'active' && <span className="text-green-600">نشط ومدفوع</span>}
              <button 
                onClick={() => setActiveFilter('all')}
                className="hover:bg-gray-100 p-0.5 rounded-full transition-colors ml-1 text-gray-400 hover:text-gray-600"
              >
                <XCircle size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Server Grid */}
        {filteredServers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServers.map((server) => (
              <ServerCard
                key={server.id}
                server={server}
                onEdit={openEditModal}
                onDelete={handleDeleteServer}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              {activeFilter === 'all' ? (
                <ServerIcon size={48} className="text-gray-400" />
              ) : (
                <Filter size={48} className="text-gray-400" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {searchTerm 
                ? 'لا توجد نتائج للبحث' 
                : activeFilter !== 'all' 
                  ? 'لا توجد سيرفرات في هذا التصنيف'
                  : 'لا توجد سيرفرات مضافة'
              }
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              {searchTerm 
                ? 'جرب البحث باسم آخر' 
                : activeFilter !== 'all'
                  ? 'جرب تغيير الفلتر أو إضافة سيرفرات جديدة.'
                  : 'قم بإضافة سيرفر جديد للبدء في تتبع اشتراكاتك ومواعيد الانتهاء بسهولة.'
              }
            </p>
            {activeFilter === 'all' && !searchTerm && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="text-blue-600 font-medium hover:underline"
              >
                إضافة سيرفر الآن
              </button>
            )}
             {activeFilter !== 'all' && (
              <button
                onClick={() => setActiveFilter('all')}
                className="text-blue-600 font-medium hover:underline"
              >
                عرض الكل
              </button>
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      {isFormOpen && (
        <ServerForm
          initialData={editingServer}
          onSubmit={editingServer ? handleUpdateServer : handleAddServer}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingServer(null);
          }}
        />
      )}
    </div>
  );
};

export default App;