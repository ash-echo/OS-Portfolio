import React from 'react';
import { Github, Linkedin, Mail, Globe, Phone } from 'lucide-react';

const AboutMeApp = () => {
    return (
        <div className="h-full overflow-auto bg-gray-50">
            <div className="p-8 max-w-4xl mx-auto font-sans text-gray-800 leading-relaxed bg-white min-h-full shadow-sm">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row gap-8 items-center mb-10 border-b pb-8">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                        <img src="/profile.jpg" alt="Ashwath P" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Ashwath P</h1>
                        <p className="text-xl text-blue-600 font-medium mb-4">Full-Stack & AI-Driven Developer</p>
                        <p className="text-gray-600 max-w-xl">
                            Motivated full-stack and AI-driven developer skilled in building scalable applications, real-time systems, and automated pipelines. Passionate about production-level architecture and integrating intelligent features through LLM and API-driven workflows.
                        </p>
                    </div>
                </div>

                {/* Contact Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    <a href="https://ashwathp-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <Globe className="text-blue-500" size={20} />
                        <span className="text-gray-700">ashwathp-portfolio.vercel.app</span>
                    </a>
                    <a href="https://github.com/ash-echo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <Github className="text-gray-800" size={20} />
                        <span className="text-gray-700">github.com/ash-echo</span>
                    </a>
                    <a href="https://linkedin.com/in/ashwath-p-devloper" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <Linkedin className="text-blue-700" size={20} />
                        <span className="text-gray-700">linkedin.com/in/ashwath-p-devloper</span>
                    </a>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <Phone className="text-green-600" size={20} />
                        <span className="text-gray-700">+91-6369321280</span>
                    </div>
                </div>

                {/* Skills Section */}
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                    <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                    Technical Skills
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-gray-50 p-5 rounded-xl">
                        <h3 className="font-semibold mb-3 text-gray-900 border-b border-gray-200 pb-2">Languages & Frameworks</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Python', 'Java', 'C/C++', 'React', 'Node.js', 'Streamlit', 'SCSS/CSS'].map(skill => (
                                <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                        <h3 className="font-semibold mb-3 text-gray-900 border-b border-gray-200 pb-2">Cloud & DevOps</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Linux CLI', 'Git/GitHub', 'Docker', 'AWS', 'CI/CD', 'GitHub Actions'].map(skill => (
                                <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl md:col-span-2">
                        <h3 className="font-semibold mb-3 text-gray-900 border-b border-gray-200 pb-2">AI & Specializations</h3>
                        <div className="flex flex-wrap gap-2">
                            {['LLM APIs', 'GenAI', 'OCR Workflows', 'Full-Stack Development', 'Scalable Systems', 'Automation'].map(skill => (
                                <span key={skill} className="px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-sm shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Experience Highlights */}
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                    <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                    Experience Highlights
                </h2>

                <div className="space-y-6">
                    <div className="relative pl-6 border-l-2 border-gray-200">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white"></div>
                        <h3 className="text-lg font-bold text-gray-900">Independent Developer</h3>
                        <p className="text-sm text-gray-500 mb-2">Jan 2023 – Present</p>
                        <p className="text-gray-700">
                            Developing production-ready full-stack applications with modular architecture. Integrating AI workflows using GenAI, OCR, and LLM automation. Managing cloud deployments and CI/CD pipelines.
                        </p>
                    </div>

                    <div className="relative pl-6 border-l-2 border-gray-200">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-400 ring-4 ring-white"></div>
                        <h3 className="text-lg font-bold text-gray-900">Academic Developer – VIT Chennai</h3>
                        <p className="text-sm text-gray-500 mb-2">2024 – Present</p>
                        <p className="text-gray-700">
                            Building academic full-stack systems with real-time features. Collaborating with Nexus Club and hackathon teams to ship polished projects.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutMeApp;
