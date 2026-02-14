import LoginForm from "@/components/modules/auth/LoginForm";

export const metadata = {
  title: "Login - WanderStay Dashboard",
  description:
    "Log in to your WanderStay Dashboard account to manage your bookings, properties, and more with ease. Access your personalized dashboard and stay organized while managing your vacation rental business.",
};

const LoginPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
