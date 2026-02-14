import VerifyOtpForm from "@/components/modules/auth/VerifyOtpForm";

export const metadata = {
  title: "Verify OTP - WanderStay Dashboard",
  description:
    "Verify your OTP to complete the verification process and regain access to your WanderStay Dashboard account.",
};
const VerifyOtpPage = () => {
  return (
    <>
      <VerifyOtpForm />
    </>
  );
};

export default VerifyOtpPage;
