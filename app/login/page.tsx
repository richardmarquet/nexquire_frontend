import Footer from "@/components/footer/Footer";
import React from "react";
import AuthForm from "./AuthForm";

const LoginPage = async () => {
  return (
    <div className="w-screen h-screen fixed flex justify-center items-center bg-slate-50 overflow-hidden">
      <AuthForm />
      <div className="absolute bottom-0 h-10">
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
