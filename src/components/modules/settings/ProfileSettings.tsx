'use client';

import { useState } from 'react';
import { Camera, Save, User, Mail, Phone, MapPin } from 'lucide-react';

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8901',
    location: 'New York, USA',
    bio: 'Admin of Wander Stay platform. Managing hotel bookings and user experiences.',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-6 text-base font-semibold text-gray-900">Personal Information</h3>

        <div className="flex flex-col items-start gap-6 sm:flex-row">
          {/* Avatar */}
          <div className="relative">
            <div className="bg-primary/10 text-primary flex size-24 items-center justify-center rounded-full text-2xl font-bold">
              JD
            </div>
            <button className="bg-primary hover:bg-primary/90 absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border-2 border-white text-white shadow-md transition">
              <Camera className="size-4" />
            </button>
          </div>

          {/* Form */}
          <div className="w-full flex-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm transition outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm transition outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
                <div className="relative">
                  <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm transition outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Location</label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm transition outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="focus:border-primary focus:ring-primary/30 w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition outline-none focus:ring-1"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition">
                <Save className="size-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-6 text-base font-semibold text-gray-900">Change Password</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
              }
              placeholder="••••••••"
              className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition outline-none focus:ring-1"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              placeholder="••••••••"
              className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition outline-none focus:ring-1"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
              }
              placeholder="••••••••"
              className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition outline-none focus:ring-1"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
