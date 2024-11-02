export const copyToClipboard = (text: string, successCallback: () => void) => {
    navigator.clipboard.writeText(text).then(successCallback);
  };
  