import React, {useEffect, useState} from "react";

type SurveyResponse = {
    id: number;
    name: string;
    age: number;
    favoriteColor: string;
};

export default function ReviewPage() {
    const [responses, setResponses] = useState<SurveyResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResponses = async () => {
            try{
                const token  = localStorage.getItem("token");
                if(!token){
                    setError("You must be logged in to view your responses.");
                    setLoading(false);
                    return;
                }

                const res = await fetch("http://localhost:4000/review", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch responses");
                }

                const data = await res.json();
                setResponses(data);
            } catch (err: any) {
                setError(err.message || "An error occurred"); 
            } finally{
                setLoading(false);
            }
        };

        fetchResponses();
    }, []);

    if (loading){
        return <p className="text-center text-gray-500">LOading responses...</p>;
    }

    if (error){
        return <p className="text-center text-red-500">{error}</p>
    }

    return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Your Survey Responses</h2>

      {responses.length === 0 ? (
        <p className="text-gray-500">No responses yet.</p>
      ) : (
        <ul className="space-y-4">
          {responses.map((r) => (
            <li key={r.id} className="p-4 border rounded-lg">
              <p><strong>Name:</strong> {r.name}</p>
              <p><strong>Age:</strong> {r.age}</p>
              <p><strong>Favorite Color:</strong> {r.favoriteColor}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}