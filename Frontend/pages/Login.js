import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
    const router = useRouter()
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");

    async function submitLoginForm(e) {
        e.preventDefault()
        let email = Email
        let password = Password
        let data = { email, password }
        let result = await fetch("http://localhost:5000/users/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        let output = ""
        output = await result.json()
        if (output.email === Email) {
            let details = JSON.stringify({
                "_id": output._id,
                "email": output.email,
                "name": output.name,
                "profileImage": output.profileImage,
            })
            localStorage.setItem("userDetails", details);
            router.push('/')
        } else {
            alert("Something Went Wrong")
        }
    }

    useEffect(() => {
        let gettingUserDetails = localStorage.getItem("userDetails");
        if (gettingUserDetails === "") {
            router.push('/Login')
        } else {
            router.push('/')
        }
    })

    return (
        <div className="container-sm">
            <h1 className="text-center my-3"><b><u>Login</u></b></h1>
            <form className="px-lg-5 mx-lg-5" onSubmit={(e) => submitLoginForm(e)}>
                <div className="px-md-5 mx-md-5">
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
                <Link href="/Signup">Need an account? SignUp</Link>
            </div>
        </div>
    )
}
