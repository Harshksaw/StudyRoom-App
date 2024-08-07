import OtpInput from 'react-otp-input';
export const StepTwo = ({
  nextStep,
  prevStep,
  userOTP,
  userEmailOTP,
  setOtpInputs,
  setOtpEmailInputs,
  verified
}: any) => (

  <div>
    <div>
      <label>Enter Phone's OTP</label>
      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
        {/* {[1, 2, 3, 4].map((index) => (
          <div key={index} className="w-16 h-16 mr-1 mt-2">
            <input
              type="number"
              name={`otp${index}`}
              id="adminPhoneOTP"
              className="w-full h-full text-center outline-none border border-gray-200 bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              maxLength={1}
              value={userOTP[`otp${index}`]}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        ))} */}
        <OtpInput value={userOTP} numInputs={4} onChange={setOtpInputs}
          inputType='number'
        placeholder='0000'
        containerStyle={
          {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px'
          }
        }

          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} style={
            {
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              textAlign: 'center'
            }
          } />}
          />
      </div>
    </div>

    {/* Email OTP */}
    <div className="mt-2">
      <label>Enter Email's OTP</label>
      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
    

        <OtpInput value={userEmailOTP} numInputs={4} onChange={setOtpEmailInputs}
             inputType='number'
             placeholder='0000'
             containerStyle={
               {
                 display: 'flex',
                 justifyContent: 'center',
                 gap: '10px',
                 padding: '10px'
               }
             }
     
               renderSeparator={<span>-</span>}
               renderInput={(props) => <input {...props} style={
                 {
                   width: '50px',
                   height: '50px',
                   borderRadius: '10px',
                   border: '1px solid #ccc',
                   textAlign: 'center'
                 }
               } />}
               />
      </div>
    </div>

    <div className="flex flex-row gap-40  absolute bottom-10 right-6  items-center justify-between">
      <button
        className=" mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-6 rounded-full"
        onClick={prevStep}
      >
        Back
      </button>

      {
        verified.one && verified.two &&(

          <button
          className=" center  mt-1 bg-gradient-to-r from-sky-600 to-sky-300 text-white py-2 px-20 rounded-full"
          onClick={nextStep}
          >
        Next
      </button>
      )
      }
   
    </div>
  </div>
);
