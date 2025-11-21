import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ServiceCard({ s }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition">
      <h3 className="text-white font-semibold text-lg">{s.title}</h3>
      {s.description && (
        <p className="text-blue-100/80 text-sm mt-1">{s.description}</p>
      )}
      <div className="mt-3 text-sm text-emerald-300">
        {s.base_price != null ? `From $${s.base_price}` : 'Contact for quote'}
      </div>
    </div>
  )
}

function ServiceCatalog() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/services`)
        const data = await res.json()
        setServices(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error('Failed to load services', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-white mb-4">Popular Services</h2>
      {loading ? (
        <p className="text-blue-100/80">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-blue-100/80">No services yet. Be the first to add one below.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ServiceCatalog
