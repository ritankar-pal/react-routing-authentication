import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";


function NewEventPage() {
    
    return(
        // <h1>New Event Page</h1>

        // <EventForm/>  

        //After writing the action in EventForm.js:
        <EventForm method='post'/>
    )
}

export default NewEventPage;










//Sending Event Data To Backend using an action:
//We are using this below code in the EventForm.js as it will be used for both this NewEventPage and EditEventPage with silght differences:



// export async function action({request, params}) {
    
//     const data = await request.formData();      // this receives all the form data

//     const eventData = {
//         title: data.get('title'),
//         image: data.get('image'),
//         date: data.get('date'),
//         description: data.get('description'),
//     }


//     const response = await fetch('http://localhost:8080/events', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(eventData),
//     }); 


//     //this response code: 422 is from backend and we are returning the respose that we defined there: 
//     if (response.status === 422){
//         return response;
//     }


//     if(!response.ok){
//         return json(
//             {message: "Couldn't save event!"},
//             {status: 500}
//         )
//     }

//     return redirect('/events');    // redirect redirects the user to the mentioned page.
// }








//Practice:
// export async function action({request, params}) {
    
//     const data = await request.formData(); 

//     const eventData = {
//         title: data.get('title'),
//         image: data.get('image'),
//         date: data.get('date'),
//         description: data.get('description'),
//     }

//     const response = await fetch('http://localhost:8080/events', {
//         method: 'POST',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify(eventData),
//     }); 

//     if(!response.ok){
//         return json(
//             {message: "Couldn't save event!"}, 
//             {status: 500}
//         )
//     }

//     return redirect ('/events');
// };

