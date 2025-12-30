
import {Clock, MessageSquare, Plus, Search} from "lucide-react";
import type {EmptyListProps, FilterProps, MessageActionsProps, SearchBarProps} from "../../Others/utilities.ts";
import { Archive, Trash2, MoreVertical, Play } from "lucide-react";
import type {PaginationProps} from "../../Others/utilities.ts";
import { Link } from 'react-router-dom'
import { Timestamp } from "firebase/firestore";



export const Dashboard_NavigationBar = (
{ SignOutFunction }: { SignOutFunction: () => void; }
) => {
    return (
        <header className="bg-white border-b border-[#F9FAFB] sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-6 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-2xl font-bold text-[#101828] tracking-tight">ChatNow</h1>
                        <nav className="hidden md:flex items-center gap-6">
                            <a href="#" className="text-sm font-medium text-[#FF5A1F]">Messages</a>
                            <a href="#" className="text-sm font-medium text-[#475467] hover:text-[#101828] transition-colors">Settings</a>
                            <a href="#" className="text-sm font-medium text-[#475467] hover:text-[#101828] transition-colors">Help</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="px-4 py-2 text-sm font-medium text-[#475467] hover:text-[#101828] transition-colors">
                            Profile
                        </Link>
                        <button className="px-5 py-2.5 bg-[#FF5A1F] text-white rounded-lg font-medium text-sm hover:bg-[#D94816] transition-all hover:shadow-lg hover:shadow-[#FF5A1F]/30 hover:-translate-y-0.5"
                            onClick={SignOutFunction}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}


export const DashboardPage_Heading = ()=> {
    return (
        <div className="mb-10">
            <h2 className="text-5xl font-bold text-[#101828] tracking-tight mb-4">Your Messages</h2>
            <p className="text-xl text-[#475467]">All your formatted conversations in one place</p>
        </div>
    )
}


export const DashboardPage_EmptyList = (
{ makeNewFunction }: EmptyListProps
) => {
    return (
        <div className="bg-white rounded-lg border border-[#D0D5DD] p-16 text-center">
            <MessageSquare className="w-16 h-16 text-[#98A2B3] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#101828] mb-2">No messages found</h3>
            <p className="text-[#475467] mb-6">Try adjusting your search or filter</p>
            <button
                onClick={makeNewFunction}
                className="px-5 py-3 bg-[#FF5A1F] text-white rounded-lg font-medium hover:bg-[#D94816] transition-all">
                Create New Message
            </button>
        </div>
    );
}


export const DashboardPage_MessageList = ({ message }: { message: any }) => {

    const formatDate = (ts?: Timestamp) => {
        if (!ts) return "Unknown";
        const date = ts.toDate();
        return date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="flex-1 min-w-0 group">
            <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-[#101828] truncate group-hover:text-[#FF5A1F] transition-colors">
                    {message.title || "Untitled Chat"}
                </h3>

                {message.isArchived && (
                    <span className="px-2.5 py-1 bg-[#F9FAFB] text-[#475467] text-xs font-medium rounded-md">
                        Archived
                    </span>
                )}
            </div>

            <p className="text-[#475467] mb-4 line-clamp-2 leading-relaxed">
                {message.lastMessage || "No messages yet"}
            </p>

            <div className="flex items-center gap-6 text-sm text-[#98A2B3]">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(message.lastMessage_time)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{message.messageCount || 0} messages</span>
                </div>
            </div>
        </div>
    );
};


export const MessageActions = ({ messageId, onAction, onArchive, onDelete, onMore }: MessageActionsProps) => {
    return (
        <div className="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
            <button
                className="p-2 text-[#475467] hover:text-[#FF5A1F] hover:bg-[#FEF3F2] rounded-lg transition-all"
                title="Go"
                onClick={() => onAction(messageId)}
            >
                <Play className="w-5 h-5"/>
            </button>

            <button
                className="p-2 text-[#475467] hover:text-[#FF5A1F] hover:bg-[#FEF3F2] rounded-lg transition-all"
                title="Archive"
                onClick={() => onArchive(messageId)}
            >
                <Archive className="w-5 h-5"/>
            </button>

            <button
                className="p-2 text-[#475467] hover:text-[#B42318] hover:bg-[#FEF3F2] rounded-lg transition-all"
                title="Delete"
                onClick={() => onDelete(messageId)}
            >
                <Trash2 className="w-5 h-5"/>
            </button>

            <button
                className="p-2 text-[#475467] hover:text-[#101828] hover:bg-[#F9FAFB] rounded-lg transition-all"
                title="More options"
                onClick={() => onMore()}
            >
                <MoreVertical className="w-5 h-5"/>
            </button>

        </div>
    );
};


export const DashboardPage_Footer = () => {
    return (
        <footer className="bg-white border-t border-[#F9FAFB] mt-20">
            <div className="max-w-[1400px] mx-auto px-6 py-8 text-center">
                <div className="flex items-center justify-center gap-8 mb-4">
                    <a href="#" className="text-sm text-[#98A2B3] hover:text-[#475467] transition-colors">Privacy Policy</a>
                    <a href="#" className="text-sm text-[#98A2B3] hover:text-[#475467] transition-colors">Terms of Service</a>
                    <a href="#" className="text-sm text-[#98A2B3] hover:text-[#475467] transition-colors">Contact Support</a>
                </div>
                <p className="text-sm text-[#98A2B3]">&copy; 2024 ChatNow. All rights reserved.</p>
            </div>
        </footer>
    )
}


export const Pagination =  ({
       currentPage,
       totalPages,
       filteredCount,
       totalCount,
       onPrevious,
       onNext,
       onPageClick,
   }: PaginationProps
) => {
    return (
        <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-[#475467]">
                Showing{" "}
                <span className="font-medium text-[#101828]">{filteredCount}</span> of{" "}
                <span className="font-medium text-[#101828]">{totalCount}</span> messages
            </p>

            <div className="flex items-center gap-2">
                <button
                    className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#475467] hover:bg-[#F9FAFB] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isActive = page === currentPage;
                    return (
                        <button
                            key={page}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                isActive
                                    ? "bg-[#FF5A1F] text-white hover:bg-[#D94816]"
                                    : "border border-[#D0D5DD] text-[#475467] hover:bg-[#F9FAFB]"
                            }`}
                            onClick={() => onPageClick(page)}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#475467] hover:bg-[#F9FAFB] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}



export const MessageFilter = ({
      filterStatus,
      onFilterChange,
      onNewMessage
  }: FilterProps) => {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value);
    };

    return (
        <div className="flex items-center gap-3 w-full md:w-auto">
            <select
                value={filterStatus}
                onChange={handleSelectChange}
                className="px-4 py-3 border border-[#D0D5DD] rounded-lg text-[#101828] bg-white focus:outline-none focus:border-[#FF5A1F] focus:ring-4 focus:ring-[#FF5A1F]/10 transition-all cursor-pointer"
            >
                <option value="all">All Messages</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
            </select>

            <button
                onClick={onNewMessage}
                className="flex items-center gap-2 px-5 py-3 bg-[#FF5A1F] text-white rounded-lg font-medium hover:bg-[#D94816] transition-all hover:shadow-lg hover:shadow-[#FF5A1F]/30 hover:-translate-y-0.5"
            >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Message</span>
            </button>
        </div>
    );
}


export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    return (
        <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3] w-5 h-5" />
            <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-[#D0D5DD] rounded-lg text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#FF5A1F] focus:ring-4 focus:ring-[#FF5A1F]/10 transition-all"
            />
        </div>
    );
}