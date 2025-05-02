const baseURL = import.meta.env.VITE_API_BASE_URL;

const dataService = {
    fetchData: async (path) => {
        const url = `${baseURL}${path}`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        //console.log(`Response Status: ${response.status}`);
  
        return response.json()
    }
};


export default dataService;