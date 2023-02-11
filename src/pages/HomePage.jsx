import {React} from 'react';
import { useNavigate } from 'react-router-dom';
//import SignInOrSignUp from './SignInOrSignUp';


const HomePage = () => {
  
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate('/signin');
    
  };
  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div>
        <h1 >Welcome to the iPAS</h1>
        <div className="welcome-container">
          <p >"Welcome to our web application for international students! 
          Our platform was created to simplify the process of uploading and sharing important documents with your Designated School Officials (DSO). 
          With our easy-to-use interface, you can upload all of your necessary documents in a secure and organized manner. 
          Whether you're a new student or returning to campus, our platform ensures that your documents are always accessible and up-to-date. 
          Our team is dedicated to making the process of sharing your information as smooth and stress-free as possible. 
          We take the privacy and security of your information seriously and have implemented the latest encryption technologies to keep your information protected. 
          With our web application, you can rest assured that your documents are always in the right hands. Thank you for choosing our platform to manage your document sharing needs. 
          If you have any questions or concerns, our team is always available to assist you. Get started today and streamline your document sharing process!"
          </p>
        </div>
        
        <div >
          <p>Here you can sign in or sign up to access your web portal!</p>
          
          <div className='container'>
            <button className='button1' onClick={goToSignIn}>Sign In</button><br></br>
            <button className='button1' onClick={goToSignUp}>Sign Up</button>
          </div>

        </div>
        
    </div>
  );
};

export default HomePage;
