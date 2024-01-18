import React, { useRef, useState } from 'react'
import OtpInput from './OtpInput'

const PhoneNumber = () => {

     const [ phoneNumber, setPhoneNumber]=useState('')
     const [ showOtpInput, setShowOtpInput] = useState(false)


    const descRef = useRef();


    const hnadlePhoneNumber =  (event)=>{
        setPhoneNumber(event.target.value)

    }

    const handlePhoneSubmit = (event) => {
        event.preventDefault();
    
        // phone validations
        const regex = /[^0-9]/g;
        if (phoneNumber.length !== 10 || regex.test(phoneNumber)) {
          alert("Invalid Phone Number");
          return;
        }
    
        // Call BE API
        // show OTP Field
        setShowOtpInput(true);
      };
    
      const onOtpSubmit = (otp) => {
        console.log("Login Successful", otp);
      };

  return (
    <div className='input-container'>
       {!showOtpInput? <form  onSubmit={(event)=>handlePhoneSubmit(event)}>
        <input 
           placeholder='Enter your phone number'
           className='input-phone'
           ref={descRef}
           value={phoneNumber}
           onChange={hnadlePhoneNumber}
         />
         <div>
         <button className='submit-btn' type='submit'>Send OTP</button>
         </div>
       
        </form>:
        <div>
            <p>Enter otp sent to <b>******{phoneNumber.slice(-4)}</b></p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
        }
    
    </div>
  )
}

export default PhoneNumber