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
    if (Object.keys(errs).length) {
      e.preventDefault();
      setErrors(errs);
    }
  }

  const clearError = (key) => setErrors(prev => ({ ...prev, [key]: null }));

  // Identical to Login's inputCls
  const inputCls = (key) =>
    `bg-[#f7fafd] border-[1.5px] rounded-md px-3 py-[0.55rem] text-[0.95rem]
     text-gray-800 outline-none font-sans w-full
     focus:border-navy-light focus:shadow-[0_0_0_3px_rgba(36,80,160,0.12)] focus:bg-white
     placeholder:text-[#b0bcc8] transition-all duration-200
     ${errors[key] ? 'border-red-400' : 'border-[#d0dbe8]'}`;

  const labelCls = 'text-[0.78rem] font-semibold text-gray-500 uppercase tracking-[0.05em]';

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-10
                    bg-gradient-to-br from-[#e8edf5] via-[#dce6f0] to-[#cfdaeb]">

      {/* Same card shape as Login */}
      <div className="animate-card-in bg-white rounded-2xl shadow-[0_8px_40px_rgba(26,58,107,0.16)]
                      w-full max-w-[860px] flex min-h-[520px] overflow-hidden">

        {/* ── Form Side ── */}
        <div className="flex-1 flex flex-col p-10 overflow-y-auto">

          <Link
            to="/"
            className="inline-block bg-navy hover:bg-navy-light text-white font-semibold text-sm
                       px-4 py-1.5 rounded mb-5 w-fit transition-colors duration-150 no-underline"
          >
            ← Back
          </Link>

          <h2 className="font-sans font-semibold text-[1.9rem] text-navy mb-1 text-center">
            Create Account
          </h2>
          <p className="text-center text-gray-400 text-[0.85rem] mb-5">
            Fill in your details to register
          </p>

          <form ref={formRef} action="/register" method="POST" noValidate onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">

              {/* ID Number — full width */}
              <div className="col-span-2 flex flex-col gap-1">
                <label htmlFor="idNumber" className={labelCls}>ID Number</label>
                <input type="text" id="idNumber" name="idNumber" placeholder="e.g. 23778600"
                  onChange={() => clearError('idNumber')} className={inputCls('idNumber')} />
                {errors.idNumber && <span className="text-red-400 text-[0.78rem]">{errors.idNumber}</span>}
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className={labelCls}>Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Dela Cruz"
                  onChange={() => clearError('lastName')} className={inputCls('lastName')} />
                {errors.lastName && <span className="text-red-400 text-[0.78rem]">{errors.lastName}</span>}
              </div>

              {/* First Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className={labelCls}>First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="Juan"
                  onChange={() => clearError('firstName')} className={inputCls('firstName')} />
                {errors.firstName && <span className="text-red-400 text-[0.78rem]">{errors.firstName}</span>}
              </div>

              {/* Middle Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="middleName" className={labelCls}>
                  Middle Name <span className="font-normal normal-case text-[0.7rem]">(optional)</span>
                </label>
                <input type="text" id="middleName" name="middleName" placeholder="Santos"
                  className={inputCls('middleName')} />
              </div>

              {/* Year Level */}
              <div className="flex flex-col gap-1">
                <label htmlFor="courseLevel" className={labelCls}>Year Level</label>
                <input type="number" id="courseLevel" name="courseLevel" placeholder="1" min={1} max={4}
                  onChange={() => clearError('courseLevel')} className={inputCls('courseLevel')} />
                {errors.courseLevel && <span className="text-red-400 text-[0.78rem]">{errors.courseLevel}</span>}
              </div>

              {/* Course — full width on mobile, half on md+ */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label htmlFor="course" className={labelCls}>Course</label>
                <select id="course" name="course"
                  onChange={() => clearError('course')} className={inputCls('course')}>
                  <option value="">— Select —</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BSCS">BSCS</option>
                </select>
                {errors.course && <span className="text-red-400 text-[0.78rem]">{errors.course}</span>}
              </div>

              {/* Email — full width */}
              <div className="col-span-2 flex flex-col gap-1">
                <label htmlFor="email" className={labelCls}>Email</label>
                <input type="email" id="email" name="email" placeholder="juan@example.com"
                  onChange={() => clearError('email')} className={inputCls('email')} />
                {errors.email && <span className="text-red-400 text-[0.78rem]">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className={labelCls}>Password</label>
                <input type="password" id="password" name="password" placeholder="••••••••"
                  onChange={() => clearError('password')} className={inputCls('password')} />
                {errors.password && <span className="text-red-400 text-[0.78rem]">{errors.password}</span>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className={labelCls}>Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••"
                  onChange={() => clearError('confirmPassword')} className={inputCls('confirmPassword')} />
                {errors.confirmPassword && <span className="text-red-400 text-[0.78rem]">{errors.confirmPassword}</span>}
              </div>

              {/* Address — full width */}
              <div className="col-span-2 flex flex-col gap-1">
                <label htmlFor="address" className={labelCls}>Address</label>
                <input type="text" id="address" name="address" placeholder="Street, City, Province"
                  onChange={() => clearError('address')} className={inputCls('address')} />
                {errors.address && <span className="text-red-400 text-[0.78rem]">{errors.address}</span>}
              </div>

            </div>

            {/* Submit — identical style to Login's button */}
            <button
              type="submit"
              className="mt-5 bg-navy hover:bg-navy-light text-white font-bold rounded-lg
                         py-[0.72rem] text-base tracking-[0.03em] w-full cursor-pointer
                         shadow-[0_3px_12px_rgba(26,58,107,0.2)] hover:shadow-[0_5px_18px_rgba(26,58,107,0.28)]
                         hover:-translate-y-px active:translate-y-0 transition-all duration-200"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-4 text-[0.88rem] text-gray-400">
            Already registered?{' '}
            <Link to="/login" className="text-navy-light font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        {/* ── Illustration Side — same structure as Login ── */}
        <div className="hidden md:flex flex-col items-center justify-center flex-[0_0_320px]
                        bg-gradient-to-br from-navy to-navy-light p-10 gap-6">

          <div className="text-center text-white/90">
            <h3 className="font-sans font-semibold text-[1.25rem] mb-2 text-white">Join Us!</h3>
            <p className="text-[0.88rem] leading-[1.55] text-white/72">
              Create your account to start managing your CCS lab sit-in sessions.
            </p>
          </div>

          {/* Sign-in nudge */}
          <Link
            to="/login"
            className="border-2 border-white/40 hover:border-white text-white/80 hover:text-white
                       rounded-lg px-6 py-2 text-[0.82rem] font-semibold no-underline
                       transition-all duration-200 text-center"
          >
            Already registered? Sign in
          </Link>

        </div>

      </div>
    </div>
  );
}