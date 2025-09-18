import { useState, FormEvent } from 'react';
import { FaSave, FaTimes, FaUserCog } from 'react-icons/fa';

interface TeacherSettingsData {
  name: string;
  email: string;
  phone: string;
  password: string;
  notifications: string[];
  theme: 'light' | 'dark';
  status: 'active' | 'inactive';
}

const TeacherSettingsPage = () => {
  const [settings, setSettings] = useState<TeacherSettingsData>({
    name: '',
      email: '',
      phone: '',
      password: '',
      notifications: ['email', 'in-app'],
      theme: 'light',
      status: 'active',
  });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
    const { checked } = e.target;
    setSettings((prev) => {
      const newNotifications = checked
        ? [...prev.notifications, value]
        : prev.notifications.filter((n) => n !== value);
      return { ...prev, notifications: newNotifications };
    });
  } else {
    setSettings((prev) => ({ ...prev, [name]: value }));
  }
};

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Teacher settings updated successfully!');
  };

  const handleReset = () => {
    setSettings({
      name: '',
      email: '',
      phone: '',
      password: '',
      notifications: ['email', 'in-app'],
      theme: 'light',
      status: 'active',
    });
  };

  return (
    <div className="h-max">
      <div className="max-w-screen mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUserCog className="mr-2 text-blue-600" /> Teacher Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account preferences and dashboard settings.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleChange}
                placeholder=''
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={settings.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Notifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notification Preferences</label>
            <div className="flex flex-col space-y-2">
              {['email', 'sms', 'in-app'].map((n) => (
                <label key={n} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={n}
                    checked={settings.notifications.includes(n)}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2 capitalize">{n}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dashboard Theme</label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={settings.status === 'active'}
                  onChange={handleChange}
                  className="text-blue-600"
                />
                <span className="ml-2">Active</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={settings.status === 'inactive'}
                  onChange={handleChange}
                  className="text-blue-600"
                />
                <span className="ml-2">Inactive</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FaTimes className="mr-2" /> Reset
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <FaSave className="mr-2" /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherSettingsPage;