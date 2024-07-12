import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authprovider';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Please fill in the fields");
        setLoading(false);
        return;
      }
      const data = await login(emailRef.current.value, passwordRef.current.value);
      console.log('Login response:', data);
  
      if (data.error) {
        setErrorMsg(data.error.message);
        MySwal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.error.message,
        });
      } else if (data.user && data.session) {
        MySwal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Redirecting to dashboard...',
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        console.log('Unexpected data structure:', data);
        setErrorMsg("Unexpected error occurred. Please try again.");
        MySwal.fire({
          icon: 'error',
          title: 'Unexpected Error',
          text: 'Please try again later.',
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Email or Password Incorrect");
      MySwal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Email or Password Incorrect',
      });
    }
    setLoading(false);
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
      <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="login-box-msg">Sign in to start your session</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    ref={emailRef}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    ref={passwordRef}
                    required
                  />
                </div>
                <div className="form-group" style={{marginTop: '10px'}}>
                    <button type="submit" className="btn btn-primary btn-block btn-flat" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;