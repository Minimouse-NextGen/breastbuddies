import { useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { BrandTagline, BrandWordmark, LogoMark, SmallIcon } from "../components/Graphics"
import { isAllowedAdminEmail, verifyAdminAccess } from "../services/adminAccess"
import { isSupabaseConfigured, supabase, supabaseConfigError } from "../services/supabaseClient"

function AdminLogin({ session }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [message, setMessage] = useState(location.state?.message || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (session && isAllowedAdminEmail(session.user.email)) {
    return <Navigate to="/admin" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage("")

    if (!isSupabaseConfigured) {
      setMessage(supabaseConfigError)
      return
    }

    const normalizedEmail = email.trim().toLowerCase()

    if (!isAllowedAdminEmail(normalizedEmail)) {
      setMessage("This email is not allowed to access the admin panel.")
      return
    }

    try {
      setIsSubmitting(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      })

      if (error) {
        throw error
      }

      const hasAdminAccess = await verifyAdminAccess(supabase)

      if (!hasAdminAccess) {
        await supabase.auth.signOut()
        setMessage("This account is not authorized for admin access.")
        return
      }

      navigate("/admin", { replace: true })
    } catch (error) {
      setMessage(error.message || "Unable to sign in.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-[#F8FAFC] font-inter text-[#0F172A]">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(circle at 78% 16%, rgba(3, 83, 164, 0.1), transparent 22%),
            radial-gradient(circle at 88% 82%, rgba(255, 71, 126, 0.08), transparent 20%),
            linear-gradient(135deg, #f8fbff 0%, #f3f8fd 48%, #eef5fb 100%)
          `,
        }}
      />
      <div className="relative grid min-h-screen w-full lg:grid-cols-[54fr_46fr]">
        <section
          className="relative hidden overflow-hidden lg:flex"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/admin-left-bg.png')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />

          <div className="relative z-10 flex h-full w-full flex-col px-[clamp(24px,4vw,52px)] py-[clamp(22px,3.4vh,42px)]">
            <div className="flex max-h-[90px] items-start gap-4">
              <LogoMark className="h-[72px] w-[72px] shrink-0 xl:h-[84px] xl:w-[84px]" />
              <div className="min-w-0 pt-1">
                <BrandWordmark className="block" sizeClassName="text-[clamp(1.9rem,3vw,2.75rem)]" />
                <BrandTagline className="mt-2 block max-w-[260px] font-inter text-[11px] font-semibold leading-[1.35] text-[#FF477E] xl:text-[12px]" />
                <div className="mt-3 flex items-center gap-3 text-[#FF477E]" aria-hidden="true">
                  <span className="h-px w-16 bg-[#FF477E]/55 xl:w-24" />
                  <span className="text-sm leading-none">&hearts;</span>
                  <span className="h-px w-16 bg-[#FF477E]/55 xl:w-24" />
                </div>
              </div>
            </div>

            <div className="relative z-10 flex min-h-0 flex-1 items-start">
              <div className="flex max-w-[min(500px,64%)] flex-col gap-[clamp(14px,1.9vh,22px)] pt-[clamp(14px,2.2vh,28px)]">
                <div>
                  <h1 className="font-playfair text-[clamp(34px,3.65vw,50px)] font-bold leading-[1.08] text-[#0353A4]">
                    <span className="block">Manage consultations</span>
                    <span className="block">
                      with <span className="text-[#FF477E]">confidence</span>
                    </span>
                  </h1>
                  <div className="mt-5 h-1 w-14 rounded-full bg-[#FF477E]" />
                </div>

                <p className="max-w-[420px] text-[clamp(15px,1vw,17px)] leading-[1.65] text-[#0F172A]/82">
                  Secure access to manage consultations, bookings, and mother-care support.
                </p>
              </div>
            </div>
          </div>

          <img
            src="/admin-left-momchild.png"
            alt=""
            className="pointer-events-none absolute bottom-[clamp(10px,2.4vh,28px)] left-[clamp(20px,3vw,44px)] z-0 h-auto max-h-[53vh] w-[clamp(520px,36vw,680px)] object-contain"
            aria-hidden="true"
          />
        </section>

        <section className="relative hidden min-h-screen items-center justify-center overflow-hidden px-5 py-4 sm:px-8 lg:flex lg:px-[clamp(18px,3vw,44px)] lg:py-[clamp(14px,2vh,24px)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,71,126,0.08),transparent_24%)]" aria-hidden="true" />
          <div className="flex w-full items-center justify-center">
            <form
              className="relative flex h-auto w-[min(500px,92%)] flex-col rounded-[24px] border border-white/70 bg-[rgba(255,255,255,0.78)] px-[clamp(22px,2vw,28px)] py-[clamp(16px,1.8vh,22px)] shadow-[0_24px_72px_rgba(15,23,42,0.10)] backdrop-blur-[18px]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src="/login-shield.png"
                  alt=""
                  className="mb-3 h-[84px] w-[84px] object-contain xl:h-[92px] xl:w-[92px]"
                  aria-hidden="true"
                />

                <h2 className="font-playfair text-[clamp(31px,2.8vw,42px)] font-bold leading-[1.06]">
                  <span className="text-[#0353A4]">Admin </span>
                  <span className="text-[#FF477E]">Login</span>
                </h2>
                <div className="mt-2.5 flex w-[148px] items-center gap-3 text-[#FF477E]" aria-hidden="true">
                  <span className="h-px flex-1 bg-[#FF477E]/45" />
                  <span className="text-lg leading-none">&hearts;</span>
                  <span className="h-px flex-1 bg-[#FF477E]/45" />
                </div>

                <p className="mt-3 text-[14px] leading-5 text-[#64748B]">
                  Secure access for <BrandWordmark sizeClassName="text-[15px]" />
                  <span className="text-[#64748B]"> team</span>
                </p>
              </div>

              <div className="mt-4 space-y-2.5">
                <label className="block">
                  <span className="text-sm font-bold text-[#0F172A]">Email Address</span>
                  <span className="mt-2 flex h-[48px] items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white/90 px-4">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#94A3B8]" fill="none" aria-hidden="true">
                      <path d="M4 6h16v12H4V6Zm1.5 2.5 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      placeholder="Enter your email"
                      className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[#0F172A]">Password</span>
                  <span className="mt-2 flex h-[48px] items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white/90 px-4">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#94A3B8]" fill="none" aria-hidden="true">
                      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      placeholder="Enter your password"
                      className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                    />
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#94A3B8]" fill="none" aria-hidden="true">
                      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </span>
                </label>
              </div>

              <div className="mt-2 text-sm">
                <label className="inline-flex items-center gap-3 font-semibold text-[#0F172A]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-5 w-5 rounded border-[#E2E8F0] accent-[#FF477E]"
                  />
                  Remember me
                </label>
              </div>

              {message && (
                <p className="mt-3 rounded-xl bg-pink-50 px-4 py-2.5 text-sm font-semibold text-[#B8325C]">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bb-button bb-button-primary bb-button-full mt-3 min-h-[58px] overflow-visible whitespace-nowrap"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M14 5l7 7-7 7M21 12H9M9 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <div className="mt-3 border-t border-[#E2E8F0] pt-3">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.84rem] font-medium text-[#64748B]">
                  <SmallIcon type="shield" className="h-5 w-5" color="#0353A4" />
                  <span>Secure</span>
                  <span className="text-[#FF477E]">&bull;</span>
                  <span>Private</span>
                  <span className="text-[#FF477E]">&bull;</span>
                  <span>Trusted</span>
                </div>
                <p className="mt-2 text-center text-[11.5px] leading-4 text-[#64748B]">
                  &copy; 2025 <BrandWordmark sizeClassName="text-[12px]" />
                  <span className="text-[#64748B]">. All rights reserved.</span>
                </p>
              </div>
            </form>
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-8 lg:hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(3,83,164,0.08),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#f3f8fd_52%,#eef5fb_100%)]" aria-hidden="true" />
          <div className="flex w-full max-w-[440px] flex-col items-center">
            <div className="mb-6 flex items-start gap-3 self-start">
              <LogoMark className="h-16 w-16 shrink-0" />
              <div className="pt-1">
                <BrandWordmark className="block" sizeClassName="text-[2rem]" />
                <BrandTagline className="mt-2 block max-w-[220px] text-[11px] font-semibold leading-[1.35] text-[#FF477E]" />
              </div>
            </div>

            <form
              className="relative w-full rounded-[24px] border border-white/70 bg-[rgba(255,255,255,0.82)] px-6 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-[18px] sm:px-8"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src="/login-shield.png"
                  alt=""
                  className="mb-4 h-14 w-14 object-contain"
                  aria-hidden="true"
                />

                <h2 className="font-playfair text-[34px] font-bold leading-[1.1]">
                  <span className="text-[#0353A4]">Admin </span>
                  <span className="text-[#FF477E]">Login</span>
                </h2>
                <p className="mt-3 text-[15px] leading-6 text-[#64748B]">
                  Secure access for <BrandWordmark sizeClassName="text-[15px]" />
                  <span className="text-[#64748B]"> team</span>
                </p>
              </div>

              <div className="mt-7 space-y-[18px]">
                <label className="block">
                  <span className="text-sm font-bold text-[#0F172A]">Email Address</span>
                  <span className="mt-2.5 flex h-[50px] items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#94A3B8]" fill="none" aria-hidden="true">
                      <path d="M4 6h16v12H4V6Zm1.5 2.5 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      placeholder="Enter your email"
                      className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[#0F172A]">Password</span>
                  <span className="mt-2.5 flex h-[50px] items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#94A3B8]" fill="none" aria-hidden="true">
                      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      placeholder="Enter your password"
                      className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                    />
                  </span>
                </label>
              </div>

              <div className="mt-[18px] text-sm">
                <label className="inline-flex items-center gap-3 font-semibold text-[#0F172A]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-5 w-5 rounded border-[#E2E8F0] accent-[#FF477E]"
                  />
                  Remember me
                </label>
              </div>

              {message && (
                <p className="mt-4 rounded-xl bg-pink-50 px-4 py-3 text-sm font-semibold text-[#B8325C]">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bb-button bb-button-primary bb-button-full mt-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M14 5l7 7-7 7M21 12H9M9 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <div className="mt-6 border-t border-[#E2E8F0] pt-5">
                <div className="flex items-center justify-center gap-3 text-[0.9rem] font-medium text-[#64748B]">
                  <SmallIcon type="shield" className="h-5 w-5" color="#0353A4" />
                  <span>Secure</span>
                  <span className="text-[#FF477E]">&bull;</span>
                  <span>Private</span>
                  <span className="text-[#FF477E]">&bull;</span>
                  <span>Trusted</span>
                </div>
                <p className="mt-4 text-center text-[12px] leading-5 text-[#64748B]">
                  &copy; 2025 <BrandWordmark sizeClassName="text-[12px]" />
                  <span className="text-[#64748B]">. All rights reserved.</span>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminLogin
