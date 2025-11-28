import React from 'react';
import { Github, Globe, Terminal, Cpu, Layout, Gamepad2, Layers, Code, Server, Play, Zap, Eye } from 'lucide-react';

const OSPortfolioApp = () => {
    return (
        <div className="h-full bg-white overflow-y-auto font-sans text-gray-900">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white py-24 px-8 text-center overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-block px-4 py-1.5 mb-6 border border-blue-400/30 rounded-full bg-blue-500/10 backdrop-blur-sm text-blue-300 font-medium text-sm">
                        Experience the web like never before
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                        MacOS Portfolio
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                        A fully functional desktop environment running entirely in your browser.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://ashwathp-portfolio.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg shadow-blue-900/20"
                        >
                            <Globe size={20} />
                            Live Demo
                        </a>
                        <a
                            href="https://github.com/ash-echo/OS-Portfolio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600/30 backdrop-blur-md border border-blue-400/30 text-white rounded-full font-bold hover:bg-blue-600/40 transition-all"
                        >
                            <Github size={20} />
                            View Source
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
                {/* About Section */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="p-2 bg-blue-100 rounded-lg text-blue-600"><Layout size={24} /></span>
                            Web vs. Desktop? Why not both.
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Traditional portfolios are static and linear. I wanted to build something that invites exploration and demonstrates technical proficiency through interactivity.
                        </p>
                        <p className="text-lg text-gray-800 font-medium leading-relaxed">
                            This project recreates the MacOS experience with pixel-perfect detail, featuring draggable windows, a working dock, and a real file system—all built with standard web technologies.
                        </p>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200 shadow-inner">
                        <div className="aspect-video bg-white rounded-xl shadow-lg overflow-hidden relative">
                            <img src="/proj1/desktop.png" alt="Desktop Interface" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">System Capabilities</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">More than just a pretty UI. It's a functional OS simulation.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Layout,
                                title: 'Window Management',
                                desc: 'Draggable, resizable, and focusable windows powered by React RND.'
                            },
                            {
                                icon: Terminal,
                                title: 'Interactive Terminal',
                                desc: 'A working CLI with custom commands, file navigation, and easter eggs.'
                            },
                            {
                                icon: Gamepad2,
                                title: 'Retro Gaming',
                                desc: 'Integrated emulators for Pokemon Fire Red and Sonic 2 directly on the desktop.'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Workflow & Vision */}
                <section className="grid md:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Cpu className="text-blue-600" /> Core Architecture
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Built for performance and extensibility. The system handles complex state management to simulate an OS environment.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                                    <span className="text-gray-700"><strong>State Management:</strong> Global context handles window stacking, focus, and z-indexing.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                                    <span className="text-gray-700"><strong>File System:</strong> Virtual file system supporting nested folders and file operations.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                                    <span className="text-gray-700"><strong>Animations:</strong> GSAP-powered transitions for smooth opening, closing, and minimizing.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                            <img src="/proj1/gif3.gif" alt="Window Management" className="w-full h-auto" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Layers className="text-blue-600" /> App Ecosystem
                            </h3>
                            <p className="text-gray-600 mb-4">
                                A diverse set of applications demonstrating different web capabilities.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="p-1 bg-blue-50 rounded text-blue-600"><Terminal size={16} /></div>
                                    <span className="text-gray-700"><strong>Productivity:</strong> Text Editor, Finder, Trash, and Terminal.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1 bg-blue-50 rounded text-blue-600"><Gamepad2 size={16} /></div>
                                    <span className="text-gray-700"><strong>Entertainment:</strong> Photos, Music, and Games.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                            <img src="/proj1/games and apps.png" alt="App Ecosystem" className="w-full h-auto" />
                        </div>
                    </div>
                </section>

                {/* Architecture & Tech Stack */}
                <section className="bg-gray-900 text-white rounded-3xl p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Server className="text-blue-400" /> Engineering
                            </h2>
                            <p className="text-gray-300 mb-6">
                                The project leverages modern React patterns to maintain performance even with multiple "heavy" apps running simultaneously.
                            </p>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <img src="/proj1/portfolio.png" alt="Project Overview" className="w-full h-auto rounded" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Code className="text-blue-400" /> Tech Stack
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-blue-300 font-semibold mb-2">Core</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['React 19', 'Vite', 'Tailwind CSS v4'].map(t => (
                                            <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-sm">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-blue-300 font-semibold mb-2">Libraries</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['React RND', 'GSAP', 'Lucide React'].map(t => (
                                            <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-sm">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-blue-300 font-semibold mb-2">Features</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Local Storage', 'Context API', 'Custom Hooks'].map(t => (
                                            <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-sm">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Demo Gallery */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Play className="text-blue-600" /> Interactive Demo
                    </h2>
                    <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 group">
                            <img src="/proj1/gif4.gif" alt="Interactive Demo" className="w-full h-auto" />
                        </div>
                    </div>
                </section>

                {/* Footer / Credits */}
                <div className="border-t border-gray-200 pt-12 text-center text-gray-600">
                    <p className="mb-2">Designed & Built by <strong>Ashwath ⚡</strong></p>
                    <p className="text-sm mt-4 text-gray-400">Licensed under MIT License</p>
                </div>
            </div>
        </div>
    );
};

export default OSPortfolioApp;
