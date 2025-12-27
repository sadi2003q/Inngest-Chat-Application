import { useState, type ChangeEvent, type FormEvent } from 'react';

import {
    NavigationBar,
    FormInput,
    SocialButton,
    LoginHeader,
    API_indicator,
    Button_CreateAccount, Footer_Signup, Signup_Link,
    SignupStatus
} from './Components/SignupPage.component.tsx'



// --- Types ---
interface SignupStatus {
    type: 'success' | 'error' | null;
    message: string;
}

export default function SignupPage() {
    // --- State ---
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);
    const [status, setStatus] = useState<SignupStatus>({ type: null, message: '' });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        apiKey: '',
        terms: false,
    });

    // --- Helpers ---
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prev) => ({ ...prev, [id]: newValue }));

        // Logic to move progress steps based on field completion
        if (id === 'email' && value.includes('@')) setCurrentStep(2);
        if (id === 'apiKey' && value.length > 10) setCurrentStep(3);
    };

    const getPasswordStrength = () => {
        const pwd = formData.password;
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
        return strength;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.terms) {
            setStatus({
                type: 'error',
                message: 'You must agree to the terms.'
            });
            return;
        }
        setStatus({
            type: 'success',
            message: 'Account created! Redirecting to setup...'
        });

        console.log('Data : ', formData);

    };

    const strength = getPasswordStrength();

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans text-[#475467]">

            <NavigationBar/>

            {/* Main Container */}
            <main className="flex-1 flex items-center justify-center px-6 py-10 md:py-[60px]">
                <div className="bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 md:p-12 w-full max-w-[540px]">

                    <LoginHeader />

                    {/* Progress Steps */}
                    <div className="relative flex justify-between mb-10">
                        <div className="absolute top-4 left-0 w-full h-[2px] bg-[#D0D5DD] z-0" />
                        <div
                            className="absolute top-4 left-0 h-[2px] bg-[#FF5A1F] z-1 transition-all duration-300"
                            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                        />

                        {[
                            { num: 1, label: 'Account' },
                            { num: 2, label: 'API Key' },
                            { num: 3, label: 'Ready' }
                        ].map((step) => (
                            <div key={step.num} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors
                  ${currentStep > step.num ? 'bg-[#027A48] border-[#027A48] text-white' :
                                    currentStep === step.num ? 'bg-[#FF5A1F] border-[#FF5A1F] text-white' :
                                        'bg-[#F9FAFB] border-[#D0D5DD] text-[#475467]'}`}>
                                    {currentStep > step.num ? '✓' : step.num}
                                </div>
                                <span className="text-[12px] font-medium">{step.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Social Login */}
                    <div className="flex flex-col gap-3 mb-8">
                        <SocialButton platform="Google" />
                        <SocialButton platform="GitHub" />
                    </div>

                    <div className="flex items-center text-center my-8 text-sm before:content-[''] before:flex-1 before:border-b before:border-[#D0D5DD] after:content-[''] after:flex-1 after:border-b after:border-[#D0D5DD]">
                        <span className="px-4">Or sign up with email</span>
                    </div>

                    {/* Alert Messages */}
                    {status.type && <SignupStatus type={status.type} message={status.message} />}

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>


                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput label="First name" id="firstName" placeholder="John" value={formData.firstName}
                                       onChange={handleInputChange}/>
                            <FormInput label="Last name" id="lastName" placeholder="Doe" value={formData.lastName}
                                       onChange={handleInputChange}/>
                        </div>

                        {/* Email */}
                        <FormInput label="Email address" id="email" type="email" placeholder="you@example.com"
                                   value={formData.email} onChange={handleInputChange}/>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#101828]">Password <span
                                className="text-[#FF5A1F]">*</span></label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg focus:ring-4 focus:ring-[#FF5A1F]/10 focus:border-[#FF5A1F] outline-none transition-all"
                                    placeholder="Create a strong password"
                                    onChange={handleInputChange}
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#475467]">
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <div className="flex gap-1 mt-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i}
                                         className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? (strength <= 2 ? 'bg-[#FDA29B]' : strength === 3 ? 'bg-[#FDB022]' : 'bg-[#027A48]') : 'bg-[#D0D5DD]'}`}/>
                                ))}
                            </div>
                            <p className="text-[13px] text-[#475467]">Must be at least 8 characters with letters & numbers </p>
                        </div>

                        {/* API Key */}
                        <div className="flex flex-col gap-2">


                            <API_indicator/>


                            <div className="relative">
                                <input
                                    id="apiKey"
                                    type={showApiKey ? 'text' : 'password'}
                                    className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg focus:ring-4 focus:ring-[#FF5A1F]/10 focus:border-[#FF5A1F] outline-none transition-all"
                                    placeholder="sk-..."
                                    onChange={handleInputChange}
                                    required
                                />
                                <button type="button" onClick={() => setShowApiKey(!showApiKey)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#475467]">
                                    {showApiKey ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-3">
                            <input type="checkbox" id="terms" className="mt-1 w-4 h-4 accent-[#FF5A1F]" required
                                   onChange={handleInputChange}/>
                            <label htmlFor="terms" className="text-sm leading-relaxed">
                                I agree to the <a href="#" className="text-[#FF5A1F] font-medium">Terms of
                                Service</a> and <a href="#" className="text-[#FF5A1F] font-medium">Privacy Policy</a>
                            </label>
                        </div>

                        <Button_CreateAccount/>
                    </form>


                    <Signup_Link/>

                </div>
            </main>

            {/* Footer */}
            <Footer_Signup/>

        </div>
    );
}


