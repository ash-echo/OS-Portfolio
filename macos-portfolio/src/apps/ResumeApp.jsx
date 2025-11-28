import React from 'react';
import { Briefcase, GraduationCap, Award, Code, Mail, Phone, MapPin, Linkedin, Github, Globe, Calendar } from 'lucide-react';

const ResumeApp = () => {
    return (
        <div className="h-full bg-white overflow-auto">
            <div className="max-w-4xl mx-auto p-8" data-resume-content>
                {/* Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Ashwath P</h1>
                    <p className="text-xl text-blue-600 font-medium mb-4">Full Stack & AI-Driven Developer</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Phone size={16} />
                            <span>+91-6369321280</span>
                        </div>
                        <a href="https://ashwathp-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                            <Globe size={16} />
                            <span>ashwathp-portfolio.vercel.app</span>
                        </a>
                        <a href="https://github.com/ash-echo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                            <Github size={16} />
                            <span>github.com/ash-echo</span>
                        </a>
                        <a href="https://linkedin.com/in/ashwath-p-devloper" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                            <Linkedin size={16} />
                            <span>linkedin.com/in/ashwath-p-devloper</span>
                        </a>
                    </div>
                </div>

                {/* Summary */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Award size={24} className="text-blue-600" />
                        Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Motivated full-stack and AI-driven developer skilled in building scalable applications, real-time systems, and automated pipelines. Experienced with cloud deployments, DevOps practices, and modern UI design workflows. Passionate about production-level architecture, automation, and integrating intelligent features through LLM and API-driven workflows. Strong collaborative mindset demonstrated through hackathons, technical clubs, and rapid prototyping environments.
                    </p>
                </div>

                {/* Education */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <GraduationCap size={24} className="text-blue-600" />
                        Education
                    </h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Vellore Institute of Technology, Chennai</h3>
                                <p className="text-gray-700">M.Tech Integrated – Software Engineering</p>
                            </div>
                            <div className="text-right">
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-1">Present</span>
                                <p className="text-sm text-gray-500">2024 – 2029</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Vivekananda Vidyalaya Jr. College (CBSE)</h3>
                                <p className="text-gray-700">LKG to 12th Standard</p>
                            </div>
                            <div className="text-right">
                                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-1">Completed</span>
                                <p className="text-sm text-gray-500">2009 – 2023</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experience */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Briefcase size={24} className="text-blue-600" />
                        Experience
                    </h2>

                    <div className="space-y-6">
                        <div className="border-l-4 border-blue-600 pl-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">Independent Developer – Full-Stack, AI & DevOps</h3>
                                <span className="text-sm text-gray-500">Jan 2023 – Present</span>
                            </div>
                            <p className="text-gray-600 mb-2 italic">Self-driven Development</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                <li>Developed production-ready full-stack applications with modular architecture, multi-page routing, and automated workflows.</li>
                                <li>Designed scalable backend logic using Python (Streamlit), structured state management, and efficient CSV/DB operations.</li>
                                <li>Integrated AI workflows using GenAI, OCR, evaluation pipelines, text extraction, and LLM automation.</li>
                                <li>Managed cloud deployments using Linux servers, CI/CD pipelines, GitHub Actions, and automated build scripts.</li>
                                <li>Built reusable SCSS/CSS UI systems with responsive layouts and component-driven design.</li>
                            </ul>
                        </div>

                        <div className="border-l-4 border-gray-400 pl-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">Academic Developer</h3>
                                <span className="text-sm text-gray-500">2024 – Present</span>
                            </div>
                            <p className="text-gray-600 mb-2 italic">VIT Chennai</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                <li>Developed academic full-stack systems with unique identifiers, real-time features, workflows, and modular design.</li>
                                <li>Integrated AI/LLM APIs for evaluation, automation, and intelligent data interpretation.</li>
                                <li>Collaborated with Nexus Club and hackathon teams to build and deploy polished project deliverables.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Major Projects */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Code size={24} className="text-blue-600" />
                        Major Projects
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="text-lg font-bold text-gray-900">EvalGenius – AI Handwritten Answer Evaluation</h3>
                                <a href="https://ashwathp-portfolio.vercel.app" className="text-blue-600 text-sm hover:underline">Live Demo</a>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">AI-driven handwritten answer evaluation using typed PDF answer keys powered by Gemini 2.5 Flash.</p>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                <li>Built full OCR + LLM evaluation pipeline with reliability-focused fallback behaviour.</li>
                                <li>Integrated priority-based flow for API load spikes ensuring consistent output.</li>
                                <li>Multi-page UI for document upload, evaluation results, scoring, and verifications.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">LezLearn – Video Learning Platform</h3>
                            <p className="text-sm text-gray-600 mb-2">Full-stack LMS enabling instructors to upload courses, manage enrollments, and receive payments.</p>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                <li>Built course upload, dashboards, content delivery, and secure routing.</li>
                                <li>Designed SCSS-based theming for clean UI and mobile responsiveness.</li>
                                <li>Optimized for future subscription and wallet-based payment expansion.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">HelpConnect – Social Donation & Help Platform</h3>
                            <p className="text-sm text-gray-600 mb-2">Community-driven system for donations, volunteer help, and real-time messaging.</p>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                <li>Engineered donation flow, WebSocket chat system, user profile system, and feed algorithm.</li>
                                <li>Built X/Threads-style interface with reusable components and smooth interactions.</li>
                                <li>Integrated Stripe payment processing for secure, real-time donation transactions.</li>
                            </ul>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="text-lg font-bold text-gray-900">MacOS-Inspired Interactive Portfolio</h3>
                                <a href="https://ashwathp-portfolio.vercel.app" className="text-blue-600 text-sm hover:underline">Live Demo</a>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">A fully interactive portfolio built as a functional MacOS interface with draggable apps, folders, and animations.</p>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                <li>Implemented a MacOS-style UI with draggable windows, animations, and app-launcher experience.</li>
                                <li>Built working file explorer, multi-window navigation, custom terminal simulation, and interactive tools.</li>
                                <li>Integrated retro gaming emulators supporting Sonic 2, Pokemon Fire Red, and classic GameBoy titles.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Code size={24} className="text-blue-600" />
                        Technical Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Languages & Frameworks</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Python', 'Java', 'C', 'C++', 'React', 'Streamlit', 'SCSS/CSS'].map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Cloud & DevOps</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Linux CLI', 'Git', 'GitHub Actions', 'Docker', 'CI/CD', 'Automation'].map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="font-semibold text-gray-800 mb-2">AI & Integration</h3>
                            <div className="flex flex-wrap gap-2">
                                {['LLM APIs', 'GenAI', 'OCR Workflows', 'Text Extraction', 'Evaluation Pipelines'].map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Positions of Responsibility & Achievements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Award size={20} className="text-blue-600" />
                            Positions of Responsibility
                        </h2>
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-900">Design Lead, Nexus Technical Club</h3>
                            <p className="text-sm text-gray-500">VIT Chennai | Aug 2024 – Present</p>
                            <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                                <li>Led UI/UX, branding, and creative direction for college tech events.</li>
                                <li>Coordinated development teams and streamlined project workflows.</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Award size={20} className="text-blue-600" />
                            Hackathon Participation
                        </h2>
                        <ul className="space-y-3">
                            <li>
                                <h3 className="font-semibold text-gray-900 text-sm">VoidV1 Hackathon – VIT Chennai (2025)</h3>
                                <p className="text-xs text-gray-600">Built a rapid prototype under a 24-hour sprint with clean architecture.</p>
                            </li>
                            <li>
                                <h3 className="font-semibold text-gray-900 text-sm">HackTheGap Hackathon – VIT Chennai (2025)</h3>
                                <p className="text-xs text-gray-600">Worked on real-time systems and quick deployment workflows.</p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResumeApp;
