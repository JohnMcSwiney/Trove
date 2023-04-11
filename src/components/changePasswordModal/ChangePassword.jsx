import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGetResetCode } from "../../hooks/resetPassword/useGetResetCode";
import { useVerify } from "../../hooks/resetPassword/useVerified";
import { useResetPassword } from "../../hooks/resetPassword/useResetPassword";

const ChangePassword = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false); // State for showing/hiding new password field
    const [newPassword, setNewPassword] = useState(""); // State for new password
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleEmailCodeChange = (e) => {
      setEmailCode(e.target.value);
    };
  
    const {
        resetCodeSent,
        isLoading,
        error,
        sendResetCode,
      } = useGetResetCode();
    const handleGetEmailCode = (e) => {
     e.preventDefault();
     try{
        sendResetCode(email)
     }catch(error){
        console.log(error);
     }
      console.log(`Email Code: ${emailCode}`); // Display email code in console
    };
  
    const  {
        isCodeVerified,
        verifyIsLoading,
        verifyError,
        verifyResetCode,
      } = useVerify();
    const handleVerifyEmailCode = (e) => {
      e.preventDefault()

      try{
        verifyResetCode(email, emailCode)
      }catch{

      }

    };
  
    const handleNewPasswordChange = (e) => {
      setNewPassword(e.target.value);
    };
  

    const {resetPassword, passwordError, setResetPassworIsLoading} = useResetPassword()
    const handleChangePassword = (e) => {
    e.preventDefault();

    try{
        resetPassword(email, newPassword)
    }catch{

    }
    
    };
  
    return (
        <div>
          <form>
            <Button variant="primary" onClick={handleShow}>
              Reset Password
            </Button>
    
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label htmlFor="email">Account Email: </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
    
              
               {resetCodeSent && ( 
                <>
                <label htmlFor="emailCode">Email Code: </label>
                    <input
                type="text"
                id="emailCode"
                value={emailCode}
                onChange={handleEmailCodeChange}
                className="form-control"
                /></>
               )}

            {/* Button to get email code */}
            {
               (
                    <Button variant="primary" onClick={handleGetEmailCode}>
              Get email code
            </Button>
                )
            }

            {/* New password input field */}
            {isCodeVerified && (
              <>
                <label htmlFor="newPassword">New Password: </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="form-control"
                />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          
              <Button variant="info" onClick={handleVerifyEmailCode}>
                Verify email code
              </Button>
           
              <Button variant="info" onClick={handleChangePassword}>
                Change password
              </Button>
          
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default ChangePassword;
