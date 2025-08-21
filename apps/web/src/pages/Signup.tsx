import {useState} from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async(e:React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });
        const data = await res.json();
        if (res.ok){
            setMessage("Signup successful! Please login.");
        } else{
            setMessage(data.error);
        }
    };

    return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSignup} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Signup
        </button>
      </form>
      {message && <p className="mt-3 text-red-500">{message}</p>}
    </div>
  );

}
