import { useEffect } from "react";
import { Outlet, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../util/auth";
// import NewsletterSignup from "../components/NewsletterSignup";



function RootLayout() {

    // const navigation = useNavigation();
    const token = useLoaderData();
    const submit = useSubmit();


    //for auto logout after 1hr
    useEffect(()=>{

        if(!token){
            return;
        }

        //If the token expires which is after 1hr we want to trigger the logout action: 
        if(token === 'EXPIRED'){
          submit(null, {action: '/logout', method: 'post'});
          return;
        }
 

        const tokenDuration = getTokenDuration();
        // console.log(tokenDuration);


        setTimeout(() => {

            submit(null, {action: '/logout', method: 'post'});
        // }, 1 * 60 * 60 * 1000);
        }, tokenDuration);

    }, [token, submit]);



    return(
        <>
            <MainNavigation/>


            <main>
                {/* {navigation.state === "loading" && <p>Loading...</p>} */}

                <Outlet/>
            </main>
        </>
    )
}

export default RootLayout;