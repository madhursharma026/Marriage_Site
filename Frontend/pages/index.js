import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter()
  const [allProfiles, setAllProfiles] = useState([]);

  useEffect(() => {
    let gettingUserDetails = localStorage.getItem("userDetails");
    if (gettingUserDetails === "") {
      router.push('/Login')
    } else {
      router.push('/')
    }
  })

  useEffect(() => {
    fetch(`http://localhost:5000/users/`)
      .then(response => response.json())
      .then(response => {
        setAllProfiles(response);
      })
      .catch(err => console.error(err));
  }, [])

  function logoutUser() {
    localStorage.setItem("userDetails", "");
    router.push('/Login')
  }

  return (
    <>
      <nav class="navbar bg-dark" data-bs-theme="dark">
        <div class="container-lg">
          <a class="navbar-brand">Navbar</a>
          <div class="d-flex">
            <button class="btn btn-primary" type="button" onClick={() => logoutUser()}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="container-lg">
        <h1 className="text-center my-3"><b><u>User Profile</u></b></h1>
        <div className="row mt-5">


          {(allProfiles.length === 0) ?
            <h2 className="text-center">Not Data Found</h2>
            :
            <>
              {
                allProfiles.map((allProfiles) =>
                  <div className="col-lg-4 col-md-6 mt-3">
                    <div class="card">
                      <img src={allProfiles.profileImage} class="card-img-top img-fluid" alt="#ImgNotFound" style={{ minHeight: '250px', height: '100%' }} />
                      <div class="card-body">
                        <h5 class="card-text">Name: {allProfiles.name}</h5>
                        <h6 class="card-text">Email: {allProfiles.email}</h6>
                      </div>
                    </div>
                  </div>
                )
              }
            </>
          }
        </div>
      </div>
    </>
  )
}
