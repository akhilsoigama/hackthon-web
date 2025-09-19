import { motion } from 'framer-motion';
import { ReactElement, useEffect, useState } from 'react';

interface CalendarEvent {
  id: number;
  date: Date;
  title: string;
  color: string;
  description?: string;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-500 border-blue-500",
  red: "bg-red-500 border-red-500",
  green: "bg-green-500 border-green-500",
  purple: "bg-purple-500 border-purple-500",
  orange: "bg-orange-500 border-orange-500",
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, date: new Date(2025, 8, 15), title: 'Team Meeting', color: 'blue', description: 'Weekly team sync' },
    { id: 2, date: new Date(2025, 8, 18), title: 'Project Deadline', color: 'red', description: 'Finalize Q3 project' },
    { id: 3, date: new Date(2025, 8, 22), title: 'Lunch with Client', color: 'green', description: 'Discuss new partnership' },
    { id: 4, date: new Date(2025, 8, 27), title: 'Doctor Appointment', color: 'purple' },
    { id: 5, date: new Date(2025, 8, 29), title: 'Conference Call', color: 'orange', description: 'With international team' },
  ]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [newEvent, setNewEvent] = useState<{title: string, date: Date, color: string} | null>(null);

  useEffect(() => {
    console.log('Calendar page loaded');
  }, []);

  const getDaysInMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction: number): void => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateClick = (day: number): void => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  const handleAddEvent = (): void => {
    setNewEvent({
      title: '',
      date: selectedDate,
      color: 'blue'
    });
  };

  const handleSaveEvent = (): void => {
    if (newEvent && newEvent.title) {
      const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
      setEvents([...events, { id: newId, ...newEvent }]);
    }
    setNewEvent(null);
  };

  const generateCalendarDays = (): ReactElement[] => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: ReactElement[] = [];

    // Empty cells for offset
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-[3rem] sm:min-h-[4rem]"></div>);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter(event => 
        event.date.getDate() === day && 
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
      );
      
      const isSelected = selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      
      const isToday = new Date().getDate() === day && 
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <motion.div
          key={day}
          className={`min-h-[3rem] sm:min-h-[4rem] p-1 border border-gray-200 flex flex-col cursor-pointer relative
            ${isToday ? 'bg-blue-50' : ''} 
            ${isSelected ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-50'}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleDateClick(day)}
        >
          <div className={`text-xs sm:text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="flex flex-wrap justify-center gap-1 mt-auto">
            {dayEvents.slice(0, 2).map(event => (
              <div 
                key={event.id} 
                className={`w-2 h-2 rounded-full ${colorMap[event.color].split(" ")[0]}`}
                title={event.title}
              ></div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2}</div>
            )}
          </div>
        </motion.div>
      );
    }

    return days;
  };

  const getEventsForSelectedDate = (): CalendarEvent[] => {
    return events.filter(event => 
      event.date.getDate() === selectedDate.getDate() && 
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6 md:p-8">
      <motion.header
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage your schedule</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <motion.section 
          className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex flex-wrap gap-2">
              {/* View Switch */}
              <div className="flex rounded-md shadow-sm" role="group">
                {['month', 'week', 'day'].map(mode => (
                  <button
                    key={mode}
                    type="button"
                    className={`px-3 py-1 text-sm font-medium first:rounded-l-lg last:rounded-r-lg 
                      ${view === mode ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setView(mode as 'month' | 'week' | 'day')}
                  >
                    {mode[0].toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
              {/* Navigation */}
              <button 
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                onClick={() => navigateMonth(-1)}
              >
                ‹
              </button>
              <button 
                className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </button>
              <button 
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                onClick={() => navigateMonth(1)}
              >
                ›
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-xs sm:text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-gray-500 py-1 sm:py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {generateCalendarDays()}
          </div>
        </motion.section>

        {/* Events Panel */}
        <motion.section 
          className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Schedule for {formatDate(selectedDate)}
          </h2>

          <div className="flex-1 overflow-y-auto">
            {newEvent ? (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Add New Event</h3>
                <input
                  type="text"
                  placeholder="Event title"
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <div className="flex justify-between">
                  <button 
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleSaveEvent}
                  >
                    Save
                  </button>
                  <button 
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    onClick={() => setNewEvent(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}

            {getEventsForSelectedDate().length > 0 ? (
              <div className="space-y-3">
                {getEventsForSelectedDate().map(event => (
                  <motion.div 
                    key={event.id}
                    className={`p-3 rounded-lg border-l-4 bg-gray-50 ${colorMap[event.color].split(" ")[1]}`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {event.description && (
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No events scheduled for this day</p>
              </div>
            )}
          </div>

          <button 
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
            onClick={handleAddEvent}
          >
            ＋ Add Event
          </button>

          {/* Upcoming Events */}
          <div className="mt-8">
            <h3 className="font-medium text-gray-700 mb-3">Upcoming Events</h3>
            <div className="space-y-2">
              {events
                .filter(event => event.date > new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 3)
                .map(event => (
                  <div key={event.id} className="flex items-center text-sm p-2 hover:bg-gray-50 rounded">
                    <div className={`w-3 h-3 rounded-full ${colorMap[event.color].split(" ")[0]} mr-2`}></div>
                    <span className="text-gray-900 font-medium truncate">{event.title}</span>
                    <span className="text-gray-500 ml-auto whitespace-nowrap">
                      {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Calendar;
