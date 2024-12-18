import React from 'react';
import { Home, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>View Site</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};