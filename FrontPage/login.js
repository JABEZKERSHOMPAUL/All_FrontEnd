import axios from 'axios';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import eye from './../image/eye.png';
import closedeye from './../image/closedeye.png';

function Login() {
  let navigate = useNavigate();
  const [showpassword, setshowPassword] = useState(false);

  const passwordToggle = () => {
    setshowPassword(!showpassword);
  };
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  const [isAgree, setIsAgree] = useState(false);

  const handleChange = (e) => {
    setUserLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (userLogin.email === '') {
      toast.error('Email Required');
      return;
    }
    if (userLogin.password === '') {
      toast.error('Password Required');
      return;
    }
    if (isAgree === false) {
      toast.error('Check Required');
      return;
    }

    const res = await axios.post('http://localhost:8080/user/login', userLogin);
    console.log(res);
    if (res.data.status !== 0) {
      toast.success(res.data.message);
      localStorage.setItem('token', res.data.token);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <div className="container m-auto w-25 mt-5 border border-1 border-dark p-4 rounded">
      <div>
        <div class="mb-3">
          <h1 className="text-center">Login</h1>
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => handleChange(e)}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <div className="position-relative">
            <input
              type={showpassword ? 'text' : 'password'}
              name="password"
              class="form-control "
              id="exampleInputPassword1"
              onChange={(e) => handleChange(e)}
            />
            {showpassword ? (
              <img
                src={eye}
                className="position-absolute top-0 end-0 mt-2 me-2"
                style={{ cursor: 'pointer' }}
                width={'20px'}
                height={'20px'}
                onClick={passwordToggle}
              />
            ) : (
              <img
                src={closedeye}
                className="position-absolute top-0 end-0 mt-2 me-2"
                style={{ cursor: 'pointer' }}
                width={'20px'}
                height={'20px'}
                onClick={passwordToggle}
              />
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between ">
          <Link to={'/register'}>
            <div className="font- text-primary">Create New Account?</div>
          </Link>
          <div className="font-style text-danger">Forgot Password?</div>
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            checked={isAgree}
            class="form-check-input"
            id="exampleCheck1"
            onClick={() => setIsAgree(!isAgree)}
          />
          <label class="form-check-label font-style" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Login
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
