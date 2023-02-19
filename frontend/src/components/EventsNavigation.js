import { NavLink, useRouteLoaderData } from 'react-router-dom';



import classes from './EventsNavigation.module.css';




function EventsNavigation() {


  const token = useRouteLoaderData('root'); 


  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>

          <NavLink to='/events' className={({isActive})=> isActive ? classes.active : undefined} end>
            All Events
          </NavLink>

          {token && <NavLink to="/events/new" className={({isActive})=> isActive ? classes.active : undefined}>
            New Event
          </NavLink>}

        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
