import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Clock,
  Download,
  FileText,
  LayoutTemplate,
  Palette,
  PenLine,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import heroImage from '../assets/hero.png';

const LandingPage = () => {
  const { user } = useAuth();

  const heroCopy = useMemo(
    () =>
      'Build your next\ndream resume.\nCreate ATS-friendly, beautifully designed resumes in minutes using our advanced AI builder. Connect directly with top recruiters.',
    []
  );
  const [typedCopy, setTypedCopy] = useState('');

  useEffect(() => {
    let cursor = 0;

    const timer = setInterval(() => {
      cursor += 1;
      setTypedCopy(heroCopy.slice(0, cursor));

      if (cursor >= heroCopy.length) {
        clearInterval(timer);
      }
    }, 26);

    return () => clearInterval(timer);
  }, [heroCopy]);

  const heroLines = typedCopy.split('\n');
  const titleLineOne = heroLines[0] || '';
  const titleLineTwo = heroLines[1] || '';
  const subtitle = heroLines.slice(2).join(' ');
  const titleLength = 'Build your next\ndream resume.'.length;
  const cursorInTitle = typedCopy.length <= titleLength;

  const features = [
    { icon: Sparkles, title: 'AI-Powered Builder', desc: 'Generate strong summaries, bullet points, and profile content for your role.' },
    { icon: Target, title: 'ATS Optimized', desc: 'Use clean, recruiter-ready layouts designed to scan well in hiring systems.' },
    { icon: LayoutTemplate, title: 'Professional Templates', desc: 'Choose modern, corporate, creative, startup, executive, and minimal designs.' },
    { icon: PenLine, title: 'Guided Resume Forms', desc: 'Add education, skills, projects, experience, and contact details step by step.' },
    { icon: Palette, title: 'Live Resume Preview', desc: 'See your resume update as you write so every section stays polished.' },
    { icon: Download, title: 'Export Ready', desc: 'Create a finished resume that is ready to download, share, and submit.' },
    { icon: Users, title: 'Recruiter Connection', desc: 'Present your profile clearly and connect directly with top recruiters.' },
    { icon: ShieldCheck, title: 'Secure Workspace', desc: 'Keep your resume data organized inside your own protected dashboard.' },
    { icon: Clock, title: 'Fast Editing', desc: 'Update old resumes quickly instead of rebuilding everything from scratch.' },
  ];

  const steps = [
    { icon: LayoutTemplate, title: 'Choose a template', desc: 'Start from a layout that fits your role, industry, and career level.' },
    { icon: FileText, title: 'Fill your details', desc: 'Enter your profile, education, skills, projects, and work experience.' },
    { icon: Sparkles, title: 'Improve with AI', desc: 'Use smart suggestions to make your resume clearer and more professional.' },
    { icon: Briefcase, title: 'Apply with confidence', desc: 'Export your resume and share it with recruiters or job portals.' },
  ];

  const highlights = [
    'Built for students, freshers, and professionals',
    'Designed for quick edits and multiple resume versions',
    'Focused on clean formatting, readable sections, and hiring clarity',
  ];

  return (
    <div className="resume-home min-h-screen flex flex-col bg-[var(--background)] transition-colors duration-300">
      <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-[#222] dark:bg-black/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">ResumePro</h1>
              <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">AI Resume Builder</p>
            </div>
            <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
              <a href="#features" className="hover:text-slate-950 dark:hover:text-white">Features</a>
              <a href="#how-it-works" className="hover:text-slate-950 dark:hover:text-white">How it works</a>
              <a href="#about" className="hover:text-slate-950 dark:hover:text-white">About</a>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <Link to="/dashboard" className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="hidden px-4 py-2 font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:inline-flex">
                    Sign In
                  </Link>
                  <Link to="/register" className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <section className="pt-28 pb-16 sm:pt-32 lg:pb-20">
          <div className="max-w-7xl mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-5 inline-flex rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-600 shadow-sm dark:border-[#2A2A2A] dark:bg-[#0A0A0A] dark:text-slate-300">
                Create, optimize, and share resumes faster
              </p>
              <h2
                className="min-h-[8.2rem] text-5xl font-black leading-[1.05] text-slate-950 dark:text-white sm:min-h-[9.6rem] sm:text-6xl lg:min-h-[10.8rem] lg:text-7xl"
                aria-label="Build your next dream resume."
              >
                <span>{titleLineOne}</span>
                <br />
                <span className="text-slate-500 dark:text-slate-400">{titleLineTwo}</span>
                {cursorInTitle && <span className="typewriter-cursor" aria-hidden="true" />}
              </h2>
              <p className="mt-6 min-h-[6.2rem] max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400 md:text-xl">
                {subtitle}
                {!cursorInTitle && <span className="typewriter-cursor" aria-hidden="true" />}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to={user ? '/dashboard' : '/register'} className="inline-flex items-center justify-center rounded-md bg-slate-900 px-7 py-3.5 text-base font-bold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200">
                  {user ? 'Go to Dashboard' : 'Create My Resume'} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                {!user && (
                  <Link to="/login" className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-7 py-3.5 text-base font-bold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-[#333] dark:bg-[#0A0A0A] dark:text-white dark:hover:border-[#555]">
                    Sign In
                  </Link>
                )}
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-4 text-center dark:divide-[#252525] dark:border-[#252525]">
                <div>
                  <p className="text-2xl font-black text-slate-950 dark:text-white">6+</p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Templates</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-950 dark:text-white">ATS</p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Friendly</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-950 dark:text-white">AI</p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Assisted</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative mx-auto w-full max-w-lg"
            >
              <div className="absolute inset-x-8 top-8 h-72 rounded-lg border border-violet-200 bg-violet-50 dark:border-violet-500/30 dark:bg-violet-500/10" />
              <div className="relative rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 dark:border-[#2A2A2A] dark:bg-[#090909] dark:shadow-none">
                <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-[#222]">
                  <div>
                    <p className="text-sm font-bold text-slate-950 dark:text-white">Resume Preview</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">AI enhanced and recruiter ready</p>
                  </div>
                  <div className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    92% Match
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-[0.72fr_1fr]">
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-[#222] dark:bg-[#111]">
                    <img src={heroImage} alt="ResumePro visual layer" className="mx-auto h-32 w-32 object-contain" />
                    <div className="mt-4 space-y-2">
                      <span className="block h-2 rounded bg-slate-300 dark:bg-slate-700" />
                      <span className="block h-2 w-10/12 rounded bg-slate-200 dark:bg-slate-800" />
                      <span className="block h-2 w-8/12 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {['Professional summary', 'Technical skills', 'Projects and experience', 'Education'].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-md border border-slate-100 bg-white p-3 dark:border-[#222] dark:bg-black">
                        <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="border-t border-slate-200 bg-white/70 py-16 dark:border-[#222] dark:bg-[#050505]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400">Features</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white md:text-4xl">
                Everything you need to create a job-ready resume.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                ResumePro combines AI writing help, guided editing, template selection, preview, and recruiter-focused formatting in one simple workspace.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="rounded-lg border border-slate-200 bg-white p-6 text-left shadow-sm transition-colors duration-300 hover:border-slate-300 dark:border-[#2A2A2A] dark:bg-[#0A0A0A] dark:hover:border-[#555]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-slate-50 dark:border-[#333] dark:bg-[#151515]">
                    <feature.icon className="h-5 w-5 text-slate-800 dark:text-slate-200" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-950 dark:text-white">{feature.title}</h3>
                  <p className="leading-7 text-slate-500 dark:text-slate-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400">How it works</p>
                <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white md:text-4xl">
                  From blank page to finished resume in a focused flow.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                  The builder keeps the process simple: pick a design, add your details, improve your content, and export a polished resume.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="rounded-lg border border-slate-200 bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#0A0A0A]"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-900 text-white dark:bg-white dark:text-black">
                        <step.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-black text-slate-400">0{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">{step.title}</h3>
                    <p className="mt-2 leading-7 text-slate-500 dark:text-slate-400">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-slate-200 bg-slate-950 py-16 text-white dark:border-[#222]">
          <div className="max-w-7xl mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase text-slate-400">About ResumePro</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                A resume workspace made for real job applications.
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                This project helps users create professional resumes without struggling with layout, wording, or formatting. It brings templates, AI content support, live preview, dashboard management, and recruiter-focused presentation together so users can apply faster with confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to={user ? '/dashboard' : '/register'} className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3.5 text-base font-bold text-black transition-all hover:bg-slate-200">
                  Start Building <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-xl font-bold">Project focus</h3>
              <div className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                    <p className="leading-7 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
