
export const useLocalStorage = () => {

  const saveItem = (key: string, data: any) => {
    try {
      const JSONUser = JSON.stringify(data);
      localStorage.setItem(key, JSONUser);
    } catch (error) {
      console.error(error);
      throw new Error("Error saving local storage item for key: " + key);
    }
  }
  
  const getItem = (key: string) => {
    try {
      const result = localStorage.getItem(key);
      return JSON.parse(result!);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting local storage item for key: " + key);
    }
  }
  
  const removeItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting local storage item for key: " + key);
    }
  }
  
  return { removeItem, getItem, saveItem };
}