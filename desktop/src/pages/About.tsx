import { Thermometer, Package, Layers } from "lucide-react"

const About = () => {
  return (
    <div className="space-y-8 text-white">
      {/* Intro */}
      <div>
        <h1 className="text-3xl font-bold mb-3 text-[#2782E2]">Om oss</h1>
        <p className="text-lg text-[#D9F2FF]">
          Detta är en demoapp för att visa paketstatus. Här kan du se information
          om bilar, chaufförer och leveranser.
        </p>
      </div>

      {/* Sektion – Skalbar lösning */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-[#2782E2]">
          Skalbar lösning för klimatkontrollerad transport
        </h2>
        <p className="text-[#D9F2FF] mb-6">Tre nivåer av övervakning:</p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Basnivå */}
          <div className="bg-[#D9F2FF] text-[#00072D] rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="text-[#2782E2]" size={28} />
              <h3 className="text-xl font-bold">Basnivå</h3>
            </div>
            <p className="font-semibold mb-2">Fordonsövervakning</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Sensorer monterade direkt i fordonets kyl-/värmeaggregat.</li>
              <li>Ger klimatdata för hela lastutrymmet.</li>
              <li>Lämpligt för stora volymer och kostnadseffektiv logistik.</li>
              <li>
                Exempel: dagligvaror, läkemedelsdistribution i bulk
                (Oriola/Schenker).
              </li>
            </ul>
          </div>

          {/* Mellannivå */}
          <div className="bg-[#2782E2] text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="text-[#D9F2FF]" size={28} />
              <h3 className="text-xl font-bold">Mellannivå</h3>
            </div>
            <p className="font-semibold mb-2">Referenslådor / Selektiv sensor</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enstaka kollin i lasten utrustas med sensorer.</li>
              <li>Ger mer representativ data än bara fordonslogg.</li>
              <li>Passar blandtransporter där vissa produkter kräver extra kontroll.</li>
              <li>Exempel: särskilt känsliga läkemedel eller exklusiva livsmedel.</li>
            </ul>
          </div>

          {/* Avancerad nivå */}
          <div className="bg-[#D01338] text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-2 mb-4">
              <Package className="text-[#D9F2FF]" size={28} />
              <h3 className="text-xl font-bold">Avancerad nivå</h3>
            </div>
            <p className="font-semibold mb-2">Sensor per paket</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Varje kolli får en egen IoT-sensor.</li>
              <li>Realtidsdata på kollinivå: position, temperatur, luftfuktighet.</li>
              <li>Premiumlösning för de mest kritiska transporterna.</li>
              <li>Exempel: vaccin, biologiska prover, organtransporter.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sammanfattning */}
      <div className="bg-[#D9F2FF] text-[#00072D] rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-transform">
        <h3 className="text-xl font-bold mb-2">Sammanfattning</h3>
        <p>
          Med denna modell kan lösningen skalas efter behov:
          <br />– <span className="text-[#2782E2] font-semibold">Billigt och enkelt</span> (nivå 1).
          <br />– <span className="text-[#2782E2] font-semibold">Flexibelt och representativt</span> (nivå 2).
          <br />– <span className="text-[#D01338] font-semibold">High-end precision</span> (nivå 3).
        </p>
      </div>
    </div>
  )
}

export default About
