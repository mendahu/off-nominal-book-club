import { renderHook, act } from '@testing-library/react-hooks';
import { AvatarSelect } from '../../../types/enums';
import { ProfileData, useProfileUpdater } from '../useProfileUpdater';

describe('useProfileUpdater', () => {
  const testFormData: ProfileData = {
    name: 'jake',
    avatar_select: AvatarSelect.Gravatar,
  };

  it('Should change the state when handleFormChange is called', () => {
    const { result } = renderHook(() => useProfileUpdater(testFormData));

    expect(result.current.formData.name).toBe('jake');

    const event = {
      target: {
        id: 'name',
        value: 'jb',
      },
    };

    act(() => {
      result.current.handleFormChange(event);
    });

    expect(result.current.formData.name).toBe('jb');
  });

  it('Should change the avatar select state when handleFormChange is called', () => {
    const { result } = renderHook(() => useProfileUpdater(testFormData));

    const event = {
      target: {
        name: 'avatar_select',
        value: 'patreon',
      },
    };

    act(() => {
      result.current.handleFormChange(event);
    });

    expect(result.current.formData.avatar_select).toBe('patreon');
  });
});
