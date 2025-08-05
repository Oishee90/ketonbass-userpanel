// src/pages/GoogleCallback.jsx

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

        console.log("✅ Fetched Google Data:", data);
        console.log("📤 Posting to opener window...");

        if (window.opener) {
          window.opener.postMessage(
            { type: "GOOGLE_AUTH_SUCCESS", payload: data },
            "*"
          );
          window.close();
        } else {
          console.error("❌ No opener window found");
        }
      } catch (err) {
        console.error("❌ Google callback error", err);
      }
    };

    fetchAndPostToMain();
  }, []);

  return <div>Authenticating...</div>;
};

export default GoogleCallback;
