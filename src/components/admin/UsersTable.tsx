"use client";

import React from "react";
import { Mail, Phone, Calendar, Trash2 } from "lucide-react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  createdAt: string;
}

interface UsersTableProps {
  users: User[];
  onDelete: (userId: string) => void;
}

export function UsersTable({ users, onDelete }: UsersTableProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Donor Name</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact Info</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Member Since</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#0A1128]/5 flex items-center justify-center text-[#0A1128] font-bold border border-[#0A1128]/10 group-hover:bg-[#0A1128] group-hover:text-white transition-all duration-300">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <div className="font-bold text-[#0A1128] text-lg">{user.firstName} {user.lastName}</div>
                        <div className="text-[10px] font-black text-gray-400 tracking-widest uppercase">ID: {user._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 text-sm text-gray-500 font-medium">
                        <Mail className="w-3.5 h-3.5 text-gray-400 group-hover:text-saffron transition-colors" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-500 font-medium">
                        <Phone className="w-3.5 h-3.5 text-gray-400 group-hover:text-saffron transition-colors" />
                        {user.mobile}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2.5 text-sm text-gray-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 group-hover:text-saffron transition-colors" />
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button
                      onClick={() => onDelete(user._id)}
                      className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm shadow-red-100"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center text-gray-400 italic font-medium">
                  No donors found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
