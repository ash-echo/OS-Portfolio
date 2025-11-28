import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

const WorkApp = () => {
    const projects = [
        {
            id: 1,
            title: 'EvalGenius – AI Handwritten Answer Evaluation',
            description: 'AI-driven handwritten answer evaluation using typed PDF answer keys powered by Gemini 2.5 Flash. Built full OCR + LLM evaluation pipeline with reliability-focused fallback behaviour. Integrated priority-based flow for API load spikes ensuring consistent output. Multi-page UI for document upload, evaluation results, scoring, and verifications.',
            tags: ['React', 'Gemini 2.5 Flash', 'OCR', 'LLM', 'Node.js'],
            github: 'https://github.com/ash-echo/EvalGenius',
            live: 'https://eval-genius.netlify.app/',
            color: 'from-blue-600 to-indigo-700'
        },
        {
            id: 2,
            title: 'LezLearn – Video Learning Platform',
            description: 'Full-stack LMS enabling instructors to upload courses, manage enrollments, and receive payments. Built course upload, dashboards, content delivery, and secure routing. Designed SCSS-based theming for clean UI and mobile responsiveness. Optimized for future subscription and wallet-based payment expansion.',
            tags: ['Full-stack', 'LMS', 'SCSS', 'Payment Integration'],
            github: 'https://github.com/ash-echo/LezLearn',
            live: null,
            color: 'from-purple-600 to-pink-600'
        },
        {
            id: 3,
            title: 'HelpConnect – Social Donation & Help Platform',
            description: 'Community-driven system for donations, volunteer help, and real-time messaging. Engineered donation flow, WebSocket chat system, user profile system, and feed algorithm. Built X/Threads-style interface with reusable components and smooth interactions. Integrated Stripe payment processing for secure, real-time donation transactions.',
            tags: ['WebSockets', 'Stripe', 'Social Platform', 'Real-time'],
            github: 'https://github.com/ash-echo/HelpConnect',
            live: null,
            color: 'from-emerald-500 to-teal-600'
        },
        {
            id: 4,
            title: 'MacOS-Inspired Interactive Portfolio',
            description: 'A fully interactive portfolio built as a functional MacOS interface with draggable apps, folders, and animations. Implemented a MacOS-style UI with draggable windows, animations, and app-launcher experience. Built working file explorer, multi-window navigation, custom terminal simulation, and interactive tools. Integrated retro gaming emulators.',
            tags: ['React', 'MacOS UI', 'Emulators', 'Interactive'],
            github: 'https://github.com/ash-echo/OS-Portfolio',
            live: 'https://ashwathp-portfolio.vercel.app',
            color: 'from-gray-700 to-gray-900'
        }
    ];

    return (
        <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
            <div className="max-w-7xl mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Major Projects</h1>
                    <p className="text-xl text-gray-600">
                        A showcase of my recent work in AI, Full-stack development, and Interactive UI.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
                        >
                            {/* Project Image/Gradient */}
                            <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative flex-shrink-0`}>
                                <div className="absolute inset-0 bg-black/10"></div>
                                <h3 className="text-2xl font-bold text-white z-10 text-center px-6 leading-tight">
                                    {project.title}
                                </h3>
                            </div>

                            {/* Project Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4 mt-auto">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                    >
                                        <Github size={18} />
                                        <span>GitHub</span>
                                    </a>

                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            <ExternalLink size={18} />
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-16 text-center pb-8">
                    <p className="text-gray-600 mb-4">Check out more of my work on GitHub</p>
                    <a
                        href="https://github.com/ash-echo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Github size={20} />
                        <span>View GitHub Profile</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WorkApp;
