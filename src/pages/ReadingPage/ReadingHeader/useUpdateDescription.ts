import { ChangeEvent, useState } from "react";

export const useUpdateDescription = (
  desc: string,
  updateReading: (body: { description: string }) => Promise<void>
) => {
  const defaultDescription = "No description for this reading.";

  const [active, setActive] = useState(false);
  const [serverCache, setServerCache] = useState(desc);
  const [formData, setFormData] = useState(desc || defaultDescription);

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData(event.target.value);
  };

  const descCanBeChanged =
    formData !== serverCache && formData !== "" && active;

  const update = async () => {
    if (descCanBeChanged) {
      return updateReading({ description: formData })
        .then((res) => {
          setActive(false);
          setServerCache(formData);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      setActive(!active);
      setFormData(serverCache);
      return;
    }
  };

  return {
    editModeActive: active,
    description: formData,
    setDescription: handleChange,
    update,
  };
};
