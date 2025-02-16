import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get("/api/verify").then((res) => {
      if (res.data.isAuthenticated) setIsAuthenticated(true);
    });
  }, []);

  const handleSubmit = async () => {
    const res = await axios.post("/api/login", { password: input });

    if (res.status === 200) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-80">
      <form className="" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-xl font-semibold">Enter Admin Password</h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-b-2 border-b-blue-200 p-2 w-full bg-inherit placeholder:text-blue-200 outline-none"
          placeholder="Password"
        />
        <button
          onClick={handleSubmit}
          className=" w-full flex items-center justify-center mt-4 py-2 rounded"
        >
          <FaCheck className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}
