import ResetPasswordForm from "@/components/modules/auth/ResetPasswordForm";

export const metadata = {
  title: "Reset Password - WanderStay Dashboard",
  description:
    "Reset your password to regain access to your WanderStay Dashboard account and continue managing your bookings, properties, and more with ease.",
};
const ResetPasswordPage = () => {
  return (
    <>
      <ResetPasswordForm />
    </>
  );
};

export default ResetPasswordPage;
