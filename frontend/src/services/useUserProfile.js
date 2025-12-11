// src/hooks/useUserProfile.js
import { useState, useEffect } from "react";
import api from './apiClient';

export function useUserProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/getById/${userId}`);
        if (res.data.success) {
          setProfile(res.data.data);
        }
      } catch (err) {
        console.error("Error cargando perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading };
}