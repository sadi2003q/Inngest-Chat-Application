import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
    uid: string | null;
    setUid: (uid: string | null) => void;
    userName: string | null;
    setUserName: (name: string | null) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [uid, setUid] = useState<string | null>(null); // UID from firebase
    const [userName, setUserName] = useState<string | null>(null);  // User Name from Firebase

    return (
        <AuthContext.Provider value={{ uid, setUid, userName, setUserName }}>
            {children}
            </AuthContext.Provider>
        );
}

// Custom hook (recommended)
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}