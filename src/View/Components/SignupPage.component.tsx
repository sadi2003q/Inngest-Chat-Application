


export const NavigationBar = () => {
    return (
        <header className="bg-white border-b border-[#F9FAFB] py-5">
            <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-[#101828] tracking-tight hover:opacity-80 transition-opacity">
                    ChatNow
                </a>
                <a href="/signup" className="text-sm text-[#475467] hover:text-[#101828] transition-colors">
                    Don't have an account? <span className="text-[#FF5A1F] font-semibold ml-2">Sign up</span>
                </a>
            </div>
        </header>
    );
}


export const SignupHeading = () => {
    return (
        <div className="text-center mb-10">
            <h1 className="text-3xl md:text-[32px] font-bold text-[#101828] tracking-tight mb-3">Welcome back</h1>
            <p className="text-base">Sign in to transform chaos into clarity</p>
        </div>
    )
}

export const SignupUP_SocialMedia = () => {
    return (
        <div className="flex flex-col gap-3 mb-8">
            <button
                type="button"
                onClick={() => console.log('Google login')}
                className="flex items-center justify-center gap-3 px-6 py-3 border border-[#D0D5DD] rounded-lg bg-white text-[#101828] font-medium hover:bg-[#F9FAFB] hover:border-[#101828] transition-all min-h-[48px]"
            >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
            </button>
            <button
                type="button"
                onClick={() => console.log('GitHub login')}
                className="flex items-center justify-center gap-3 px-6 py-3 border border-[#D0D5DD] rounded-lg bg-white text-[#101828] font-medium hover:bg-[#F9FAFB] hover:border-[#101828] transition-all min-h-[48px]"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                Continue with GitHub
            </button>
        </div>
    )
}


export const FeaturePill = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 text-sm md:text-[13px] text-[#475467]">
        <span className="text-[#027A48] font-bold">✓</span>
        <span>{text}</span>
    </div>
);




export const EmailDirection = () => {
    return(
        <div className="flex items-center text-center my-8 text-sm text-[#475467] before:content-[''] before:flex-1 before:border-b before:border-[#D0D5DD] after:content-[''] after:flex-1 after:border-b after:border-[#D0D5DD]">
            <span className="px-4">Or continue with email</span>
        </div>

    )
}


export const SuccessStatus = ({message}: {message: string}) => {

    return(
        <div className="mb-6 bg-[#FEF3F2] border border-[#FDA29B] text-[#B42318] px-4 py-3 rounded-lg text-sm">
            {message}
        </div>
    );
}


export const ErrorStatus = ({message}: {message: string}) => {
    return(
        <div className="mb-6 bg-[#ECFDF3] border border-[#6CE9A6] text-[#027A48] px-4 py-3 rounded-lg text-sm">
            {message}
        </div>
    )
}


export const Footer_Login = () => {
    return(
        <footer className="py-8 px-6 text-center bg-white border-t border-[#F9FAFB]">
            <div className="text-sm text-[#98A2B3] mb-2">
                <a href="/privacy" className="mx-3 hover:text-[#475467] transition-colors">Privacy Policy</a>
                <a href="/terms" className="mx-3 hover:text-[#475467] transition-colors">Terms of Service</a>
                <a href="/contact" className="mx-3 hover:text-[#475467] transition-colors">Contact Support</a>
            </div>
            <p className="text-sm text-[#98A2B3]">&copy; 2024 ChatNow. All rights reserved.</p>
        </footer>
    );
}


export const LoginButton = () => {
    return(
        <button
            type="submit"
            className="bg-[#FF5A1F] text-white py-3.5 px-6 rounded-lg text-base font-medium hover:bg-[#D94816] hover:shadow-[0_4px_12px_rgba(255,90,31,0.3)] hover:-translate-y-px active:translate-y-0 transition-all min-h-[48px]"
        >
            Sign in
        </button>
    )
}

export const SignUpDirection = () => {
    return (
        <div className="text-center mt-8 text-sm text-[#475467]">
            Don't have an account? <a href="/signup" className="text-[#FF5A1F] font-semibold hover:text-[#D94816] transition-colors">Sign up for free</a>
        </div>
    );
}