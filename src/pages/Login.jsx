import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ROLES = [
  {
    key:         'student',
    label:       'Student',
    action:      '/login/student',
    heading:     'Student Sign In',
    sub:         'Access your sit-in session dashboard',
    idLabel:     'Student ID',
    idPlaceholder: 'e.g. 2021-00001',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    key:         'admin',
    label:       'Admin',
    action:      '/login/admin',
    heading:     'Admin Sign In',
    sub:         'Manage lab sessions and student records',
    idLabel:     'Admin Username',
    idPlaceholder: 'e.g. admin@ccs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2l2.4 4.8L20 8l-4 3.9.94 5.5L12 15l-4.94 2.4L8 11.9 4 8l5.6-1.2z" />
      </svg>
    ),
  },
];

export default function Login() {
  const [role,   setRole]   = useState('student');
  const [errors, setErrors] = useState({});
  const idRef   = useRef();
  const passRef = useRef();

  const current = ROLES.find(r => r.key === role);

  function handleRoleSwitch(key) {
    setRole(key);
    setErrors({});
    // clear inputs when switching
    if (idRef.current)   idRef.current.value   = '';
    if (passRef.current) passRef.current.value = '';
  }

  function handleSubmit(e) {
    const errs = {};
    if (!idRef.current?.value.trim())   errs.idNumber = `${current.idLabel} is required.`;
    if (!passRef.current?.value.trim()) errs.password = 'Password is required.';
    if (Object.keys(errs).length) { e.preventDefault(); setErrors(errs); }
  }

  const clearError = (key) => setErrors(prev => ({ ...prev, [key]: null }));

  const inputCls = (key) =>
    `w-full bg-gray-50 border rounded-xl px-4 py-3 text-[0.95rem] text-gray-800 outline-none
     font-sans placeholder:text-gray-300 transition-all duration-200
     focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,35,108,0.12)]
     ${errors[key]
       ? 'border-red-300 focus:border-red-400'
       : 'border-gray-200 focus:border-navy-light'}`;

  return (
    <div className="min-h-[calc(100vh-62px)] flex items-center justify-center px-4 py-10
                    bg-gradient-to-br from-[#f0f3fa] via-[#eaeff8] to-[#dde6f4] relative overflow-hidden">

      {/* Background dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none">
        <defs>
          <pattern id="lgrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#2E236C" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lgrid)" />
      </svg>
      <div className="absolute top-0 right-0 w-80 h-80 bg-navy/6 rounded-full blur-3xl
                      pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="animate-card-in relative z-10 w-full max-w-[880px] flex min-h-[520px]
                      rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(46,35,108,0.16)]">

        {/* ── Illustration panel ── */}
        <div className="hidden md:flex flex-col justify-between w-[320px] flex-shrink-0
                        bg-navy p-10 relative overflow-hidden transition-all duration-500">

          {/* Brand */}
          <div className="relative z-10">
            <div className="w-11 h-11 rounded-xl bg-white/10 ring-1 ring-white/20
                            flex items-center justify-center mb-6">
              <img src="/images/ccs.png" alt="CCS" className="h-7 w-auto" />
            </div>
            <div className="text-white/50 text-[0.72rem] uppercase tracking-widest font-medium mb-1">
              College of Computer Studies
            </div>
            <h2 className="text-white font-bold text-[1.6rem] leading-tight">
              Welcome<br />back.
            </h2>
          </div>

          {/* Role pills on the panel */}
          <div className="relative z-10 flex flex-col gap-3">
            {ROLES.map(r => (
              <button
                key={r.key}
                onClick={() => handleRoleSwitch(r.key)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left
                            transition-all duration-200 cursor-pointer
                            ${role === r.key
                              ? 'bg-white text-navy shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
                              : 'bg-white/10 text-white/70 hover:bg-white/18 hover:text-white ring-1 ring-white/15'}`}
              >
                <span className={`flex-shrink-0 ${role === r.key ? 'text-navy' : 'text-white/70'}`}>
                  {r.icon}
                </span>
                <div>
                  <div className={`text-[0.88rem] font-semibold leading-none mb-0.5
                                   ${role === r.key ? 'text-navy' : 'text-white'}`}>
                    {r.label}
                  </div>
                  <div className={`text-[0.72rem] leading-tight
                                   ${role === r.key ? 'text-navy/50' : 'text-white/45'}`}>
                    {r.key === 'student' ? 'Session access' : 'System management'}
                  </div>
                </div>
                {role === r.key && (
                  <svg className="w-4 h-4 text-navy ml-auto flex-shrink-0" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Register nudge */}
          <div className="relative z-10">
            <p className="text-white/45 text-[0.8rem] mb-3">New student?</p>
            <Link to="/register"
              className="inline-flex items-center gap-2 text-white text-[0.85rem] font-semibold
                         border border-white/25 rounded-xl px-5 py-2.5 hover:bg-white/10
                         transition-colors duration-200 no-underline">
              Create account
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Form panel ── */}
        <div className="flex-1 flex flex-col justify-center bg-white px-8 md:px-12 py-10">

          {/* Mobile back */}
          <Link to="/" className="md:hidden inline-flex items-center gap-1.5 text-navy/60 hover:text-navy
                                   text-[0.82rem] font-medium mb-5 transition-colors duration-150 no-underline w-fit">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
              <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>

          {/* ── Mobile role toggle ── */}
          <div className="md:hidden flex rounded-xl bg-gray-100 p-1 gap-1 mb-6">
            {ROLES.map(r => (
              <button
                key={r.key}
                onClick={() => handleRoleSwitch(r.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg
                            text-[0.85rem] font-semibold transition-all duration-200 cursor-pointer
                            ${role === r.key
                              ? 'bg-white text-navy shadow-sm'
                              : 'text-gray-400 hover:text-gray-600'}`}
              >
                {r.icon}
                {r.label}
              </button>
            ))}
          </div>

          {/* Heading — transitions with role */}
          <div className="mb-7">
            {/* Role badge */}
            <div className="inline-flex items-center gap-2 bg-navy/7 rounded-full px-3 py-1 mb-3">
              <span className="text-navy">{current.icon}</span>
              <span className="text-navy text-[0.72rem] font-semibold uppercase tracking-wide">
                {current.label} Portal
              </span>
            </div>
            <h2 className="text-[1.85rem] font-bold text-gray-900 leading-tight mb-1">
              {current.heading}
            </h2>
            <p className="text-gray-400 text-[0.88rem]">{current.sub}</p>
          </div>

          {/* Form — action changes with role */}
          <form
            key={role}                    // remount inputs on role switch
            action={current.action}
            method="POST"
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="idNumber"
                className="text-[0.75rem] font-semibold text-gray-400 uppercase tracking-wider">
                {current.idLabel}
              </label>
              <input
                ref={idRef}
                type="text"
                id="idNumber"
                name="idNumber"
                placeholder={current.idPlaceholder}
                autoComplete="username"
                onChange={() => clearError('idNumber')}
                className={inputCls('idNumber')}
              />
              {errors.idNumber && (
                <span className="text-red-400 text-[0.78rem] flex items-center gap-1">
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M6 0a6 6 0 100 12A6 6 0 006 0zm0 9a.75.75 0 110-1.5A.75.75 0 016 9zm.75-3.75a.75.75 0 01-1.5 0v-2a.75.75 0 011.5 0v2z"/>
                  </svg>
                  {errors.idNumber}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password"
                className="text-[0.75rem] font-semibold text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <input
                ref={passRef}
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
                onChange={() => clearError('password')}
                className={inputCls('password')}
              />
              {errors.password && (
                <span className="text-red-400 text-[0.78rem] flex items-center gap-1">
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M6 0a6 6 0 100 12A6 6 0 006 0zm0 9a.75.75 0 110-1.5A.75.75 0 016 9zm.75-3.75a.75.75 0 01-1.5 0v-2a.75.75 0 011.5 0v2z"/>
                  </svg>
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="mt-1 w-full bg-navy hover:bg-navy-light text-white font-bold
                         py-3.5 rounded-xl text-[0.95rem] tracking-wide cursor-pointer
                         shadow-[0_4px_20px_rgba(46,35,108,0.28)]
                         hover:shadow-[0_6px_28px_rgba(46,35,108,0.38)]
                         hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200
                         flex items-center justify-center gap-2">
              Sign in as {current.label}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          {role === 'student' && (
            <p className="text-center mt-5 text-[0.85rem] text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-navy font-semibold hover:underline">
                Register here
              </Link>
            </p>
          )}

          <Link to="/"
            className="hidden md:inline-flex items-center gap-1.5 justify-center mt-4
                       text-gray-300 hover:text-gray-500 text-[0.8rem] transition-colors duration-150 no-underline">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
              <path d="M10 6H2M5 2L1 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to home
          </Link>
        </div>

      </div>
    </div>
  );
}
