import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AvatarSelect } from '../../types/enums';

interface ProfileData {
  avatar?: string;
  name?: string;
  bio?: string;
  avatar_select?: AvatarSelect;
  patreon_avatar?: string;
  gravatar_avatar?: string;
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

    if (e.target.name === 'avatar_select') {
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
