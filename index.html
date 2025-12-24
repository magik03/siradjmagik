<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>مدير السيرفرات السحابي</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style> body { font-family: 'Cairo', sans-serif; background-color: #f8fafc; } </style>
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.2.0",
        "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
        "lucide-react": "https://esm.sh/lucide-react@0.292.0"
      }
    }
    </script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel" data-type="module">
      import React, { useState, useEffect } from 'react';
      import { createRoot } from 'react-dom/client';
      import { Trash2, Edit, Calendar, Server, Save, Plus, RefreshCw, X } from 'lucide-react';

      // ==========================================
      // تذكر: ضع بياناتك هنا ليعمل البرنامج
      // ==========================================
      const CONFIG = {
        token: "ضـع_الـتـوكـن_هـنـا", // ضع التوكن الذي يبدأ بـ github_pat هنا
        owner: "siradjmagik",        // اسم المستخدم الخاص بك
        repo: "siradjmagik",         // اسم المستودع
        path: "servers.json"         // اسم ملف البيانات
      };

      const App = () => {
        const [servers, setServers] = useState([]);
        const [loading, setLoading] = useState(false);
        const [isFormOpen, setIsFormOpen] = useState(false);
        const [sha, setSha] = useState('');

        // دالة لجلب البيانات من GitHub
        const loadData = async () => {
          if (CONFIG.token.includes("ضـع")) {
            alert("من فضلك ضع التوكن الخاص بك داخل الكود أولاً!");
            return;
          }
          setLoading(true);
          try {
            const res = await fetch(`https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${CONFIG.path}`, {
              headers: { Authorization: `token ${CONFIG.token}`, 'Cache-Control': 'no-cache' }
            });
            const data = await res.json();
            const content = JSON.parse(decodeURIComponent(escape(atob(data.content))));
            setServers(content);
            setSha(data.sha);
          } catch (err) {
            console.error("خطأ في الجلب:", err);
          } finally { setLoading(false); }
        };

        useEffect(() => { loadData(); }, []);

        // دالة لحفظ البيانات في GitHub
        const saveData = async (newList) => {
          setLoading(true);
          try {
            const content = btoa(unescape(encodeURIComponent(JSON.stringify(newList, null, 2))));
            const res = await fetch(`https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${CONFIG.path}`, {
              method: 'PUT',
              headers: { Authorization: `token ${CONFIG.token}` },
              body: JSON.stringify({ message: "تحديث", content, sha })
            });
            if (res.ok) {
              const resData = await res.json();
              setSha(resData.content.sha);
              setServers(newList);
            }
          } catch (err) { alert("فشل الحفظ!"); }
          finally { setLoading(false); }
        };

        const handleAdd = (e) => {
          e.preventDefault();
          const fd = new FormData(e.target);
          const newServer = {
            id: Date.now(),
            name: fd.get('name'),
            endDate: new Date(Date.now() + fd.get('dur') * 30 * 24 * 60 * 60 * 1000).toISOString()
          };
          saveData([newServer, ...servers]);
          setIsFormOpen(false);
        };

        return (
          <div className="min-h-screen">
            <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
              <h1 className="font-bold text-xl flex items-center gap-2"><Server /> مدير السيرفرات السحابي</h1>
              <div className="flex gap-2">
                <button onClick={loadData} className="p-2 bg-blue-500 rounded-lg"><RefreshCw size={20} className={loading ? "animate-spin" : ""}/></button>
                <button onClick={() => setIsFormOpen(true)} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold">+ إضافة</button>
              </div>
            </nav>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {servers.map(s => (
                <div key={s.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg text-blue-600 mb-2">{s.name}</h3>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Calendar size={14}/> ينتهي في: {new Date(s.endDate).toLocaleDateString('ar-EG')}
                  </div>
                  <button onClick={() => saveData(servers.filter(x => x.id !== s.id))} className="mt-4 text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                </div>
              ))}
            </div>

            {isFormOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl w-full max-w-sm space-y-4">
                  <h2 className="font-bold text-lg">إضافة سيرفر جديد</h2>
                  <input name="name" placeholder="اسم السيرفر" className="w-full border p-2 rounded-lg" required />
                  <select name="dur" className="w-full border p-2 rounded-lg">
                    <option value="1">شهر واحد</option>
                    <option value="12">سنة كاملة</option>
                  </select>
                  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">حفظ في GitHub</button>
                  <button type="button" onClick={() => setIsFormOpen(false)} className="w-full text-gray-400">إلغاء</button>
                </form>
              </div>
            )}
          </div>
        );
      };

      createRoot(document.getElementById('root')).render(<App />);
    </script>
  </body>
</html>
