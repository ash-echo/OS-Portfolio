import React, { useState } from 'react';
import { Wifi, WifiOff, Lock } from 'lucide-react';
import BasePanel from './BasePanel';

const WiFiPanel = ({ isOpen, onClose, position }) => {
    const [wifiEnabled, setWifiEnabled] = useState(true);

    const networks = [
        { name: 'Portfolio Network', signal: 3, secure: true, connected: true },
        { name: 'Guest WiFi', signal: 2, secure: false, connected: false },
        { name: 'Office Network', signal: 1, secure: true, connected: false },
    ];

    const getSignalBars = (strength) => {
        return (
            <div className="flex items-end gap-0.5">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-1 ${i < strength ? 'bg-gray-800' : 'bg-gray-300'
                            } rounded-sm`}
                        style={{ height: `${(i + 1) * 4}px` }}
                    />
                ))}
            </div>
        );
    };

    return (
        <BasePanel isOpen={isOpen} onClose={onClose} position={position} width={300}>
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">Wi-Fi</h3>
                    <button
                        onClick={() => setWifiEnabled(!wifiEnabled)}
                        className={`w-10 h-6 rounded-full relative transition-colors ${wifiEnabled ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                    >
                        <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${wifiEnabled ? 'right-1' : 'left-1'
                                }`}
                        />
                    </button>
                </div>

                {wifiEnabled ? (
                    <>
                        {/* Networks List */}
                        <div className="space-y-1">
                            {networks.map((network, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${network.connected
                                            ? 'bg-blue-50 border border-blue-200'
                                            : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <Wifi size={16} className={network.connected ? 'text-blue-600' : 'text-gray-600'} />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm ${network.connected ? 'font-medium text-blue-900' : 'text-gray-700'
                                                    }`}>
                                                    {network.name}
                                                </span>
                                                {network.secure && (
                                                    <Lock size={12} className="text-gray-500" />
                                                )}
                                            </div>
                                            {network.connected && (
                                                <span className="text-xs text-blue-600">Connected</span>
                                            )}
                                        </div>
                                    </div>
                                    {getSignalBars(network.signal)}
                                </div>
                            ))}
                        </div>

                        {/* Other Networks */}
                        <button className="w-full mt-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Other Networks...
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                        <WifiOff size={32} className="mb-2" />
                        <span className="text-sm">Wi-Fi is turned off</span>
                    </div>
                )}
            </div>
        </BasePanel>
    );
};

export default WiFiPanel;
