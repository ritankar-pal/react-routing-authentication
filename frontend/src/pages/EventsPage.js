import { Suspense, useEffect, useState } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';



function EventsPage() {

    //   const [isLoading, setIsLoading] = useState(false);
    //   const [fetchedEvents, setFetchedEvents] = useState();
    //   const [error, setError] = useState();


    
    //   useEffect(() => {
    //     // console.log("USE_EFFECT");

    //     async function fetchEvents() {
    //       setIsLoading(true);
    //       const response = await fetch('http://localhost:8080/events');

    //       if (!response.ok) {
    //         setError('Fetching events failed.');
    //       } else {
    //         const resData = await response.json();
    //         setFetchedEvents(resData.events);
    //       }
    //       setIsLoading(false);
    //     }

    //     fetchEvents();
    //   }, []);


    //Since we are forwarding the 'events' data to "EventsList" component we can use 'useLoaderData' there directly as well:


    //If we want to use Loader then we have to import 'useLoaderData' from react-router-dom:
    // const data = useLoaderData();                 //till lecture 303


    
    const {events} = useLoaderData();                   //from lecture 304
    // console.log(data);
    
    // if(data.isError){
    //   return <p>{data.message}</p>
    // }
    
    // const events = data.events;                     //till lecture 303
    // console.log(events);






    //from lecture 304, when we want to defer certain things in the UI: 
    return(

      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
            {(loadedEvents) => <EventsList events={loadedEvents}/>}
        </Await>
      </Suspense>
    )




    // till lecture 303:
    // return (
    //   <>
    //     {/* <div style={{ textAlign: 'center' }}>
    //       {isLoading && <p>Loading...</p>}
    //       {error && <p>{error}</p>}
    //     </div> */}
    //     {/* {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />} */}

    
    //     <EventsList events={events} />


    //     {/* <EventsList events={data} /> */}
    //     {/* <EventsList /> */}
    //   </>
    // );
}


export default EventsPage;





async function loadEvents() {
  
  const response = await fetch("http://localhost:8080/events");

    if (!response.ok) {

      // return{isError: true, message: "Couldn't Fetch Events!"}
      // throw new Response(JSON.stringify({message: "Couldn't fetch Events!"}), {status: 500})



      //Wrinting response in the above way isn't scalable so we import json from router which includes data in json format: 
      return json(
        {message: "Couldn't fetch Events!"},
        {status: 500}
      )


    } else {

      //useLoaderData() is capable to extract only the response hence response.json() isn't necessary.
      // return response;  

      //Since we are using defer() we have to manually parse the data:
      const resData = await response.json();      // it returns an array of an object:
      // console.log("resDate", resData);          
      return resData.events;
    }
}



//Deferring Data Fetching with defer(): 

export function loader() {
  
  return defer({
    events: loadEvents(),
  })
}




//Till lecture 303: From Lec 304 we moved the code inside the loadEvents function: 

//We should use loader in that component where we actually need it to keep the App.js component leaner: 
// export async function loader() {
    
//   const response = await fetch("http://localhost:8080/events");

//     if (!response.ok) {

//       // return{isError: true, message: "Couldn't Fetch Events!"}
//      // throw new Response(JSON.stringify({message: "Couldn't fetch Events!"}), {status: 500})



//       //Wrinting response in the above way isn't scalable so we import json from router which includes data in json format: 
//       return json(
//         {message: "Couldn't fetch Events!"},
//         {status: 500}
//       )


//     } else {

//       //useLoaderData() is capable to extract only the response hence response.json() isn't necessary.
//       return response;

//       // const resData = await response.json();      // it returns an array of an object:
//       // console.log("resDate", resData);          
//       // return resData.events;
//     }
// };



