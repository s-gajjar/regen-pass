import React from "react";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import useGlobalStorage from "../store";

/**
 * ClerkAuth Component - Handles Clerk authentication and user management
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Optional CSS class for styling
 * @param {string} props.buttonText - Text to display on the login button (default: "Sign In")
 * @param {string} props.appearance - Button appearance ("default" or "custom")
 * @returns {JSX.Element} - Rendered component
 */
export const ClerkAuth: React.FC<{
  className?: string;
  buttonText?: string;
  appearance?: "default" | "custom";
}> = ({ className = "", buttonText = "Sign In", appearance = "default" }) => {
  const navigate = useNavigate();
  const { setEmail, setName } = useGlobalStorage();
  const { user, isSignedIn } = useUser();
  
  // Effect to update global storage when user is signed in
  React.useEffect(() => {
    if (isSignedIn && user) {
      // Set user information in global storage
      setEmail(user.primaryEmailAddress?.emailAddress || "");
      setName(user.firstName || "");
      
      // Navigate to events page if on homepage
      if (window.location.pathname === "/") {
        navigate("/events");
      }
    }
  }, [isSignedIn, user, setEmail, setName, navigate]);

  // If user is signed in, show UserButton
  if (isSignedIn) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm font-medium mr-2">
          {user?.firstName || "User"}
        </span>
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }

  // If user is not signed in, show SignInButton
  return (
    <div className={`${className}`}>
      {appearance === "default" ? (
        <SignInButton mode="modal" />
      ) : (
        <SignInButton mode="modal">
          <button className="bg-[#0847f7] text-white px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:bg-blue-600">
            {buttonText}
          </button>
        </SignInButton>
      )}
    </div>
  );
};

export default ClerkAuth; 