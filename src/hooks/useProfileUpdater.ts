import { useState } from 'react';
import axios from 'axios';
import { avatarSelect } from '../types/common';

interface ProfileData {
  avatar?: string;
  name?: string;
  bio: string;
  avatar_select?: avatarSelect;
  patreon_avatar?: string;
  gravatar_avatar?: string;
  gets_mail?: boolean;
}

export const useProfileUpdater = (profileData: ProfileData) => {
  const [formData, setFormData] = useState(profileData);

  const updateProfile = async () => {
    await axios.patch('/api/users/update', { ...formData });
  };

  const handleFormChange = (e) => {
    if (e.target.id === 'gets_mail') {
      setFormData({ ...formData, gets_mail: e.target.checked });
    } else if (e.target.value === 'gravatar' || e.target.value === 'patreon') {
      setFormData({ ...formData, avatar_select: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  return {
    formData,
    handleFormChange,
    updateProfile,
  };
};
