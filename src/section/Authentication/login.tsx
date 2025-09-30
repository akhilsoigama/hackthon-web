import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

// Custom RHF components
import RHFFormField from "../../components/hook-form/RHFFormFiled";
import RHFCheckbox from "../../components/hook-form/RHFCheckbox";
import { Button, Typography } from "@mui/material";

// ---------------------
// Schema & Types
// ---------------------
const LoginSchema = z.object({
  id: z.string().min(1, "ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const defaultValues: LoginFormValues = {
  id: "",
  password: "",
  rememberMe: false,
};

// ---------------------
// Component
// ---------------------
const Login = () => {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="relative w-full h-screen flex ">
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
          {/* Animated Card Content */}
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
                <RHFFormField name="id" label="ID" type="text" required />

                <RHFFormField
                  name="password"
                  label="Password"
                  type="password"
                  required
                />

                <RHFCheckbox name="rememberMe" label="Remember me" />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: "7px",
                    fontWeight: 600,
                    background: "gray",
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
