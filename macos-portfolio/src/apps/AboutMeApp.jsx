import React from 'react';

const AboutMeApp = () => {
    return (
        <div className="p-8 max-w-3xl mx-auto font-sans text-gray-800 leading-relaxed bg-white min-h-full">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">About Me</h1>
            <div className="flex gap-6 mb-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div>
                    <p className="mb-4 text-lg">
                        Hi, I'm a <strong>Full Stack Developer</strong> passionate about building beautiful and functional web applications.
                    </p>
                    <p className="mb-4 text-lg">
                        I specialize in React, Node.js, and modern UI/UX design. This portfolio is a reflection of my love for clean interfaces and smooth interactions.
                    </p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold mb-2 text-gray-600">Frontend</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>React & Redux</li>
                        <li>Tailwind CSS</li>
                        <li>GSAP Animations</li>
                        <li>TypeScript</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2 text-gray-600">Backend</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Node.js & Express</li>
                        <li>PostgreSQL & MongoDB</li>
                        <li>GraphQL</li>
                        <li>AWS</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutMeApp;
