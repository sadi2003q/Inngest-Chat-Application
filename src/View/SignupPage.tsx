// File: pages/AuthPage.tsx
import { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { NameField, EmailField, PasswordField, AIKeyField } from "./FormFields";

export const AuthPage = () => {
    // Signup states
    const [name, setName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [aiKey, setAiKey] = useState("");

    // Login states
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleSignup = () => {
        console.log({ name, email: signupEmail, password: signupPassword, aiKey });
    };

    const handleLogin = () => {
        console.log({ email: loginEmail, password: loginPassword });
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            p={2}
            sx={{
                background: "linear-gradient(to top right, #0f2027, #203a43)",
            }}
        >
            <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                gap={{ xs: 4, sm: 3 }}
                width="100%"
                maxWidth="900px"
                px={2}
            >
                {/* Signup Form */}
                <Paper
                    elevation={8}
                    sx={{
                        flex: 1,
                        p: { xs: 4, sm: 5 },
                        borderRadius: 4,
                        bgcolor: "#1e1e1e",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                        border: "1px solid #444",
                    }}
                >
                    <Typography
                        variant="h4"
                        mb={4}
                        align="center"
                        sx={{
                            background: "linear-gradient(90deg, #67e8f9, #22d3ee)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 700,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            textShadow: "0 2px 4px rgba(0,0,0,0.4)",
                        }}
                    >
                        Sign Up
                    </Typography>

                    <NameField value={name} onChange={setName} />
                    <EmailField value={signupEmail} onChange={setSignupEmail} />
                    <PasswordField value={signupPassword} onChange={setSignupPassword} />
                    <AIKeyField value={aiKey} onChange={setAiKey} />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            background: "#86efac",
                            color: "#166534",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#74dab8" },
                            borderRadius: 2,
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(134,239,172,0.3)",
                        }}
                        onClick={handleSignup}
                    >
                        Sign Up
                    </Button>
                </Paper>

                {/* Login Form */}
                <Paper
                    elevation={8}
                    sx={{
                        flex: 1,
                        p: { xs: 4, sm: 5 },
                        borderRadius: 4,
                        bgcolor: "#1e1e1e",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                        border: "1px solid #444",
                    }}
                >
                    <Typography
                        variant="h4"
                        mb={4}
                        align="center"
                        sx={{
                            background: "linear-gradient(90deg, #fcd34d, #fbbf24)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 700,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            textShadow: "0 2px 4px rgba(0,0,0,0.4)",
                        }}
                    >
                        Login
                    </Typography>

                    <EmailField value={loginEmail} onChange={setLoginEmail} />
                    <PasswordField value={loginPassword} onChange={setLoginPassword} />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            background: "#86efac",
                            color: "#166534",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#74dab8" },
                            borderRadius: 2,
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(134,239,172,0.3)",
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
};
