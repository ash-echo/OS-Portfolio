import React from 'react';
import { Briefcase, GraduationCap, Award, Code, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const ResumeApp = () => {
    return (
        <div className="h-full bg-white overflow-auto">
            <div className="max-w-4xl mx-auto p-8" data-resume-content>
                {/* Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Ashwath</h1>
                    <p className="text-xl text-gray-600 mb-4">Full Stack Developer</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Mail size={16} />
                            <span>ashwath@example.com</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Phone size={16} />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Github size={16} />
                            <span>github.com/ash-echo</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Linkedin size={16} />
                            <span>linkedin.com/in/ashwath</span>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Award size={24} className="text-blue-600" />
                        Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Passionate Full Stack Developer with 5+ years of experience building scalable web applications. 
                        Expertise in React, Node.js, and modern web technologies. Strong problem-solving skills and 
                        commitment to writing clean, maintainable code. Proven track record of delivering high-quality 
                        projects on time and collaborating effectively with cross-functional teams.
                    </p>
                </div>

                {/* Skills */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Code size={24} className="text-blue-600" />
                        Technical Skills
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'].map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Backend</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Node.js', 'Express', 'Python', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'].map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Tools & DevOps</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Git', 'Docker', 'AWS', 'Vercel', 'CI/CD', 'Jest', 'Webpack'].map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Other</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Agile', 'Scrum', 'UI/UX Design', 'Mobile Development', 'Responsive Design'].map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experience */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Briefcase size={24} className="text-blue-600" />
                        Work Experience
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="border-l-4 border-blue-600 pl-4">
                            <h3 className="text-xl font-semibold text-gray-900">Senior Full Stack Developer</h3>
                            <p className="text-gray-600 mb-2">Tech Company Inc. • 2022 - Present</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Led development of a React-based e-commerce platform serving 100K+ users</li>
                                <li>Architected and implemented RESTful APIs using Node.js and Express</li>
                                <li>Reduced page load times by 40% through code optimization and lazy loading</li>
                                <li>Mentored 3 junior developers and conducted code reviews</li>
                            </ul>
                        </div>

                        <div className="border-l-4 border-blue-600 pl-4">
                            <h3 className="text-xl font-semibold text-gray-900">Full Stack Developer</h3>
                            <p className="text-gray-600 mb-2">Startup Solutions • 2020 - 2022</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Built and deployed 10+ client projects using React, Node.js, and MongoDB</li>
                                <li>Implemented responsive designs with Tailwind CSS and mobile-first approach</li>
                                <li>Integrated third-party APIs including Stripe, Google Maps, and Auth0</li>
                                <li>Collaborated with designers and product managers in Agile environment</li>
                            </ul>
                        </div>

                        <div className="border-l-4 border-blue-600 pl-4">
                            <h3 className="text-xl font-semibold text-gray-900">Junior Web Developer</h3>
                            <p className="text-gray-600 mb-2">Digital Agency • 2019 - 2020</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Developed responsive websites using HTML, CSS, JavaScript, and React</li>
                                <li>Worked on bug fixes and feature enhancements for existing applications</li>
                                <li>Participated in daily stand-ups and sprint planning meetings</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <GraduationCap size={24} className="text-blue-600" />
                        Education
                    </h2>
                    
                    <div className="border-l-4 border-blue-600 pl-4">
                        <h3 className="text-xl font-semibold text-gray-900">Bachelor of Science in Computer Science</h3>
                        <p className="text-gray-600">University of Technology • 2015 - 2019</p>
                        <p className="text-gray-700 mt-2">GPA: 3.8/4.0 • Dean's List • Computer Science Club President</p>
                    </div>
                </div>

                {/* Certifications */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Award size={24} className="text-blue-600" />
                        Certifications
                    </h2>
                    
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            AWS Certified Developer - Associate
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            MongoDB Certified Developer
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            React Advanced Certification
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResumeApp;
