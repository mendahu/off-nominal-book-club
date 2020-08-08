import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { avatarSelect } from '../types/enums';

interface ProfileData {
  avatar?: string;
  name?: string;
  bio?: string;
  avatar_select?: avatarSelect;
  patreon_avatar?: string;
  gravatar_avatar?: string;
  gets_mail?: boolean;
}

type HandleFormChangeOptions = {
  update: boolean;
};

export const useProfileUpdater = (profileData: ProfileData) => {
  const [formData, setFormData] = useState(profileData);

  const updateProfile = async (overrideData?: any): Promise<AxiosResponse> => {
    let data = overrideData || formData;
    return await axios.patch('/api/users/update', { ...data });
  };

  const handleFormChange = async (e, options?: HandleFormChangeOptions) => {
    const update = options?.update;

    if (e.target.id === 'gets_mail') {
      setFormData({ ...formData, gets_mail: e.target.checked });
      if (update) {
        return await updateProfile({
          ...formData,
          gets_mail: e.target.checked,
        });
      }
    } else if (e.target.name === 'avatar_select') {
      setFormData({ ...formData, avatar_select: e.target.value });
      if (update) {
        return await updateProfile({
          ...formData,
          avatar_select: e.target.value,
        });
      }
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
