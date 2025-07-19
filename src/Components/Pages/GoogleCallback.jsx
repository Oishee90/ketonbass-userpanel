import { useEffect } from "react";

const GoogleCallback = () => {
  useEffect(() => {
    const fetchAndPostToMain = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
             
      if (!code) {
        console.error("❌ No auth code found");
        return;
      }

      try {
        const res = await fetch(
          `https://3ed269d4afe9.ngrok-free.app/google-auth/google/login/callback/?code=${code}`
        );
        const data = await res.json();

        if (window.opener) {
          // ✅ Send data to main window
          window.opener.postMessage(
            { type: "GOOGLE_AUTH_SUCCESS", payload: data },
            "*"
          );

          window.close(); // ✅ Close the popup window
        } else {
          console.error("No opener found");
        }
      } catch (err) {
        console.error("Google callback error", err);
      }
    };

    fetchAndPostToMain();
  }, []);

  return <div>Authenticating...</div>; // Just for debugging (optional)
};

export default GoogleCallback;
