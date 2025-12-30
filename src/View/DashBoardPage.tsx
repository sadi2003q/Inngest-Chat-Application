import {useEffect, useRef, useState} from 'react';
import {
    Dashboard_NavigationBar,
    DashboardPage_EmptyList, DashboardPage_Footer,
    DashboardPage_Heading, DashboardPage_MessageList, MessageActions, MessageFilter,
    Pagination, SearchBar
} from "./Components/DashboardPage.component.tsx";
import {type All_Messages, messages, Pages, type User_msg} from "../Others/utilities.ts";
import {DashboardController} from "../Controller/Dashboard.controller.ts";
import {useAuth} from "../AuthContext.tsx";
import {useNavigate} from "react-router-dom";


export default function MessagesDashboard () {

    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [messageHeader, setMessageHeader] = useState<User_msg[]>(messages);

    // Global Context
    const { uid, setApiKey } = useAuth();

    // Routing Variable
    const navigate = useNavigate();



    // Controller Class
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const controller = new DashboardController({ setMessageHeader: setMessageHeader, })

    const filteredMessages = messageHeader.filter(msg => {
        const matchesSearch = msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || msg.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Message List Button Actions...
    const handleSelectMessage = (id: number) => {
        // setSelectedMessages(prev =>
        //     prev.includes(id)
        //         ? prev.filter(msgId => msgId !== id)
        //         : [...prev, id]
        // );
        navigate(`${Pages.ChatInterface}?cid=${id}`)
    };
    const handleOnArchive = (id: number) => { console.log("Clicked : ", id); }
    const handleOnDelete = (id: number) => { console.log("Clicked : ", id); }
    const handleOnMore = () => { console.log("Clicked : "); }

    const handleNewMessage = async () => {
        if (!uid) return;

        const newConversation: All_Messages = {
            createdAt: new Date(),
            Summary: "",
            title: "New Conversation",
            isArchived: false,
            lastMessage_time: new Date(),
            lastMessage: ""
        };

        const cid = await controller.createNewConversation({
            id: uid,
            conversation: newConversation,
        });

        if( cid ) navigate(`${Pages.ChatInterface}?cid=${cid}`);
    };
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        console.log("Go to Page:", currentPage);
    };


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const changeFilter = (e) => setFilterStatus(e.target.value)
    const SignOut_Function = async() => {
        await controller.SignOut();
        navigate(Pages.Login);
    }

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!uid || hasFetched.current) return;
        hasFetched.current = true; // Mark as executed
        const load = async () => { await controller.fetchAllMessageList({ id: uid }) };
        const fetchInformation = async () => {await controller.fetchUserInformation({ id: uid }) };
        load().then();
        fetchInformation().then(response => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setApiKey(response);
        });

    }, [controller, uid]);

    return (
        <div className="min-h-screen bg-[#F9FAFB]">

            {/* Header */}
            <Dashboard_NavigationBar  SignOutFunction={SignOut_Function}/>

            {/* Main Content */}
            <main className="max-w-[1400px] mx-auto px-6 py-12">

                {/* Page Header */}
                <DashboardPage_Heading />

                {/* Toolbar */}
                <div className="bg-white rounded-lg border border-[#D0D5DD] p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                        {/* Search */}
                        <SearchBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />

                        {/* Filter & Actions */}
                        <MessageFilter
                            filterStatus={filterStatus}
                            onFilterChange={changeFilter}
                            onNewMessage={handleNewMessage}
                        />

                    </div>
                </div>

                {/* Messages List */}
                <div className="space-y-4">


                    {filteredMessages.length === 0 ? <DashboardPage_EmptyList  makeNewFunction={handleNewMessage} /> : (

                        filteredMessages.map((message) => (


                            <div
                                key={message.uid}
                                className="bg-white rounded-lg border border-[#D0D5DD] hover:border-[#FF5A1F] transition-all hover:shadow-md cursor-pointer group"
                            >

                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">

                                        {/* Main Content */}
                                        <DashboardPage_MessageList message={message} />

                                        {/* Actions */}
                                        <MessageActions
                                            messageId={message.uid}
                                            onAction={handleSelectMessage}
                                            onArchive={handleOnArchive}
                                            onDelete={handleOnDelete}
                                            onMore={handleOnMore}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {
                    filteredMessages.length > 0 && <Pagination
                        currentPage={currentPage}
                        totalPages={3}
                        filteredCount={filteredMessages.length}
                        totalCount={messages.length}
                        onPrevious={() => handlePageClick(currentPage - 1)}
                        onNext={() => handlePageClick(currentPage + 1)}
                        onPageClick={handlePageClick}
                    />
                }
            </main>

            {/* Footer */}
           <DashboardPage_Footer />
        </div>
    );
};