import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WIN CoE - Sign In",
  keywords: "WIN CoE, Sign In, Loan Repayment Management, Dashboard",
  description: "WIN CoE, Sign In, Loan Repayment Management, Dashboard",
};

export default function SignIn() {
  return <SignInForm />;
}
