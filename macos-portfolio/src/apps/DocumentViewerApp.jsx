import React from 'react';

const DocumentViewerApp = ({ fileName, fileContent = '' }) => {
    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6">{fileName}</h1>
                <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed font-sans">
                        {fileContent}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default DocumentViewerApp;
