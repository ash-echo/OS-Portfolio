import React, { useState } from 'react';
import { Folder, FileText, Clock, Briefcase, User, Trash2 } from 'lucide-react';

const ProjectsApp = () => {
    const [activeTab, setActiveTab] = useState('resume');

    const sidebarItems = [
        {
            section: 'Favorites',
            items: [
                { id: 'work', label: 'Work', icon: Briefcase },
                { id: 'about', label: 'About me', icon: User },
                { id: 'resume', label: 'Resume', icon: FileText },
                { id: 'trash', label: 'Trash', icon: Trash2 },
            ],
        },
        {
            section: 'Work',
            items: [
                { id: 'nike', label: 'Nike Ecommerce', icon: Folder, color: 'text-blue-500' },
                { id: 'ai', label: 'AI Resume Analyzer', icon: Folder, color: 'text-blue-500' },
                { id: 'food', label: 'Food Delivery App', icon: Folder, color: 'text-blue-500' },
            ],
        },
    ];

    const content = {
        resume: (
            <div className="h-full w-full bg-white p-8 overflow-auto">
                <div className="max-w-3xl mx-auto shadow-lg border border-gray-200 p-10 bg-white min-h-[1000px]">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-1">Full Name</h1>
                            <p className="text-gray-500">front-end developer</p>
                        </div>
                        <div className="text-right text-sm text-blue-600">
                            <p>linkedin.com/in/fullname</p>
                            <p>github.com/fullname</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-4 uppercase tracking-wider">
                            Work Experience
                        </h2>
                        <div className="mb-6">
                            <div className="flex justify-between mb-1">
                                <h3 className="font-bold text-gray-800">Front-end Developer</h3>
                                <span className="text-gray-600 font-medium">New York, USA</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2 italic">Company Name</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>Crafted mobile-responsive web applications that seamlessly adapt to all devices.</li>
                                <li>Decrease in bounce rate and higher user engagement for clients.</li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between mb-1">
                                <h3 className="font-bold text-gray-800">Front-end Developer &amp; Team Lead</h3>
                                <span className="text-gray-600 font-medium">Remote</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2 italic">TripGuide</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>A trip booking service built with Next.js, Redux Toolkit &amp; MongoDB.</li>
                                <li>Developed a dynamic web application while keeping in mind all the best UI/UX practices.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-4 uppercase tracking-wider">
                            Education
                        </h2>
                        <div className="mb-2">
                            <h3 className="font-bold text-gray-800">B.Sc. Computer Science</h3>
                            <p className="text-sm text-gray-600">NYU, New York</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-4 uppercase tracking-wider">
                            Skills
                        </h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            JavaScript, MERN, React.js, React Native, Node.js, Next.js, SQL, MongoDB, REST APIs, TypeScript, Tailwind CSS, Material UI.
                        </p>
                    </div>
                </div>
            </div>
        ),
        work: (
            <div className="p-4 grid grid-cols-3 gap-4">
                {['Nike Ecommerce', 'AI Resume Analyzer', 'Food Delivery App'].map((item) => (
                    <div key={item} className="flex flex-col items-center gap-2 group cursor-pointer p-4 rounded-xl hover:bg-blue-50 transition-colors">
                        <Folder size={64} className="text-blue-500 fill-blue-500/20" strokeWidth={1} />
                        <span className="text-sm text-center font-medium text-gray-700 group-hover:text-blue-600">{item}</span>
                    </div>
                ))}
            </div>
        ),
    };

    return (
        <div className="flex h-full w-full bg-white">
            {/* Sidebar */}
            <div className="w-48 bg-gray-100/80 backdrop-blur-xl border-r border-gray-200 pt-4 flex flex-col gap-6">
                {sidebarItems.map((section) => (
                    <div key={section.section} className="px-4">
                        <h3 className="text-xs font-semibold text-gray-500 mb-2 pl-2">{section.section}</h3>
                        <div className="flex flex-col gap-0.5">
                            {section.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${activeTab === item.id ? 'bg-gray-300/50 text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-200/50'}`}
                                >
                                    <item.icon size={16} className={item.color || (activeTab === item.id ? 'text-blue-500' : 'text-gray-500')} />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white overflow-hidden flex flex-col">
                {/* Toolbar */}
                <div className="h-12 border-b border-gray-200 flex items-center px-4 gap-4 text-gray-700 bg-white/50 backdrop-blur-sm">
                    <div className="flex gap-2">
                        <button className="p-1 hover:bg-gray-200 rounded"><Clock size={16} /></button>
                        <button className="p-1 hover:bg-gray-200 rounded"><Folder size={16} /></button>
                    </div>
                    <div className="flex-1 text-center font-semibold text-gray-800 text-sm">
                        {sidebarItems.flatMap((s) => s.items).find((i) => i.id === activeTab)?.label}
                    </div>
                    <div className="w-10"></div>
                </div>

                <div className="flex-1 overflow-hidden relative">
                    {content[activeTab] || (
                        <div className="flex items-center justify-center h-full text-gray-500">Select an item to view</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectsApp;
