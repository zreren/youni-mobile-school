const useLanguage = (key) => {
    if (typeof window !== 'undefined') {
      const language = localStorage.getItem('language');
      console.log(language,'language')
      if (language === '"cn"') {
        return `c${key}`
      } 
        return `e${key}`
    }
}
export default useLanguage;