
import { useLoaderData, useRouteError, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";


function EditEventPage() {

    // const data = useLoaderData();
    const data = useRouteLoaderData('event-id');

    return(
        // <h1>Edit Event Page</h1>
        // <EventForm event={data.event}/>
        
        //After writing the action in EventForm.js:
        <EventForm method='patch' event={data.event}/>
    )
}

export default EditEventPage;