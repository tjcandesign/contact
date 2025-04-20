"use client";
import { useState } from "react";

const agents = [
  { id: "agentA", name: "Agent A", photo: "/agentA.jpg" },
  { id: "agentB", name: "Agent B", photo: "/agentB.jpg" },
  // Add more agents as needed
];

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value,
      interest: (form.elements.namedItem("interest") as RadioNodeList)?.value || ""
    };
    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err: any) {
      setError("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(/background.svg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 }} />
        <div className="relative w-full max-w-md flex flex-col items-center z-10">
          <img src="/logo.svg" alt="SYS Logo" className="mb-6 mt-2 w-full" style={{ maxWidth: '100%' }} />
        </div>
        <h2 className="relative text-2xl font-bold mb-2 z-10">Thank you!</h2>
        <p className="relative z-10">We’ve received your info.</p>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(/background.svg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 }} />
      <form className="relative w-full max-w-md bg-white p-6 rounded shadow z-10" onSubmit={handleSubmit}>
        <img src="/logo.svg" alt="SYS Logo" className="mb-6 mt-2 w-full" style={{ maxWidth: '100%' }} />
        <label className="block mb-2 font-semibold">Name
          <input name="name" className="w-full border p-2 rounded mt-1" />
        </label>
        <label className="block mb-2 font-semibold">Email
          <input type="email" name="email" className="w-full border p-2 rounded mt-1" />
        </label>
        <label className="block mb-2 font-semibold">Phone
          <input name="phone" className="w-full border p-2 rounded mt-1" />
        </label>

        <div className="my-4">
          <div className="font-semibold mb-1">What are you looking for?</div>
          <div className="flex flex-col gap-2">
            <label className="inline-flex items-center">
              <input type="radio" name="interest" value="Request Service" className="mr-2" />
              Request Service
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="interest" value="Request Quote" className="mr-2" />
              Request Quote
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="interest" value="Schedule Consultation" className="mr-2" />
              Schedule Consultation
            </label>

          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold mt-4 hover:bg-blue-700" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </main>
  );
}

