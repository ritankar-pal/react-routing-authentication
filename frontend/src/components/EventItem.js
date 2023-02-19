import { Link, useSubmit, Form, useRouteLoaderData } from 'react-router-dom';
import classes from './EventItem.module.css';



function EventItem(props) {

  const submit = useSubmit();   //deleting the event by useSubmit hook which is method 2 of form submission
  const token = useRouteLoaderData('root');

  const {event, method} = props;



  //If we use method 1 i.e. 'Form' from react-router-dom we cannot alert the user:
  function startDeleteHandler() {

    const proceed = window.confirm('Are You Sure ?');

    if(proceed){
      //here we want to return the 'action' if proceed is true:
      submit(null, {method: 'delete'});
    }
  }


  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />

      <h1>{event.title}</h1>

      <time>{event.date}</time>

      <p>{event.description}</p>

      {token && <menu className={classes.actions}>

        <Link to='edit'>Edit</Link>


        {/* If we want to delete the event in terms of form submission mehod 1 */}
        {/* <Form method={method}>
          <button>Delete</button>
        </Form> */}


        <button onClick={startDeleteHandler}>Delete</button>
      </menu>}

    </article>
  );
}

export default EventItem;
