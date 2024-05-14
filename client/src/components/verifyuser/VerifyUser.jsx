import { useEffect } from "react";
import { useAuthToken } from "../../AuthTokenContext";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function VerifyUser() {
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    async function verifyUser() {
      try {
        // Make a call to your API to verify the user in your database
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verify-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Parse the response as JSON
        const user = await response.json();

        // Redirect the user to the homepage
        if(user.auth0ID){
          navigate("/profile")
        }

        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to verify user");
        }

        

        // Store the user data in local storage
        localStorage.setItem("userData", JSON.stringify(userData));

      } catch (error) {
        console.error("Error verifying user:", error);
        // Handle error, such as showing an error message to the user
      }
    }

    if (accessToken) {
      verifyUser();
    }
  }, [accessToken, navigate]);

  

return <div className="loading">Loading...</div>;
}


