import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BasePanel from './BasePanel';

const CalendarPanel = ({ isOpen, onClose, position }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const today = new Date();
    const isCurrentMonth = currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    return (
        <BasePanel isOpen={isOpen} onClose={onClose} position={position} width={300}>
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <div className="flex gap-1">
                        <button
                            onClick={prevMonth}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div>
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                        {[...Array(firstDayOfMonth)].map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}
                        {[...Array(daysInMonth)].map((_, i) => {
                            const day = i + 1;
                            const isToday = isCurrentMonth && day === today.getDate();

                            return (
                                <button
                                    key={day}
                                    className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${isToday
                                            ? 'bg-blue-500 text-white font-semibold'
                                            : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Events */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-600 mb-2">Upcoming</h4>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2 text-xs">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1" />
                            <div>
                                <div className="font-medium text-gray-800">Portfolio Review</div>
                                <div className="text-gray-500">Tomorrow, 2:00 PM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasePanel>
    );
};

export default CalendarPanel;
