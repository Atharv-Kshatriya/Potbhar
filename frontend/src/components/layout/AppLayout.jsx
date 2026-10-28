import Sidebar from './Sidebar'

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#1C2424]">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
