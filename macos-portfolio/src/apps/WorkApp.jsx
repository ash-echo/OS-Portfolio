import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

const WorkApp = () => {
    const projects = [
        {
            id: 1,
            title: 'Nike Ecommerce Website',
            description: 'A full-stack e-commerce platform with product catalog, shopping cart, and secure checkout.',
            image: '/project1.jpg',
            tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
            github: 'https://github.com/ash-echo/nike-ecommerce',
            live: 'https://nike-ecommerce-demo.vercel.app',
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 2,
            title: 'AI Resume Analyzer',
            description: 'ML-powered tool for resume analysis, skill matching, and ATS optimization with scoring system.',
            image: '/project2.jpg',
            tags: ['Python', 'TensorFlow', 'Flask', 'React', 'NLP'],
            github: 'https://github.com/ash-echo/ai-resume-analyzer',
            live: 'https://ai-resume-analyzer.vercel.app',
            color: 'from-blue-500 to-purple-500'
        },
        {
            id: 3,
            title: 'Food Delivery App',
            description: 'Comprehensive platform connecting restaurants and customers with real-time order tracking.',
            image: '/project3.jpg',
            tags: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Google Maps'],
            github: 'https://github.com/ash-echo/food-delivery',
            live: 'https://food-delivery-demo.vercel.app',
            color: 'from-green-500 to-teal-500'
        },
        {
            id: 4,
            title: 'Portfolio Website',
            description: 'Interactive macOS-inspired portfolio with custom animations and responsive design.',
            image: '/project4.jpg',
            tags: ['React', 'Tailwind CSS', 'GSAP', 'Vite', 'React RND'],
            github: 'https://github.com/ash-echo/portfolio',
            live: 'https://ashwath-portfolio-mu.vercel.app',
            color: 'from-pink-500 to-rose-500'
        },
        {
            id: 5,
            title: 'Task Management System',
            description: 'Collaborative task manager with drag-and-drop, real-time updates, and team collaboration.',
            image: '/project5.jpg',
            tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'WebSockets'],
            github: 'https://github.com/ash-echo/task-manager',
            live: 'https://task-manager-demo.vercel.app',
            color: 'from-indigo-500 to-blue-500'
        },
        {
            id: 6,
            title: 'Weather Dashboard',
            description: 'Beautiful weather app with forecasts, interactive maps, and location-based alerts.',
            image: '/project6.jpg',
            tags: ['React', 'OpenWeather API', 'Chart.js', 'Mapbox', 'Tailwind'],
            github: 'https://github.com/ash-echo/weather-dashboard',
            live: 'https://weather-dashboard-demo.vercel.app',
            color: 'from-cyan-500 to-blue-500'
        }
    ];

    return (
        <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
            <div className="max-w-7xl mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">My Projects</h1>
                    <p className="text-xl text-gray-600">
                        A collection of web applications and software projects I've built using modern technologies.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div 
                            key={project.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Project Image/Gradient */}
                            <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}>
                                <div className="absolute inset-0 bg-black/10"></div>
                                <h3 className="text-3xl font-bold text-white z-10 text-center px-4">
                                    {project.title}
                                </h3>
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
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
                                <div className="flex gap-4">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        <Github size={18} />
                                        <span>Code</span>
                                    </a>
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                        <span>Live Demo</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-16 text-center pb-8">
                    <p className="text-gray-600 mb-4">More projects coming soon!</p>
                    <a
                        href="https://github.com/ash-echo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Github size={20} />
                        <span>View All on GitHub</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WorkApp;
