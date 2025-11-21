import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function RequestForm() {
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    address: '',
    service_title: '',
    preferred_date: '',
    notes: ''
  })
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)
    try {
      const payload = { ...form }
      if (!payload.preferred_date) delete payload.preferred_date
      const res = await fetch(`${API_BASE}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setStatus({ ok: true, id: data.id })
      setForm({
        customer_name: '', customer_email: '', customer_phone: '', address: '',
        service_title: '', preferred_date: '', notes: ''
      })
    } catch (err) {
      setStatus({ ok: false, message: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="request" className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-white mb-4">Request a Service</h2>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
        <input name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="Your name" className="px-3 py-2 rounded bg-white/10 text-white placeholder-blue-200/60" required />
        <input type="email" name="customer_email" value={form.customer_email} onChange={handleChange} placeholder="Email" className="px-3 py-2 rounded bg-white/10 text-white placeholder-blue-200/60" required />
        <input name="customer_phone" value={form.customer_phone} onChange={handleChange} placeholder="Phone" className="px-3 py-2 rounded bg-white/10 text-white placeholder-blue-200/60" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="px-3 py-2 rounded bg-white/10 text-white placeholder-blue-200/60" required />
        <input name="service_title" value={form.service_title} onChange={handleChange} placeholder="Service (e.g., Lawn Mowing)" className="px-3 py-2 rounded bg-white/10 text-white placeholder-blue-200/60 md:col-span-2" required />
        <input type="date" name="preferred_date" value={form.preferred_date} onChange={handleChange} className="px-3 py-2 rounded bg-white/10 text-white placeholder-blue-200/60" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes (optional)" className="px-3 py-2 rounded bg-white/10 text-white placeholder-blue-200/60 md:col-span-2" rows={3} />
        <div className="md:col-span-2 flex gap-3">
          <button disabled={submitting} className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-60">
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
          {status && status.ok && (
            <span className="text-emerald-300">Request sent! ID: {status.id}</span>
          )}
          {status && !status.ok && (
            <span className="text-red-300">{status.message || 'Something went wrong'}</span>
          )}
        </div>
      </form>
    </section>
  )
}

export default RequestForm
