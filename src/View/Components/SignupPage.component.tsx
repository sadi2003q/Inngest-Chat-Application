import { Link } from 'react-router-dom'


export const NavigationBar = () => {
    return (
        <header className="bg-white border-b border-[#F9FAFB] py-5">
            <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
                <Link to="/login" className="text-2xl font-bold text-[#101828] tracking-tight">ChatNow</Link>
                <Link to="/login" className="text-sm hover:text-[#101828]">
                    Already have an account?
                    <span className="text-[#FF5A1F] font-semibold ml-2">Sign in</span>
                </Link>
            </div>
        </header>
    )
}


export const LoginHeader = () => {
    return (
        <div className="text-center mb-10">
            <h1 className="text-3xl md:text-[32px] font-bold text-[#101828] tracking-tight mb-3">Start your free trial</h1>
            <p className="text-base text-[#475467]">Transform chaos into clarity in minutes</p>
        </div>
    )
}




export const API_indicator = () => {
    return (
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-[#101828]">API Key <span className="text-[#FF5A1F]">*</span></label>
            <div className="group relative">
                <span className="cursor-help text-[#98A2B3] text-xs border border-[#98A2B3] rounded-full w-4 h-4 flex items-center justify-center">?</span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-[#101828] text-white text-[12px] rounded-lg shadow-xl z-50">
                    Your OpenAI or Anthropic API key. We encrypt and securely store your key.
                </div>
            </div>
        </div>
    );
}

export const FormInput = ({ label, id, type = 'text', placeholder, value, onChange }: any) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-medium text-[#101828]">{label} <span className="text-[#FF5A1F]">*</span></label>
        <input
            id={id}
            type={type}
            className="px-4 py-3 border border-[#D0D5DD] rounded-lg focus:ring-4 focus:ring-[#FF5A1F]/10 focus:border-[#FF5A1F] outline-none transition-all placeholder:text-[#98A2B3]"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

export const SocialButton = ({ platform }: { platform: string }) => (
    <button type="button" className="flex items-center justify-center gap-3 px-6 py-3 border border-[#D0D5DD] rounded-lg font-medium hover:bg-[#F9FAFB] transition-all">
        {platform === 'Google' ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
        )}
        Continue with {platform}
    </button>
);


export const Footer_Signup = () => {
    return (
        <footer className="py-8 text-center text-sm text-[#98A2B3] border-t bg-white">
            <div className="space-x-4 mb-2">
                <a href="#" className="hover:text-[#475467]">Privacy Policy</a>
                <a href="#" className="hover:text-[#475467]">Terms</a>
                <a href="#" className="hover:text-[#475467]">Support</a>
            </div>
            <p>&copy; 2024 ChatNow. All rights reserved.</p>
        </footer>
    );
}


export const Button_CreateAccount = () => {
    return (
        <button type="submit" className="bg-[#FF5A1F] text-white py-3.5 px-6 rounded-lg font-medium hover:bg-[#D94816] transition-all hover:shadow-lg active:scale-[0.98]">
            Create account
        </button>
    );
}


export const Signup_Link = () => {
    return (
        <div className="text-center mt-8 text-sm">
            Already have an account? <Link to="/login" className="text-[#FF5A1F] font-bold">Sign in</Link>
        </div>
    )
}


export const SignupStatus = ({type, message}: {type: string, message: string}) => {
    return (
        <div
            className={`mb-6 p-4 rounded-lg border text-sm ${type === 'error' ? 'bg-[#FEF3F2] border-[#FDA29B] text-[#B42318]' : 'bg-[#ECFDF3] border-[#6CE9A6] text-[#027A48]'}`}>
            {message}
        </div>
    )
}