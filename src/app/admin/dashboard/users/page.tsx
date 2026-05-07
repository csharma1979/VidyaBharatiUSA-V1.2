"use client";

import React, { useEffect, useState, useCallback } from "react";
import { 
  Search, 
  Loader2,
  Users
} from "lucide-react";
import { UsersTable } from "@/components/admin/UsersTable";
import { Pagination } from "@/components/admin/Pagination";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { Toast, ToastType } from "@/components/ui/Toast";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: debouncedSearch,
      });
      const res = await fetch(`/api/admin/users?${query}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");
      
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.totalUsers);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${userToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to delete user");
      
      showToast("User deleted successfully", "success");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      
      // Refresh the current page
      // If the page becomes empty and we're not on page 1, go back a page
      if (users.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      } else {
        fetchUsers();
      }
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A1128]/5 text-[#0A1128] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#0A1128]/10">
            <Users className="w-3 h-3" /> User Management
          </div>
          <h2 className="text-4xl font-serif font-black text-[#0A1128]">Registered Donors</h2>
          <p className="text-gray-500 font-medium max-w-lg">
            Monitor and manage your organization's members. You can search, filter, and modify user access.
          </p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" />
          <input
            type="text"
            placeholder="Search by name, email or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/5 transition-all shadow-sm font-medium"
          />
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-2">
          <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Total Lifetime Donors</div>
          <div className="text-4xl font-serif font-black text-[#0A1128]">{totalUsers.toLocaleString()}</div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="relative">
        <UsersTable users={users} onDelete={handleDeleteClick} />
        
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-3xl flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0A1128]">Updating Database...</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Container */}
      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={setPage} 
      />

      {/* Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Registered User"
        message="Are you sure you want to delete this user? All their records will be permanently removed from the dashboard. This action cannot be undone."
      />

      {/* Feedback Toast */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}

