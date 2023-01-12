import { useEffect, useState } from "react";

const TIMEZONE_AUSTRALIA = 11;

function calcTime(offset: number) {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + 3600000 * offset);

  // return time as a string
  return nd.getHours();
}

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

      const hoursAustralia = calcTime(TIMEZONE_AUSTRALIA);

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
      <div className="flex gap-5 items-start flex-col md:flex-row md:items-center">
        <aside>
          {isSleeping ? (
            <img
              className="w-40 h-40 aspect-square rounded-full"
              src="/esteban-durmiendo-playa.png"
              alt="Esteban durmiendo en la playa"
            />
          ) : (
            <img
              className="w-40 h-40 aspect-square rounded-full"
              src="/esteban-despierto-tayrona.png"
              alt="Esteban despierto en el tayrona"
            />
          )}
        </aside>

        <article>
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
        </article>
      </div>
    </main>
  );
}

export default App;
