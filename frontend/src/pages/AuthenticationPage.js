import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;






export async function action({request, params}) {

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';


  if(mode !== 'login' && mode !== 'signup'){
    throw json(
      {message: 'Unsupported Mode'},
      {status: 422},
    )
  }

  const data = await request.formData(); 

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  }



  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'     
    },
    body: JSON.stringify(authData), 
  })

  if(response.status === 422 || response.status === 401){
    return response;
  }

  if(!response.ok){
    throw json({message: "Couldn't authenticate user"}, {status: 500})
  }

  //Soon we will use authentication token 
  const resData = await response.json(); 
  const token = resData.token;                  //this .token is a key defined in the backend

  //storing the token in the local storage:
  localStorage.setItem('token', token);




  //to set an expiration of the token (Will expire after 1hr):
  const expiration = new Date(); 
  expiration.setHours(expiration.getHours() + 1);  
  localStorage.setItem('expiration', expiration.toISOString());


  return redirect('/');
}



//Practice: 

// export async function action({request, params}) {
  
//   const searchParams = new URL(request.url).searchParams;
//   const mode = searchParams.get('mode') || 'login';


//   if(mode !== 'login' && mode !== 'signup'){
//     throw json(
//       {message: "Unsupported Mode!"}, 
//       {status: 422}
//     )
//   }


//   const data = await request.formData(); 
//   const authData = {
//     email: data.get('email'),
//     passsword: data.get('passsword'),
//   }; 

//   const response = await fetch('http://localhost:8080/' + mode,{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(authData)
//   });


//   if(response.status === 422 || response.status === 401){
//     return response;
//   }


//   if(!response.ok){
//     throw json({message: "Couldn't authenticate user"}, {status: 500})
//   }

//   const resData = await response.json(); 
//   const token = resData.token;  //this .token is a key defined in the backend

//   //to store this token: 
//   localStorage.setItem('token', token);

//   return redirect('/');

// }