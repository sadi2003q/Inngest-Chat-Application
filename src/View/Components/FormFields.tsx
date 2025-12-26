// File: components/FormFields.tsx
import TextField from "@mui/material/TextField";

interface InputFieldProps {
    value: string;
    onChange: (val: string) => void;
}

const commonTextFieldStyles = {
    "& .MuiOutlinedInput-root": {
        color: "#f5f5f5", // input text color
        backgroundColor: "#2a2a2a", // input background
        borderRadius: "12px",
        "& fieldset": {
            borderColor: "#444", // default border
        },
        "&:hover fieldset": {
            borderColor: "#22c55e", // hover border
        },
        "&.Mui-focused fieldset": {
            borderColor: "#22c55e", // focus border
        },
    },
    "& .MuiInputLabel-root": {
        color: "#aaa", // label color
        "&.Mui-focused": {
            color: "#22c55e", // label when focused
        },
    },
};

export const NameField = ({ value, onChange }: InputFieldProps) => (
    <TextField
        label="Name"
        placeholder="Enter your full name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={commonTextFieldStyles}
    />
);

export const EmailField = ({ value, onChange }: InputFieldProps) => (
    <TextField
        label="Email"
        placeholder="Enter your email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={commonTextFieldStyles}
    />
);

export const PasswordField = ({ value, onChange }: InputFieldProps) => (
    <TextField
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={commonTextFieldStyles}
    />
);

export const AIKeyField = ({ value, onChange }: InputFieldProps) => (
    <TextField
        label="AI Key"
        placeholder="Enter your AI API key"
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={commonTextFieldStyles}
    />
);
