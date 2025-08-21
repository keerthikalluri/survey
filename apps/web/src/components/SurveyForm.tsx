import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SurveyForm() {
    const [form, setForm] = useState({name:"", age: 0, favoriteColor:""});
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "age" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:4000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            if(res.ok) {
                navigate("/review");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to submit survey");
            }
        } catch (err) {
            setError("Network error, please try again");
        }
    };

    return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-2 text-blue-600">Waterlily Survey</h1>
      <p className="mb-6 text-gray-600">
        Please answer the questions below to complete the survey.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-medium">Favorite Color</label>
          <select
            name="favoriteColor"
            value={form.favoriteColor}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-lg"
          >
            <option value="">Select a color</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );


}