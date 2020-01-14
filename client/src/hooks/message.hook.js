import { useCallback } from 'react';

export const useMessage = () => {
  return useCallback(text => {
    if (window.alert && text) {
      // window.M.toast({ html: text });
      window.alert(text);
    }
  }, []);
}