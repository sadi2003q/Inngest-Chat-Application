import { useState } from 'react';
import { Search, Plus, MessageSquare, Clock, Trash2, Archive, MoreVertical } from 'lucide-react';
import {
    Dashboard_NavigationBar,
    DashboardPage_EmptyList,
    DashboardPage_Heading
} from "./Components/DashboardPage.component.tsx";


export default function MessagesDashboard () {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

    // Sample message data
    const messages = [
        {
            id: 1,
            title: "Product Comparison Analysis",
            lastMessage: "Here's a detailed comparison of the top 5 smartphones in the market...",
            timestamp: "2 hours ago",
            status: "completed",
            messageCount: 12
        },
        {
            id: 2,
            title: "Market Research Data",
            lastMessage: "The market analysis shows significant growth in the AI sector with...",
            timestamp: "5 hours ago",
            status: "completed",
            messageCount: 8
        },
        {
            id: 3,
            title: "Customer Feedback Summary",
            lastMessage: "Based on the feedback from 150 customers, the main pain points are...",
            timestamp: "Yesterday",
            status: "completed",
            messageCount: 15
        },
        {
            id: 4,
            title: "Quarterly Sales Report",
            lastMessage: "Q4 sales performance exceeded expectations with a 23% increase...",
            timestamp: "2 days ago",
            status: "completed",
            messageCount: 20
        },
        {
            id: 5,
            title: "Competitor Analysis",
            lastMessage: "The competitive landscape shows three major players dominating...",
            timestamp: "3 days ago",
            status: "completed",
            messageCount: 10
        },
        {
            id: 6,
            title: "User Demographics Study",
            lastMessage: "Our primary user base consists of professionals aged 25-45 who...",
            timestamp: "4 days ago",
            status: "archived",
            messageCount: 18
        },
        {
            id: 7,
            title: "Feature Request Analysis",
            lastMessage: "The most requested features include dark mode, export to PDF...",
            timestamp: "5 days ago",
            status: "completed",
            messageCount: 9
        },
        {
            id: 8,
            title: "Budget Planning 2024",
            lastMessage: "The proposed budget allocates 40% to development, 30% to marketing...",
            timestamp: "1 week ago",
            status: "completed",
            messageCount: 14
        },
        {
            id: 9,
            title: "Team Performance Metrics",
            lastMessage: "Team productivity has increased by 15% since implementing the new...",
            timestamp: "1 week ago",
            status: "archived",
            messageCount: 11
        },
        {
            id: 10,
            title: "Technology Stack Review",
            lastMessage: "Our current tech stack includes React, Node.js, and PostgreSQL...",
            timestamp: "2 weeks ago",
            status: "completed",
            messageCount: 7
        }
    ];

    const filteredMessages = messages.filter(msg => {
        const matchesSearch = msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || msg.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const handleSelectMessage = (id: number) => {
        setSelectedMessages(prev =>
            prev.includes(id)
                ? prev.filter(msgId => msgId !== id)
                : [...prev, id]
        );
    };

    const handleNewMessage = () => {
        // navigate to Chat page or create a new message entry
        console.log("Creating a new message...");
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            {/* Header */}
            <Dashboard_NavigationBar />


            {/* Main Content */}
            <main className="max-w-[1400px] mx-auto px-6 py-12">
                {/* Page Header */}
                <DashboardPage_Heading />

                {/* Toolbar */}
                <div className="bg-white rounded-lg border border-[#D0D5DD] p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3] w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-[#D0D5DD] rounded-lg text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#FF5A1F] focus:ring-4 focus:ring-[#FF5A1F]/10 transition-all"
                            />
                        </div>

                        {/* Filter & Actions */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 border border-[#D0D5DD] rounded-lg text-[#101828] bg-white focus:outline-none focus:border-[#FF5A1F] focus:ring-4 focus:ring-[#FF5A1F]/10 transition-all cursor-pointer"
                            >
                                <option value="all">All Messages</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                            </select>

                            <button className="flex items-center gap-2 px-5 py-3 bg-[#FF5A1F] text-white rounded-lg font-medium hover:bg-[#D94816] transition-all hover:shadow-lg hover:shadow-[#FF5A1F]/30 hover:-translate-y-0.5">
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">New Message</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages List */}
                <div className="space-y-4">
                    {filteredMessages.length === 0 ? (
                        <DashboardPage_EmptyList  makeNewFunction={handleNewMessage} />
                    ) : (
                        filteredMessages.map((message) => (
                            <div
                                key={message.id}
                                className="bg-white rounded-lg border border-[#D0D5DD] hover:border-[#FF5A1F] transition-all hover:shadow-md cursor-pointer group"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Main Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-semibold text-[#101828] truncate group-hover:text-[#FF5A1F] transition-colors">
                                                    {message.title}
                                                </h3>
                                                {message.status === 'archived' && (
                                                    <span className="px-2.5 py-1 bg-[#F9FAFB] text-[#475467] text-xs font-medium rounded-md">
Archived
</span>
                                                )}
                                            </div>

                                            <p className="text-[#475467] mb-4 line-clamp-2 leading-relaxed">
                                                {message.lastMessage}
                                            </p>

                                            <div className="flex items-center gap-6 text-sm text-[#98A2B3]">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{message.timestamp}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MessageSquare className="w-4 h-4" />
                                                    <span>{message.messageCount} messages</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="p-2 text-[#475467] hover:text-[#FF5A1F] hover:bg-[#FEF3F2] rounded-lg transition-all"
                                                title="Archive"
                                            >
                                                <Archive className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="p-2 text-[#475467] hover:text-[#B42318] hover:bg-[#FEF3F2] rounded-lg transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="p-2 text-[#475467] hover:text-[#101828] hover:bg-[#F9FAFB] rounded-lg transition-all"
                                                title="More options"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {filteredMessages.length > 0 && (
                    <div className="mt-8 flex items-center justify-between">
                        <p className="text-sm text-[#475467]">
                            Showing <span className="font-medium text-[#101828]">{filteredMessages.length}</span> of{' '}
                            <span className="font-medium text-[#101828]">{messages.length}</span> messages
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#475467] hover:bg-[#F9FAFB] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-4 py-2 bg-[#FF5A1F] text-white rounded-lg font-medium hover:bg-[#D94816] transition-all">
                                1
                            </button>
                            <button className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#475467] hover:bg-[#F9FAFB] transition-all">
                                2
                            </button>
                            <button className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#475467] hover:bg-[#F9FAFB] transition-all">
                                3
                            </button>
                            <button className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#475467] hover:bg-[#F9FAFB] transition-all">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
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
        </div>
    );
};