import { Suspense } from "react";
import { defer, json, redirect, useLoaderData, useParams, useRouteLoaderData, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { getAuthToken } from "../util/auth";



function EventDetailPage() {
  // const params = useParams();

  // const data = useLoaderData();

  
  // const data = useRouteLoaderData('event-id');                     //till Lecture 304: 

  const {event, events} = useRouteLoaderData('event-id');            //from lecture 305             
  // console.log(data);




  //from lecture 305: 
  return(
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents}/>}
        </Await>
      </Suspense>
      
    </>
  )



 //till Lecture 304: 
  // return (
  //   <>
  //     {/* <h1>Event Detail Page</h1>
  //     <p>{params.eventId}</p> */}

  //     <EventItem event={data.event}/>

  //     {/* The below code is when we want to use Form from react-router-dom */}
  //     {/* <EventItem method='delete' event={data.event}/> */} 

  //   </>
  // );
}

export default EventDetailPage;







async function loadEvent(id) {
  
  const response = await fetch('http://localhost:8080/events/' + id)

  if(!response.ok){

    return json(
      {message: "Couldn't fetch data for the selected event."},
      {status: 500}
    )

  }else{

    // return response;
    const resData = await response.json()
    // console.log(resData);
    return resData.event;
  }
}





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




export async function loader({request, params}){

  const id = params.eventId;

  return defer({
    event:  await loadEvent(id),
    events: loadEvents()
  })
}





//to fetch the data from backend: (till lecture 304)
// export async function loader({request, params}) {
  
//   const id = params.eventId;

//   const response = await fetch('http://localhost:8080/events/' + id)

//   if(!response.ok){

//     return json(
//       {message: "Couldn't fetch data for the selected event."},
//       {status: 500}
//     )

//   }else{

//     return response;
//     // const resData = await response.json()
//     // console.log(resData);
//     // return resData;
//   }
                                                              
// }







//action function to delete an event: 
export async function action({request, params}) {

  const id = params.eventId;

  //To receive the token we defined in the util folder: 
  const token = getAuthToken();

  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method, 
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }); 

  if(!response.ok){
    throw json(
      {message: "Couldn't Delete Event!"},
      {status: 500}
    )
  }

  return redirect('/events');
}