import {MessageSquare} from "lucide-react";
import type {EmptyListProps} from "../../Others/utilities.ts";


export const Dashboard_NavigationBar = () => {
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
                        <button className="px-4 py-2 text-sm font-medium text-[#475467] hover:text-[#101828] transition-colors">
                            Profile
                        </button>
                        <button className="px-5 py-2.5 bg-[#FF5A1F] text-white rounded-lg font-medium text-sm hover:bg-[#D94816] transition-all hover:shadow-lg hover:shadow-[#FF5A1F]/30 hover:-translate-y-0.5">
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