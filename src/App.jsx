import Header from './components/Header'
import ServiceCatalog from './components/ServiceCatalog'
import RequestForm from './components/RequestForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(16,185,129,0.15),transparent_60%),radial-gradient(circle_at_90%_10%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="relative">
        <Header />
        <ServiceCatalog />
        <RequestForm />
        <footer className="py-10 text-center text-blue-100/70">© {new Date().getFullYear()} GreenCare</footer>
      </div>
    </div>
  )
}

export default App
