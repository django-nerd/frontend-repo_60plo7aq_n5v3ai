import { useMemo } from 'react'

function Header() {
  const tagline = useMemo(() => (
    'Book trusted gardeners for mowing, trimming, cleanup, and more.'
  ), [])

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(600px_200px_at_10%_-10%,#60a5fa,transparent),radial-gradient(600px_200px_at_110%_10%,#34d399,transparent)]" />
      <div className="relative py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                GreenCare
              </h1>
              <p className="text-blue-100/90 mt-2 max-w-xl">
                {tagline}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <a href="#services" className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition">
                Browse Services
              </a>
              <a href="#request" className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition">
                Request a Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
