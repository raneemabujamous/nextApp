import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';

export interface RegisterRequest {
  email: string;
  password: string;
  first_name:string,
  last_name:string,
  phone_number:  string,

}
import '../src/app/globals.css'
const RegisterPage: NextPage = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        first_name:"",
        last_name:"",
        phone_number:  "",
    });
const [message, setMessage ]=useState("")
    const router = useRouter();
    const handleRegisterClick = () => {
        router.push('/login');
      };
    const submit = async (userData:RegisterRequest) => {
      try {
        const response = await axios.post('http://localhost:8000/api/signup', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data ) {
          const data = response.data;
          setMessage("")
          router.push('/home'); 

        } 
      } catch (error) {
        setMessage(error?.response?.data?.message)

      }
    };
    
 
    const handleLogin = (event) => {
      event.preventDefault();
        submit(userData);
    };



   

    const updateUserDataState = (entity: keyof RegisterRequest, value: string) => {
        const userDataToUpd = { ...userData };
        if (entity == 'email') {
            userDataToUpd[entity] = value;
            setUserData(userDataToUpd);
        } else if (entity == 'password') {
            userDataToUpd[entity] = value;
            setUserData(userDataToUpd);
        }else{
            userDataToUpd[entity] = value;
            setUserData(userDataToUpd);
        }
    };

    return (
        <div className="h-screen ">
            <section className="flex items-center h-full bg-black">
                <img
                    
                    
                    className="h-screen fixed inset-0 w-full scale-150 bg-black opacity-50 stretch"
                    src="https://images.unsplash.com/photo-1512386233331-f023884a92e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2990&q=80"
                ></img>

                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto backdrop-blur-sm md:h-screen lg:py-0">
                    <div className=" bg-opacity-[0.2] backdrop-blur-md drop-shadow-lg w-full rounded-lg shadow-2xl md:mt-3 sm:max-w-xl p-2 md:p-10">
                   
                        <div className="space-y-10 md:space-y-10 sm:p-1">
                            <h1 className="text-2xl font-bold leading-tight tracking-tight text-center text-black md:text-2xl">
                                Sign In
                            </h1>
                            <form className="space-y-7 md:space-y-8">
                                <div>
                                    <label className="flex items-baseline gap-3 mb-2 text-lg text-black">
                                        Email Address{' '}
                                     
                                    </label>
                                    <input
                                        type="email"
                                        value={userData.email}
                                        placeholder="Enter Your Email Address"
                                        className=" p-2 text-black w-full "
                                        onChange={(e) => {
                                            updateUserDataState('email', e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-lg text-black ">Password</label>
                                    <input
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleLogin(e);
                                            }
                                        }}
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="w-full p-2 text-black input input-green-200 "
                                        placeholder="Enter your password"
                                        onChange={(event) => {
                                            updateUserDataState('password', event.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-baseline gap-3 mb-2 text-lg text-black">
                                        First name
                                     
                                    </label>
                                    <input
                                        type='text'
                                        value={userData.first_name}
                                        placeholder="Enter Your First name"
                                        className=" p-2 text-black w-full "
                                        onChange={(e) => {
                                            updateUserDataState('first_name', e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-baseline gap-3 mb-2 text-lg text-black">
                                        Last name
                                     
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.last_name}
                                        placeholder="Enter Your Last name"
                                        className=" p-2 text-black w-full "
                                        onChange={(e) => {
                                            updateUserDataState('last_name', e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-baseline gap-3 mb-2 text-lg text-black">
                                        Phone number 
                                     
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.phone_number}
                                        placeholder="Enter Your phone_number"
                                        className=" p-2 text-black w-full "
                                        onChange={(e) => {
                                            updateUserDataState('phone_number', e.target.value);
                                        }}
                                    />
                                </div>

                                <div className="flex items-center justify-between ">
                                    <div className="flex items-start ">
                                        <div className="ml-3 text-sm "></div>
                                    </div>
                                    <a className="text-sm font-medium text-black cursor-pointer hover:underline " onClick={handleRegisterClick}
>
                                        login                                   </a>
                                </div>

                       
                                    <button
                                        onClick={()=>handleLogin(event)}
                                        className={
                                          
                                            
                                              'bg-green-200  cursor-pointer text-black bg-green-200 p-4 w-full rounded-full font-bold font-display focus:outline-none focus:shadow-outline shadow-lg'
                                        }
                                   >signup</button>
                                   {message.length>1 ?(
<div>
<p className='text-red-200'>{message}</p>
</div>):(null)}

                                
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterPage;
