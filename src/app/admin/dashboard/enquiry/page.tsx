"use client";

import React, { useEffect, useState, useCallback } from "react";
import { 
  FileText, 
  Search, 
  Calendar,
  Loader2,
  AlertCircle,
  Filter,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  Mail,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Check
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "responded" | "archived";
  createdAt: string;
}

export default function AdminEnquiryPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchEnquiries = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        search: searchTerm,
        status: statusFilter
      });
      const res = await fetch(`/api/admin/enquiries?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch enquiries");
      setEnquiries(data.enquiries);
      setTotalPages(data.pages);
      setTotalCount(data.total);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEnquiries();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchEnquiries]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus as any } : e));
      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus as any });
      }
      toast.success(`Enquiry marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete enquiry");
      
      setEnquiries(prev => prev.filter(e => e._id !== id));
      toast.success("Enquiry deleted successfully");
      if (selectedEnquiry?._id === id) {
        setIsModalOpen(false);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleViewDetails = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
    if (enquiry.status === "unread") {
      handleUpdateStatus(enquiry._id, "read");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread": return "bg-blue-50 text-blue-700 border-blue-100";
      case "read": return "bg-gray-50 text-gray-700 border-gray-100";
      case "responded": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "archived": return "bg-amber-50 text-amber-700 border-amber-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const unreadCount = enquiries.filter(e => e.status === "unread").length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1128] flex items-center gap-3">
            Website Enquiries
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                {unreadCount} NEW
              </span>
            )}
          </h2>
          <p className="text-gray-500 text-sm mt-1">Manage and respond to messages from your website visitors.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, email, subject..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#D4AF37] text-sm shadow-sm"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#D4AF37] text-sm shadow-sm font-medium text-gray-600"
          >
            <option value="">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      {isLoading && enquiries.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Visitor</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Enquiry Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {enquiries.length > 0 ? (
                  enquiries.map((enquiry) => (
                    <tr 
                      key={enquiry._id} 
                      className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${enquiry.status === "unread" ? "bg-blue-50/20" : ""}`}
                      onClick={() => handleViewDetails(enquiry)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${enquiry.status === "unread" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                            {enquiry.name[0].toUpperCase()}
                          </div>
                          <div>
                            <div className={`font-bold text-[#0A1128] ${enquiry.status === "unread" ? "font-black" : ""}`}>{enquiry.name}</div>
                            <div className="text-xs text-gray-400">{enquiry.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className={`font-bold text-[#0A1128] truncate ${enquiry.status === "unread" ? "font-black" : ""}`}>{enquiry.subject}</div>
                        <div className="text-xs text-gray-400 truncate">{enquiry.message}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusColor(enquiry.status)}`}>
                          {enquiry.status === "unread" && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />}
                          {enquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600 font-medium">
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {new Date(enquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={() => handleViewDetails(enquiry)}
                            className="p-2 text-gray-400 hover:text-[#D4AF37] hover:bg-amber-50 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(enquiry._id)}
                            disabled={isDeleting === enquiry._id}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            {isDeleting === enquiry._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300">
                          <MessageSquare className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500 font-bold">No enquiries found</p>
                          <p className="text-gray-400 text-xs">When visitors contact you, their messages will appear here.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
              <p className="text-xs text-gray-400 font-medium">
                Showing page <span className="text-gray-600 font-bold">{currentPage}</span> of <span className="text-gray-600 font-bold">{totalPages}</span>
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {isModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A1128]/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="bg-[#0A1128] p-8 text-white relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusColor(selectedEnquiry.status)}`}>
                    {selectedEnquiry.status}
                  </span>
                  <h3 className="text-3xl font-serif font-bold">{selectedEnquiry.subject}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-white/60">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> {selectedEnquiry.email}
                    </div>
                    {selectedEnquiry.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> {selectedEnquiry.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {new Date(selectedEnquiry.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Message From {selectedEnquiry.name}</p>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Quick Actions</p>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleUpdateStatus(selectedEnquiry._id, "responded")}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-100 hover:bg-emerald-100 transition-all"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark Responded
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedEnquiry._id, "archived")}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold border border-amber-100 hover:bg-amber-100 transition-all"
                    >
                      <Clock className="w-3.5 h-3.5" /> Archive
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Contact Visitor</p>
                  <a 
                    href={`mailto:${selectedEnquiry.email}?subject=RE: ${selectedEnquiry.subject}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#0A1128] text-white rounded-xl text-sm font-bold hover:bg-[#1a2b5e] transition-all"
                  >
                    <Mail className="w-4 h-4" /> Reply via Email
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <button 
                onClick={() => handleDelete(selectedEnquiry._id)}
                className="text-red-600 text-xs font-bold hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete permanently
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
