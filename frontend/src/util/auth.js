//a funtion to extract the token that we defined in AuthenticationPage.js 

import { redirect } from "react-router-dom";


export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration'); 
    const expirationDate = new Date (storedExpirationDate);
    const now = new Date(); 
    const duration = expirationDate.getTime() - now.getTime();   //+ve value if token is not exired, -ve otherwise

    return duration;
}






//we can use this token wherever we need:
export function getAuthToken() {
    
    const token = localStorage.getItem('token'); 

    if(!token){
        return null;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    if(tokenDuration < 0){
        return 'EXPIRED';
    }

    return token; 
}





//this loader is for conditionally rendering the UI if we have token or not
export function tokenLoader() {
    return getAuthToken();
}




//this function is for protecting certain routes if we don't have token:
export function checkAuthLoader() {
    
    const token = getAuthToken(); 

    if(!token){
        return redirect('/auth')
    }

    return null;
}