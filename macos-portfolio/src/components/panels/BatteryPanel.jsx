import React from 'react';
import { Battery, BatteryCharging, Zap } from 'lucide-react';
import BasePanel from './BasePanel';

const BatteryPanel = ({ isOpen, onClose, position }) => {
    const batteryLevel = 85; // Mock battery level
    const isCharging = false;

    return (
        <BasePanel isOpen={isOpen} onClose={onClose} position={position} width={280}>
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">Battery</h3>
                    {isCharging ? (
                        <BatteryCharging size={20} className="text-green-600" />
                    ) : (
                        <Battery size={20} className="text-gray-600" />
                    )}
                </div>

                {/* Battery Level Display */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-gray-800">{batteryLevel}%</span>
                        <span className="text-xs text-gray-500">
                            {isCharging ? 'Charging' : 'On Battery'}
                        </span>
                    </div>

                    {/* Battery Visual */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${batteryLevel > 20 ? 'bg-green-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${batteryLevel}%` }}
                        />
                    </div>
                </div>

                {/* Power Mode */}
                <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                            <Zap size={16} className="text-yellow-600" />
                            <span className="text-sm text-gray-700">Low Power Mode</span>
                        </div>
                        <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer transition-colors">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                        </div>
                    </div>
                </div>

                {/* Battery Info */}
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Condition</span>
                        <span className="font-medium text-gray-800">Normal</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                        <span>Time Remaining</span>
                        <span className="font-medium text-gray-800">
                            {isCharging ? 'Calculating...' : '4:32'}
                        </span>
                    </div>
                </div>
            </div>
        </BasePanel>
    );
};

export default BatteryPanel;
