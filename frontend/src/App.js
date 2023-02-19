import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditEventPage from "./pages/EditEventPage";
import ErrorPage from "./pages/ErrorPage";
import EventDetailPage, {loader as eventDetailLoader, action as deleteEventAction} from "./pages/EventDetailPage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage"
import EventsRootLayout from "./pages/EventsRootLayout";
import HomePage from "./pages/HomePage";
// import NewEventPage, {action as newEventAction} from "./pages/NewEventPage";
import NewEventPage from "./pages/NewEventPage";
import { action as manipulateEventAction } from "./components/EventForm";
import RootLayout from "./pages/RootLayout";
import NewsletterPage, {action as newsletterAction } from "./pages/NewsletterPage";
import AuthenticationPage, {action as authAction} from "./pages/AuthenticationPage";
import {action as logoutAction} from "./pages/LogoutPage";
import { checkAuthLoader, tokenLoader } from "./util/auth";





const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
            // loader: async () => {
            //   const response = await fetch("http://localhost:8080/events");

            //   if (!response.ok) {
          
            //     return {isError: true, message: "Couldn't Fetch Events!"}
          
            //   } else {
          
            //     //useLoaderData() is capable to extract only the response hence response.json() isn't necessary.
            //     return response;
          
            //     // const resData = await response.json();      // it returns an array of an object:
            //     // // console.log("resDate", resData);          
            //     // return resData.events;
            //   }
            // },
          },

          {
            path: ":eventId", 
            id: 'event-id',
            loader: eventDetailLoader,    //We want this loader function in both the below components hence we are nesting it:
            children: [

              {
                index: true, 
                element: <EventDetailPage />, 
                action: deleteEventAction         //action defined to delete an event
              },
              
              { path: "edit", 
                element: <EditEventPage />, 
                action: manipulateEventAction,
                loader: checkAuthLoader      //this route need to be protected from visiting if user not logged in
              },
            ]
          },
          
          // { 
          //   path: ":eventId", 
          //   element: <EventDetailPage />,
          //   loader:  eventDetailLoader
          // },

          { 
            path: "new", 
            element: <NewEventPage />,
            // action: newEventAction
            action: manipulateEventAction,
            loader: checkAuthLoader      //this route need to be protected from visiting if user not logged in
          },
          // { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },

      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction
      },

      {
        path: 'newsletter',
        element: <NewsletterPage/>,
        action: newsletterAction
      },

      {
        path: 'logout',
        action: logoutAction
      }

    ],
  },
]);




function App() {
  return <RouterProvider router={router} />;
}

export default App;
