import {Routes, Route, Navigate} from 'react-router-dom'
import SignupPage from './View/SignUpPage'
import LoginPage from './View/LoginPage'
import ChatInterface from './View/ChatInterfacePage'
import MessagesDashboard from "./View/DashBoardPage.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />


            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/Dashboard" element={<MessagesDashboard/>}/>

        </Routes>
    )
}