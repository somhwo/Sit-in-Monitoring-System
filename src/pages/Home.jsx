import { Link } from 'react-router-dom';

// Decorative grid dot pattern rendered inline so no extra assets needed
function GridDots() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#2E236C" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function StatCard({ value, label, icon }) {
  return (
    <div className="bg-white rounded-2xl px-6 py-4 shadow-[0_4px_24px_rgba(46,35,108,0.10)]
                    ring-1 ring-navy/8 flex items-center gap-4 hover:-translate-y-0.5
                    transition-transform duration-200">
      <div className="w-10 h-10 rounded-xl bg-navy/8 flex items-center justify-center flex-shrink-0 text-xl">
        {icon}
      </div>
      <div>
        <div className="text-[1.4rem] font-bold text-navy leading-none">{value}</div>
        <div className="text-[0.78rem] text-gray-400 mt-0.5 font-medium">{label}</div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-62px)] relative overflow-hidden
                     bg-gradient-to-br from-[#f0f3fa] via-[#eaeff8] to-[#dde6f4]">
      <GridDots />

      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full
                      bg-navy/6 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full
                      bg-navy/5 blur-3xl pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row
                      items-center gap-16 min-h-[calc(100vh-62px)]">

        {/* Left column */}
        <div className="flex-1 flex flex-col items-start gap-6 text-left max-w-xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-navy/8 rounded-full px-4 py-1.5
                          ring-1 ring-navy/15">
            <span className="w-2 h-2 rounded-full bg-navy animate-pulse" />
            <span className="text-navy text-[0.78rem] font-semibold tracking-wide uppercase">
              CCS Lab Management
            </span>
          </div>

          <h1 className="text-[3rem] sm:text-[3.5rem] font-bold text-navy leading-[1.05] tracking-tight">
            Sit-in<br />
            <span className="relative inline-block">
              Monitoring
              {/* Underline accent */}
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                <path d="M0 5 Q50 0 100 4 Q150 8 200 3" stroke="#433D8B" strokeWidth="3"
                  fill="none" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </span>
            <br />System
          </h1>

          <p className="text-gray-500 text-[1.05rem] leading-relaxed max-w-md">
            Streamline student sit-in sessions at the College of Computer Studies.
            Track usage, manage access, and keep lab operations running smoothly.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 flex-wrap mt-2">
            <Link to="/login"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white
                         font-semibold px-7 py-3 rounded-xl text-[0.95rem] transition-all duration-200
                         shadow-[0_4px_20px_rgba(46,35,108,0.3)] hover:shadow-[0_6px_28px_rgba(46,35,108,0.4)]
                         hover:-translate-y-0.5">
              Sign In
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/register"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-navy
                         font-semibold px-7 py-3 rounded-xl text-[0.95rem] transition-all duration-200
                         ring-2 ring-navy/20 hover:ring-navy/35 hover:-translate-y-0.5
                         shadow-[0_2px_12px_rgba(46,35,108,0.08)]">
              Create Account
            </Link>
          </div>

          {/* Stat strip */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-navy/10 w-full flex-wrap">
            {[
              { n: 'BSIT', label: 'Course' },
              { n: 'BSCS', label: 'Course' },
              { n: '24/7', label: 'Monitored' },
            ].map(({ n, label }) => (
              <div key={n} className="text-center">
                <div className="text-navy font-bold text-[1.1rem] leading-none">{n}</div>
                <div className="text-gray-400 text-[0.72rem] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — card cluster */}
        <div className="flex-1 w-full max-w-sm lg:max-w-md relative">

          {/* Main card */}
          <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(46,35,108,0.14)]
                          ring-1 ring-navy/8 p-8 relative overflow-hidden">

            {/* Card accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy to-navy-light rounded-t-3xl" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center">
                <img src="/images/ccs.png" alt="CCS" className="h-7 w-auto" />
              </div>
              <div>
                <div className="font-bold text-navy text-[0.95rem]">CCS Laboratory</div>
                <div className="text-gray-400 text-[0.78rem]">Session tracking portal</div>
              </div>
            </div>

            {/* Mock session rows */}
            <div className="space-y-3 mb-6">
              {[
                { name: 'Juan Dela Cruz', course: 'BSIT 3-A', status: 'Active',   color: 'text-emerald-600 bg-emerald-50' },
                { name: 'Maria Santos',   course: 'BSCS 2-B', status: 'Active',   color: 'text-emerald-600 bg-emerald-50' },
                { name: 'Carlo Reyes',    course: 'BSIT 4-A', status: 'Timeout',  color: 'text-amber-600  bg-amber-50'   },
              ].map(({ name, course, status, color }) => (
                <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80
                                           ring-1 ring-gray-100 hover:bg-gray-100/60 transition-colors duration-150">
                  <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center
                                  text-navy text-[0.7rem] font-bold flex-shrink-0">
                    {name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.85rem] font-semibold text-gray-800 truncate">{name}</div>
                    <div className="text-[0.72rem] text-gray-400">{course}</div>
                  </div>
                  <span className={`text-[0.7rem] font-semibold px-2.5 py-0.5 rounded-full ${color}`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[0.78rem] text-gray-400
                            pt-4 border-t border-gray-100">
              <span>3 active sessions</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
          </div>

          {/* Floating stat mini-cards */}
          <div className="absolute -left-8 top-8 hidden lg:block">
            <StatCard value="128" label="Sessions today" icon="📋" />
          </div>
          <div className="absolute -right-6 -bottom-4 hidden lg:block">
            <StatCard value="4" label="Labs online" icon="🖥️" />
          </div>
        </div>

      </div>
    </main>
  );
}
