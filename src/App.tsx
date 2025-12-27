import {Routes, Route, Navigate} from 'react-router-dom'
import SignupPage from './View/SignUpPage'
import LoginPage from './View/LoginPage'
import ChatInterface from './View/ChatInterfacePage'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />


            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatInterface />} />
        </Routes>
    )
}