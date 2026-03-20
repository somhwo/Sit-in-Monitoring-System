import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ERROR_MSG = {
  idNumber:        'ID number is required.',
  lastName:        'Required.',
  firstName:       'Required.',
  courseLevel:     'Required.',
  course:          'Required.',
  email:           'A valid email is required.',
  password:        'Min. 6 characters.',
  confirmPassword: "Passwords don't match.",
  address:         'Address is required.',
};

export default function Register() {
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  function validate(values) {
    const e = {};
    Object.keys(ERROR_MSG).forEach(key => {
      if (!values[key] || !values[key].trim()) { e[key] = ERROR_MSG[key]; return; }
      if (key === 'email'           && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[key])) e[key] = ERROR_MSG[key];
      if (key === 'password'        && values[key].length < 6)                           e[key] = ERROR_MSG[key];
      if (key === 'confirmPassword' && values[key] !== values['password'])               e[key] = ERROR_MSG[key];
    });
    return e;
  }

  function handleSubmit(e) {
    const data = Object.fromEntries(new FormData(formRef.current));
    const errs = validate(data);
    if (Object.keys(errs).length) { e.preventDefault(); setErrors(errs); }
  }

  const clearError = (key) => setErrors(prev => ({ ...prev, [key]: null }));

  const inputCls = (key) =>
    `w-full bg-gray-50 border rounded-xl px-4 py-3 text-[0.92rem] text-gray-800 outline-none
     font-sans placeholder:text-gray-300 transition-all duration-200
     focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,35,108,0.12)]
     ${errors[key] ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-navy-light'}`;

  const labelCls = 'text-[0.75rem] font-semibold text-gray-400 uppercase tracking-wider';

  const ErrorMsg = ({ field }) => errors[field] ? (
    <span className="text-red-400 text-[0.75rem] flex items-center gap-1">
      <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 12 12">
        <path d="M6 0a6 6 0 100 12A6 6 0 006 0zm0 9a.75.75 0 110-1.5A.75.75 0 016 9zm.75-3.75a.75.75 0 01-1.5 0v-2a.75.75 0 011.5 0v2z"/>
      </svg>
      {errors[field]}
    </span>
  ) : null;

  return (
    <div className="min-h-[calc(100vh-62px)] flex items-center justify-center px-4 py-10
                    bg-gradient-to-br from-[#f0f3fa] via-[#eaeff8] to-[#dde6f4] relative overflow-hidden">

      {/* Background dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none">
        <defs>
          <pattern id="rgrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#2E236C" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rgrid)" />
      </svg>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl
                      pointer-events-none translate-y-1/2 translate-x-1/3" />

      <div className="animate-card-in relative z-10 w-full max-w-[860px] flex min-h-[520px]
                      rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(46,35,108,0.16)]">

           {/* ══════════════════════════════
            ILLUSTRATION PANEL 
            ══════════════════════════════ */}
        <div className="hidden md:flex flex-col justify-between flex-[0_0_320px]
                        bg-navy p-10 relative overflow-hidden">

          {/* Top text */}
          <div className="relative z-10">
            <div className="w-11 h-11 rounded-xl bg-white/10 ring-1 ring-white/20
                            flex items-center justify-center mb-6">
              <img src="/images/ccs.png" alt="CCS" className="h-7 w-auto" />
            </div>
            <div className="text-white/50 text-[0.72rem] uppercase tracking-widest font-medium mb-1">
              New here?
            </div>
            <h2 className="text-white font-bold text-[1.5rem] leading-tight">
              Join the<br />system.
            </h2>
          </div>

          {/* Bottom sign-in nudge */}
          <div className="relative z-10">
            <p className="text-white/45 text-[0.8rem] mb-3">Already have an account?</p>
            <Link to="/login"
              className="inline-flex items-center gap-2 text-white text-[0.85rem] font-semibold
                         border border-white/25 rounded-xl px-5 py-2.5 hover:bg-white/10
                         transition-colors duration-200 no-underline">
              Sign in
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════
            FORM PANEL — LEFT (wide)
            ══════════════════════════════ */}
        <div className="flex-1 flex flex-col bg-white px-8 md:px-10 py-9 overflow-y-auto">

          {/* Mobile back */}
          <Link to="/" className="md:hidden inline-flex items-center gap-1.5 text-navy/60 hover:text-navy
                                   text-[0.82rem] font-medium mb-5 transition-colors duration-150 no-underline w-fit">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
              <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>

          {/* Heading */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-navy/7 rounded-full px-3 py-1 mb-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-navy"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span className="text-navy text-[0.72rem] font-semibold uppercase tracking-wide">
                Student Registration
              </span>
            </div>
            <h2 className="text-[1.75rem] font-bold text-gray-900 leading-tight mb-1">
              Create account
            </h2>
            <p className="text-gray-400 text-[0.88rem]">Fill in your details to get started</p>
          </div>

          <form ref={formRef} action="/register" method="POST" noValidate onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">

              {/* ID Number — full width */}
              <div className="col-span-2 flex flex-col gap-1.5">
                <label htmlFor="idNumber" className={labelCls}>Student ID</label>
                <input type="text" id="idNumber" name="idNumber" placeholder="e.g. 23778600"
                  onChange={() => clearError('idNumber')} className={inputCls('idNumber')} />
                <ErrorMsg field="idNumber" />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lastName" className={labelCls}>Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Dela Cruz"
                  onChange={() => clearError('lastName')} className={inputCls('lastName')} />
                <ErrorMsg field="lastName" />
              </div>

              {/* First Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="firstName" className={labelCls}>First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="Juan"
                  onChange={() => clearError('firstName')} className={inputCls('firstName')} />
                <ErrorMsg field="firstName" />
              </div>

              {/* Middle Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="middleName" className={labelCls}>
                  Middle Name{' '}
                  <span className="font-normal normal-case text-[0.7rem]">(optional)</span>
                </label>
                <input type="text" id="middleName" name="middleName" placeholder="Santos"
                  className={inputCls('middleName')} />
              </div>

              {/* Year Level */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="courseLevel" className={labelCls}>Year Level</label>
                <input type="number" id="courseLevel" name="courseLevel"
                  placeholder="1" min={1} max={4}
                  onChange={() => clearError('courseLevel')} className={inputCls('courseLevel')} />
                <ErrorMsg field="courseLevel" />
              </div>

              {/* Course */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
                <label htmlFor="course" className={labelCls}>Course</label>
                <select id="course" name="course"
                  onChange={() => clearError('course')} className={inputCls('course')}>
                  <option value="">— Select —</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BSCS">BSCS</option>
                </select>
                <ErrorMsg field="course" />
              </div>

              {/* Email — full width */}
              <div className="col-span-2 flex flex-col gap-1.5">
                <label htmlFor="email" className={labelCls}>Email</label>
                <input type="email" id="email" name="email" placeholder="juan@example.com"
                  onChange={() => clearError('email')} className={inputCls('email')} />
                <ErrorMsg field="email" />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className={labelCls}>Password</label>
                <input type="password" id="password" name="password" placeholder="••••••••"
                  onChange={() => clearError('password')} className={inputCls('password')} />
                <ErrorMsg field="password" />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirmPassword" className={labelCls}>Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••"
                  onChange={() => clearError('confirmPassword')} className={inputCls('confirmPassword')} />
                <ErrorMsg field="confirmPassword" />
              </div>

              {/* Address — full width */}
              <div className="col-span-2 flex flex-col gap-1.5">
                <label htmlFor="address" className={labelCls}>Address</label>
                <input type="text" id="address" name="address"
                  placeholder="Street, City, Province"
                  onChange={() => clearError('address')} className={inputCls('address')} />
                <ErrorMsg field="address" />
              </div>

            </div>

            <button type="submit"
              className="mt-6 w-full bg-navy hover:bg-navy-light text-white font-bold
                         py-3.5 rounded-xl text-[0.95rem] tracking-wide cursor-pointer
                         shadow-[0_4px_20px_rgba(46,35,108,0.28)]
                         hover:shadow-[0_6px_28px_rgba(46,35,108,0.38)]
                         hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200
                         flex items-center justify-center gap-2">
              Create account
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          <p className="text-center mt-4 text-[0.85rem] text-gray-400">
            Already registered?{' '}
            <Link to="/login" className="text-navy font-semibold hover:underline">
              Sign in here
            </Link>
          </p>

          <Link to="/"
            className="hidden md:inline-flex items-center gap-1.5 justify-center mt-3
                       text-gray-300 hover:text-gray-500 text-[0.8rem] transition-colors duration-150 no-underline">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
              <path d="M10 6H2M5 2L1 6l4 4" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to home
          </Link>
        </div>

      </div>
    </div>
  );
}
