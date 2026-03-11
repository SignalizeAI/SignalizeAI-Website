"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const useUserPlan = (enabled: boolean) => {
  const [userPlan, setUserPlan] = useState("free");

  useEffect(() => {
    if (!enabled) return;

    const checkUserPlan = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          setUserPlan("free");
          return;
        }

        const response = await fetch("https://api.signalizeai.org/quota", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });

        if (!response.ok) {
          setUserPlan("free");
          return;
        }

        const data = await response.json();
        setUserPlan(data.plan || "free");
      } catch (error) {
        console.error("Error checking user plan:", error);
        setUserPlan("free");
      }
    };

    void checkUserPlan();
  }, [enabled]);

  return userPlan;
};

export default useUserPlan;
