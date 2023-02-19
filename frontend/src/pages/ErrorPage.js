import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";



function ErrorPage() {
  const error = useRouteError();   //to differentiate between differnet errors:
  // console.log(error)

  let title = "An Error Occured!";
  let message = "Something Went Wrong!";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    message = error.data.message;    //since we're using json from router in EventsPage.js so parse will be automatic
  }

  if (error.status === 404) {
    title = "Not Found!";
    message = "Couldn't Find Resources Or Page";
  }

  return (
    <>
      <MainNavigation />

      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
