import { Form, json, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { getAuthToken } from "../util/auth";

import classes from "./EventForm.module.css";







function EventForm({ method, event }) {

  const data = useActionData();           //This will return the response coming from the action defined in NewEventPage.js
  const navigate = useNavigate();        //to navigate to a different page programatically
  const navigation = useNavigation();    // to find out differnet state of submission i.e. loading, subbmitting, idle etc


  const isSubmitting = navigation.state === 'submitting'; 



  function cancelHandler() {
    navigate("..");
  }




  return ( 
    // <form className={classes.form}>
    <Form method={method} className={classes.form}>

      {/* We want to display the error messages defined in backened here if we submit the form without any inputs */}
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err => <li key={err}>
          {err}
        </li>)}
      </ul>}


      
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>


      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>

        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>


    {/* </form> */}
    </Form>
  );
}

export default EventForm;







//Action defined to be used in both NewEventPage.js and EditEventPage.js:
export async function action({request, params}) {
    
  const method = request.method;
  const data = await request.formData();      // this receives all the form data

  const token = getAuthToken()        //Accessing the token

  const eventData = {
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description'),
  }

  //there will be two url types: for NewEvent and EditEvent respectively: 

  let url = 'http://localhost:8080/events'; 

  if(method === 'PATCH'){
    const id = params.eventId; 
    url = 'http://localhost:8080/events/' + id;
  }


  // const response = await fetch('http://localhost:8080/events', {
  const response = await fetch(url, {
      // method: 'POST',
      method: method,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(eventData),
  }); 



  //this response code: 422 is from backend and we are returning the respose that we defined there: 
  if (response.status === 422){
      return response;
  }


  if(!response.ok){
      return json(
          {message: "Couldn't save event!"},
          {status: 500}
      )
  }

  return redirect('/events');    // redirect redirects the user to the mentioned page.
}