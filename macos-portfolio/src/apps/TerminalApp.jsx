import React from 'react';

const TerminalApp = () => {
    return (
        <div className="bg-[#1e1e1e] text-[#33ff00] font-mono p-4 h-full text-sm overflow-auto selection:bg-white/20">
            <div className="mb-2 opacity-70">Last login: {new Date().toDateString()} on ttys000</div>
            <div className="mb-2">
                <span className="text-blue-400 font-bold">user@macbook</span>:<span className="text-blue-200">~</span>$ ls -la
            </div>
            <div className="grid grid-cols-1 gap-1 mb-2 text-white/90">
                <span>drwxr-xr-x   5 user  staff   160 Nov 20 10:00 .</span>
                <span>drwxr-xr-x   3 root  wheel    96 Nov 20 09:00 ..</span>
                <span>-rw-r--r--   1 user  staff  1024 Nov 20 10:01 .bash_profile</span>
                <span>drwxr-xr-x   8 user  staff   256 Nov 20 12:30 Projects</span>
                <span>drwxr-xr-x   4 user  staff   128 Nov 20 11:15 Documents</span>
            </div>
            <div className="mb-2">
                <span className="text-blue-400 font-bold">user@macbook</span>:<span className="text-blue-200">~</span>$ echo "Welcome to my portfolio!"
            </div>
            <div className="mb-2 text-white font-bold">
                Welcome to my portfolio!
            </div>
            <div className="flex items-center">
                <span className="text-blue-400 font-bold">user@macbook</span>:<span className="text-blue-200">~</span>$ <span className="w-2.5 h-5 bg-[#33ff00] ml-1 animate-pulse block"></span>
            </div>
        </div>
    );
};

export default TerminalApp;
