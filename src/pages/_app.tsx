import { ChakraProvider } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { useEffect } from "react";
import { supabase } from "../utils/supabase";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log({ event, session });
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!

        fetch("/api/set-auth-cookie", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <ChakraProvider>
      <Auth.UserContextProvider supabaseClient={supabase}>
        {supabase.auth.user() ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : null}
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
