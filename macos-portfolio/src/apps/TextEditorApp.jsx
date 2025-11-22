import React, { useState } from 'react';

const TextEditorApp = ({ fileName, initialContent = '', onSave }) => {
    const [content, setContent] = useState(initialContent);

    const handleSave = () => {
        if (onSave) {
            onSave(content);
        }
    };

    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">{fileName}</h2>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                    Save
                </button>
            </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 w-full p-4 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none font-mono"
                placeholder="Start typing..."
            />
        </div>
    );
};

export default TextEditorApp;
