import { useEffect, useState } from "react";

function App() {
  const [isSleeping, setIsSleeping] = useState(false);
  const [timeAustralia, setTimeAustralia] = useState(
    new Date().toLocaleString("es-CO", { timeZone: "Australia/Sydney" })
  );
  const [timeColombia, setTimeColombia] = useState(
    new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const nowAustralia = now.toLocaleString("es-CO", {
        timeZone: "Australia/Sydney",
      });
      setTimeAustralia(nowAustralia);

      const nowColombia = now.toLocaleString("es-CO", {
        timeZone: "America/Bogota",
      });

      setTimeColombia(nowColombia);

      const australiaTime = new Date().toLocaleString("en-AU", {
        timeZone: "Australia/Sydney",
      });

      const hoursAustralia = new Date(australiaTime).getHours();

      const isSleeping = hoursAustralia < 7 || hoursAustralia > 22;
      setIsSleeping(isSleeping);

      document.title = isSleeping ? "Durmiendo" : "Despierto";
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="grid place-content-center min-h-screen bg-slate-800 text-white px-6">
      <h1 className="text-3xl font-bold">
        Hola, Esteban está
        {isSleeping ? (
          <span className="text-red-500"> durmiendo.</span>
        ) : (
          <span className="text-green-500"> despierto.</span>
        )}
      </h1>
      <br />
      <span className="text-gray-200 font-semibold text-sm flex gap-3 items-center">
        <picture className="inline-block mr-2 w-9 h-9 aspect-square">
          <source srcSet="/flag-australia.png" type="image/png" />
          <img src="/flag-australia.png" alt="Australia" />
        </picture>
        {timeAustralia}
      </span>
      <span className="text-gray-200 font-semibold text-sm flex gap-3 items-center">
        <picture className="inline-block mr-2 w-9 h-9 aspect-square">
          <source srcSet="/flag-colombia.png" type="image/png" />
          <img src="/flag-colombia.png" alt="Australia" />
        </picture>
        {timeColombia}
      </span>
    </main>
  );
}

export default App;
