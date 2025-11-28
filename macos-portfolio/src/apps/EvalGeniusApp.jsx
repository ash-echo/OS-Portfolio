import React from 'react';
import { Github, Globe, Cpu, Zap, Eye, Layers, Code, Server, Play } from 'lucide-react';

const EvalGeniusApp = () => {
    return (
        <div className="h-full bg-white overflow-y-auto font-sans text-gray-900">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white py-24 px-8 text-center overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-block px-4 py-1.5 mb-6 border border-indigo-400/30 rounded-full bg-indigo-500/10 backdrop-blur-sm text-indigo-300 font-medium text-sm">
                        Pioneering the future of educational assessment
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">
                        EvalGenius
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Precision, speed, and fairness in every grade. Powered by Agentic AI.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://eval-genius.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-900 rounded-full font-bold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg shadow-indigo-900/20"
                        >
                            <Globe size={20} />
                            Live Demo
                        </a>
                        <a
                            href="https://github.com/ash-echo/EvalGenius"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600/30 backdrop-blur-md border border-indigo-400/30 text-white rounded-full font-bold hover:bg-indigo-600/40 transition-all"
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
                            <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Zap size={24} /></span>
                            Grading is Broken.
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Educators spend countless hours manually reviewing papers—a process that is slow, prone to errors, and takes time away from teaching.
                        </p>
                        <p className="text-lg text-gray-800 font-medium leading-relaxed">
                            EvalGenius fixes this. We've built a cutting-edge, AI-powered grading platform that leverages multimodal AI agents to read handwritten notes, understand diagrams, and grade with human-level precision in seconds.
                        </p>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200 shadow-inner">
                        <div className="aspect-video bg-white rounded-xl shadow-lg overflow-hidden relative">
                            <img src="/proj2/upload-ui.png" alt="Upload UI" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Key Features</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Designed to free educators from the burden of manual grading.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Eye,
                                title: 'Multimodal Ingestion',
                                desc: 'Accepts PDFs, images, and scanned documents. Understands scratch work vs. final answers.'
                            },
                            {
                                icon: Zap,
                                title: 'Instant Grading',
                                desc: 'Grades full-length papers in under 30 seconds with human-level precision.'
                            },
                            {
                                icon: Layers,
                                title: 'Deep Analysis',
                                desc: 'Identifies and evaluates scientific diagrams, charts, and graphs.'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
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
                                <Cpu className="text-indigo-600" /> The Agentic Workflow
                            </h3>
                            <p className="text-gray-600 mb-4">
                                EvalGenius isn't just a wrapper around an LLM; it's a sophisticated workflow mimicking a human grader.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                                    <span className="text-gray-700"><strong>Ingestion:</strong> Pixel-perfect OCR deconstructs the document.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                                    <span className="text-gray-700"><strong>Reasoning:</strong> Agents analyze logic and cross-reference with the rubric.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                                    <span className="text-gray-700"><strong>Report:</strong> Detailed feedback and precise scoring generated.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                            <img src="/proj2/workflow.png" alt="Agentic Workflow" className="w-full h-auto" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Eye className="text-indigo-600" /> Vision Layer
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Our proprietary Vision Layer doesn't just "read" text; it "sees" the paper.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="p-1 bg-indigo-50 rounded text-indigo-600"><Layers size={16} /></div>
                                    <span className="text-gray-700"><strong>Diagram Recognition:</strong> Evaluates scientific diagrams & charts.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1 bg-indigo-50 rounded text-indigo-600"><Code size={16} /></div>
                                    <span className="text-gray-700"><strong>Logic Mapping:</strong> Traces steps in math/physics for partial credit.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                            <img src="/proj2/analyze.png" alt="Vision Layer Analysis" className="w-full h-auto" />
                        </div>
                    </div>
                </section>

                {/* Architecture & Tech Stack */}
                <section className="bg-gray-900 text-white rounded-3xl p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Server className="text-indigo-400" /> Architecture
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Serverless, client-side architecture for maximum privacy and low latency. The entire grading pipeline runs securely, leveraging Gemini 2.5 for reasoning.
                            </p>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <img src="/proj2/architecture.png" alt="System Architecture" className="w-full h-auto rounded" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Code className="text-indigo-400" /> Tech Stack
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-indigo-300 font-semibold mb-2">Frontend</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Framer Motion'].map(t => (
                                            <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-sm">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-indigo-300 font-semibold mb-2">AI Core</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Google Gemini 2.5', 'Google GenAI SDK'].map(t => (
                                            <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-sm">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-indigo-300 font-semibold mb-2">Processing</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['PDF.js', 'Canvas API', 'JSON Schema'].map(t => (
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
                        <Play className="text-indigo-600" /> See it in Action
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 group">
                            <img src="/proj2/gif1.gif" alt="Demo 1" className="w-full h-auto" />
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 group">
                            <img src="/proj2/gif2.gif" alt="Demo 2" className="w-full h-auto" />
                        </div>
                    </div>
                </section>

                {/* Footer / Credits */}
                <div className="border-t border-gray-200 pt-12 text-center text-gray-600">
                    <p className="mb-2">Built by <strong>Ashwath ⚡</strong></p>
                    <p className="text-sm">Collaborated with Hemanth Kumar, Thejesh</p>
                    <p className="text-sm mt-4 text-gray-400">Licensed under MIT License</p>
                </div>
            </div>
        </div>
    );
};

export default EvalGeniusApp;
