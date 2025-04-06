export const BASE_URL = "https://aircall-api.onrender.com/";


const checkResponse = async (response) => {

   
    if (!response.ok) {
        console.log("response ",response.ok);
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
    }
    return response.json();
};

export const getAllCallActivities = async() => {
    try{

        const response = await fetch(`${BASE_URL}activities`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              
            },
            
          });
        return await checkResponse(response);
    }catch(error){
        console.error("Error fetching data:", error);
        throw error;
       
    }
}

export const getAllCallDetails = async(call_id) => {
    try{

        const response = await fetch(`${BASE_URL}activities/${call_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              
            },
            
          });
        return await checkResponse(response);
    }catch(error){
        console.error("Error fetching data:", error);
        throw error;
       
    }
}
 

export const updateCall = async(call_id,is_archived) => {
    try{

        const response = await fetch(`${BASE_URL}activities/${call_id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                is_archived: is_archived, // Send the is_archived status in the body
            }),
            
          });
        return response
    }catch(error){
        console.error("Error fetching data:", error);
        throw error;
       
    }
}


export const resetCall = async () =>{
    try{

        const response = await fetch(`${BASE_URL}reset`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },            
          });
        return response
    }catch(error){
        console.error("Error fetching data:", error);
        throw error;
       
    }
}
 