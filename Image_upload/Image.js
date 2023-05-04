import React, { useEffect } from 'react';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Mountain from './../bg.jpg';
import Form from './Form';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function Home() {
  let navigate = useNavigate();
  const userToken = localStorage.getItem('token');
  console.log(userToken);
  const checkLogin = () => {
    if (userToken === null) {
      navigate('/');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);
  const data = {
    name: 'Guhan',
    age: 25,
    place: 'chennai',
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.split('/');
    if (fileType[1] === 'png' || fileType[1] === 'jpeg' || fileType === 'jpg') {
      if (file.size < 10485760) {
        console.log(file);
      }
    } else {
      toast.error('File format not supported');
    }
  };
  return (
    <div className="bg-style">
      <Navbar />
      <div className="m-auto w-25">
        <div className="container">
          <div className="row">
            <div className="col">
              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Default file input example
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
