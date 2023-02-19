import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';






function NewsletterSignup() {


  const fetcher = useFetcher();
  const { data, state } = fetcher;
  
  
  //But useNavigation was meant to be used with actual route transitions. The state you get from Fetcher instead tells you whether the Fetcher behind the scenes completed its loader/action that was triggered.


  useEffect(()=>{
    if(state === 'idle' && data && data.message){
      window.alert(data.message);
    }
  }, [data, state])



  return (
    // <form method="post" className={classes.newsletter}>

    //fetcher.form will still trigger a action but not initialize a route transition unlike Form:
    <fetcher.Form action='/newsletter' method="post" className={classes.newsletter}>

      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />

      <button>Sign up</button>
    </fetcher.Form>
    // </form>
  );
}

export default NewsletterSignup;