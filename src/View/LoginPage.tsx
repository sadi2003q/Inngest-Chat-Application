import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
    EmailDirection,
    ErrorStatus,
    Footer_Login,
    LoginButton,
    NavigationBar, SignUp_Link,
    SignupHeading,
    SignupUP_SocialMedia, SuccessStatus
} from "./Components/LoginPage.component.tsx";
import { type LoginStatus, type loginInterface } from "../Others/utilities.ts";
import {LoginController} from "../Controller/Login.controller.ts";
import {useAuth} from "../AuthContext.tsx";




export default function LoginPage() {


    // User Information and Status
    const [formData, setFormData] = useState<loginInterface>({ email: '', password: '', remember: false }); //
    const [status, setStatus] = useState<LoginStatus>({  type: null, message: "" });

    // Global Context
    const { setUid } = useAuth();

    // Controller class
    const controller = new LoginController({
        loginInformation: formData,
        setStatus: setStatus,
    });



    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const uid = await controller.login();
        if(uid) setUid(uid);
    };



    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans text-[#475467]">
            {/* Header */}
            <NavigationBar/>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-6 py-10 md:py-[60px]">
                <div className="bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 md:p-12 w-full max-w-[440px]">

                    <SignupHeading/>

                    {/* Social Buttons */}
                    <SignupUP_SocialMedia/>

                    <EmailDirection/>

                    {/* Status Messages */}
                    {status.type === 'error' && <SuccessStatus message={status.message} />}
                    {status.type === 'success' && <ErrorStatus message={status.message} />}

                    {/*  Form  */}
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-[#101828]">Email address</label>
                            <input
                                type="email"
                                id="email"
                                className="px-4 py-3 border border-[#D0D5DD] rounded-lg text-base text-[#101828] bg-white focus:outline-none focus:border-[#FF5A1F] focus:ring-4 focus:ring-[#FF5A1F]/10 transition-all placeholder:text-[#98A2B3] min-h-[48px]"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>


                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-sm font-medium text-[#101828]">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="px-4 py-3 border border-[#D0D5DD] rounded-lg text-base text-[#101828] bg-white focus:outline-none focus:border-[#FF5A1F] focus:ring-4 focus:ring-[#FF5A1F]/10 transition-all placeholder:text-[#98A2B3] min-h-[48px]"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 -mt-2">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 cursor-pointer accent-[#FF5A1F]"
                                    checked={formData.remember}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="remember" className="text-sm text-[#475467] cursor-pointer">Remember me</label>
                            </div>
                            <a href="/forgot" className="text-[#FF5A1F] text-sm font-medium hover:text-[#D94816] transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <LoginButton/>
                    </form>

                    <SignUp_Link/>
                </div>
            </main>

            <Footer_Login/>
        </div>
    );
};

