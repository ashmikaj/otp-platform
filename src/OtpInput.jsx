
import React, {useState, useRef, useEffect} from 'react'
import  './App.css'

const OtpInput = ({length=4, onOtpSubmit=()=>{}}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);




    
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);



  const handleChange=(index, e)=>{
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

     // submit trigger
     const combinedOtp = newOtp.join("");
     if (combinedOtp.length === length) onOtpSubmit(combinedOtp);


     //if the current field is filled move cursor to nex t

     if(value && inputRefs.current[index+1] &&  index<length-1){
        inputRefs.current[index+1].focus()
     }


  }

  const handleClick = (index) =>{
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }

    if(index>0 && !otp[index]){
        inputRefs.current[otp.indexOf("")].focus()
    }


  }



  const handleKeyDown = (index , e )=>{


       //if the current field is not filled move cursor to previous

       if(e.key === "Backspace" &&
       !otp[index]  && inputRefs.current[index-1] && index>0 ){
        inputRefs.current[index-1].focus()
     }

  }



  return (
    <div>
      {
        otp.map((value, index)=>{
             return(
                <input
                key={index}
                className='otpInput'
                ref={(input)=>(inputRefs.current[index] = input)}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                
                
                />
             )
        })}
    </div>
  )
}

export default OtpInput
