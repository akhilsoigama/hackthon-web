import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { LockOutlined, PersonOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { toast } from "sonner";

import RHFFormField from "../../components/hook-form/RHFFormFiled";
import RHFCheckbox from "../../components/hook-form/RHFCheckbox";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";


// Schema & Types
const LoginSchema = z.object({
  email: z.string().min(1, "email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

// ---------------------
// Component
// ---------------------
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const onSubmit = async (data: LoginFormValues) => {
    try{
      const res = await api.post("/login", data);
      Cookies.set('token', res.data.token, { expires: 7, path: '' })
      toast.success("Login Successful");
      navigate("/dashboard");
    }catch (error) {
      toast.error(`${error}`);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="relative w-full h-screen flex">
      {/* Background image */}
      <div className="absolute inset-0 -z-10 opacity-50 lg:opacity-100">
        <img
          loading="lazy"
          src="https://images.unsplash.com/photo-1582886986754-51997372b668?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Login background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left gradient overlay */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-10/12 bg-gradient-to-r from-white to-transparent -z-0"></div>

      {/* Form container */}
      <div className="relative z-10 flex flex-1 justify-center lg:justify-start items-center p-6 lg:p-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-gradient-to-br from-white/80 via-white/60 to-white/50 
                backdrop-blur-lg rounded-2xl lg:rounded-xl shadow-2xl p-6 lg:p-8"
        >
          <Typography
            variant="h4"
            component="h1"
            className="mb-6 font-bold text-gray-800 text-center"
          >
            E-learning platform
          </Typography>

          <Typography
            variant="body2"
            className="mb-6 text-center text-gray-600"
          >
            Please enter your details to continue
          </Typography>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <div className="space-y-5">
                {/* email Field */}
                <RHFFormField
                  name="email"
                  label="email"
                  type="text"
                  placeholder="Enter your email"
                  required
                  icon={<PersonOutline />}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgb(55, 65, 81)",
                    },
                  }}
                />

                <RHFFormField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  required
                  icon={<LockOutlined />}
                  endAdornment={
                    <motion.button
                      type="button"
                      onClick={togglePasswordVisibility}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1 focus:outline-none"
                    >
                      {showPassword ? <VisibilityOff  /> : <Visibility />}
                    </motion.button>
                  }
                  
                />

                <RHFCheckbox 
                  name="rememberMe" 
                  label="Remember me" 
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: "7px",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #4B5563 0%, #374151 100%)",
                    color: "white",
                    "&:hover": { 
                      background: "linear-gradient(135deg, #374151 0%, #1F2937 100%)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                    },
                  }}
                >
                  Log In
                </Button>
              </div>
            </form>
          </FormProvider>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;