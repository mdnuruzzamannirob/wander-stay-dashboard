import ForgotPasswordForm from "@/components/modules/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password - WanderStay Dashboard",
  description:
    "Forgot your password? No worries! Use the form below to reset your password and regain access to your WanderStay Dashboard account. Stay connected and in control of your hospitality business with ease.",
};
const ForgotPasswordPage = () => {
  return (
    <>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPasswordPage;
