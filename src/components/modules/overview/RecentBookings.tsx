'use client';

const bookings = [
  {
    id: '#I5FHM',
    guest: 'John Smith',
    email: 'john@example.com',
    location: '123 Main St, New York',
    date: '12-01-2026',
    status: 'Completed',
    price: '$1120',
  },
  {
    id: '#O2HHM',
    guest: 'John Smith',
    email: 'john@example.com',
    location: '123 Main St, New York',
    date: '16-01-2026',
    status: 'Pending',
    price: '$130',
  },
  {
    id: '#I5HHM',
    guest: 'John Smith',
    email: 'john@example.com',
    location: '123 Main St, New York',
    date: '15-01-2026',
    status: 'Completed',
    price: '$120',
  },
  {
    id: '#63DFE',
    guest: 'John Smith',
    email: 'john@example.com',
    location: '123 Main St, New York',
    date: '13-01-2026',
    status: 'Pending',
    price: '$70',
  },
  {
    id: '#63DFE',
    guest: 'John Smith',
    email: 'john@example.com',
    location: '123 Main St, New York',
    date: '14-01-2026',
    status: 'Completed',
    price: '$150',
  },
];

export default function RecentBookings() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-gray-900">Recent Booking</h3>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 font-medium text-gray-700">Booking ID</th>
              <th className="pb-3 font-medium text-gray-700">Guest</th>
              <th className="pb-3 font-medium text-gray-700">Locker Location</th>
              <th className="pb-3 font-medium text-gray-700">Date</th>
              <th className="pb-3 font-medium text-gray-700">Status</th>
              <th className="pb-3 font-medium text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b border-gray-50 last:border-0">
                <td className="py-3 text-gray-900">{booking.id}</td>
                <td className="py-3">
                  <div>
                    <p className="text-gray-900">{booking.guest}</p>
                    <p className="text-xs text-gray-500">{booking.email}</p>
                  </div>
                </td>
                <td className="py-3 text-gray-600">{booking.location}</td>
                <td className="py-3 text-gray-600">{booking.date}</td>
                <td className="py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      booking.status === 'Completed'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-orange-50 text-orange-500'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 font-medium text-gray-900">{booking.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {bookings.map((booking, index) => (
          <div key={index} className="rounded-lg border border-gray-100 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{booking.id}</span>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  booking.status === 'Completed'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-orange-50 text-orange-500'
                }`}
              >
                {booking.status}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Guest</span>
                <span className="text-gray-900">{booking.guest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span className="text-right text-gray-600">{booking.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="text-gray-600">{booking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Price</span>
                <span className="font-medium text-gray-900">{booking.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
