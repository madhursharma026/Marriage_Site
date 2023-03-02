import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Signup() {
    const router = useRouter()
    const [Password, setPassword] = useState("");
    const [Profile, setProfile] = useState("");
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");


    async function submitSignupForm(e) {
        e.preventDefault()
        let formdata = new FormData();
        formdata.append("name", Name);
        formdata.append("email", Email);
        formdata.append("password", Password);
        formdata.append("profileImage", Profile);
        let result = await fetch("http://localhost:5000/users/signup", {
            method: "POST",
            body: formdata
        })
        let output = ""
        output = await result.json()
        if (output.email === Email) {
            setEmail("")
            setName("")
            setProfile("")
            setPassword("")
            router.push('/Login')
        } else {
            alert(output.message)
        }
    }

    useEffect(() => {
        let gettingUserDetails = localStorage.getItem("userDetails");
        if (gettingUserDetails === "") {
            router.push('/Signup')
        } else {
            router.push('/')
        }
    })

    return (
        <div className="container-sm">
            <h1 className="text-center my-3"><b><u>Signup</u></b></h1>
            <form className="px-lg-5 mx-lg-5" onSubmit={(e) => submitSignupForm(e)}>
                <div className="px-md-5 mx-md-5">
                    <div class="mb-3">
                        <label for="exampleInputName" class="form-label">Name</label>
                        <input type="text" class="form-control" id="exampleInputName" value={Name} onChange={(e) => setName(e.target.value)} required autoComplete='off' />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputProfile" class="form-label">Profile Image</label>
                        <input type="file" class="form-control" id="exampleInputProfile" required onChange={(e) => setProfile(e.target.files[0])} accept="image/png, image/gif, image/jpeg" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" value={Email} onChange={(e) => setEmail(e.target.value)} required autoComplete='off' />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" value={Password} onChange={(e) => setPassword(e.target.value)} required autoComplete='off' />
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Submit</button></div>
            </form>
            <div className="text-center mt-3">
                <Link href="/Login">Have an account? Login</Link>
            </div>
        </div>
    )
}
