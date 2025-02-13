import Link from "next/link";

interface AboutProps {}

function calculateAge(birthday: string | Date): number {
  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

export default function About({}: AboutProps) {
  return (
    <>
      <div className="flex justify-between">
        <img
          src="https://avatars.githubusercontent.com/u/97990733?v=4"
          alt="GitHub profile picture"
          className="rounded-3xl w-48 h-48"
        />
        <div>
          <h1>Jarne Eldrup</h1>
          <p>
            02/09/2004 ={`>`} {calculateAge(new Date(2004, 8, 2))} years old
          </p>

          <p>
            Studying Programming{" "}
            <Link href="www.ap.be" target="_blank" className="underline">
              @AP-Antwerpen
            </Link>
          </p>
          <div>
            <Link
              href="https://linkedin.com/in/jouwprofiel"
              target="_blank"
              className="underline"
            >
              <span>LinkedIn</span>
            </Link>
            <Link href="" target="_blank" className="underline">
              <span>GitHub</span>
            </Link>
          </div>
          <p>beschrijving</p>
        </div>
      </div>
    </>
  );
  return (
    <div className="">
      <img
        src="https://avatars.githubusercontent.com/u/57600067?v=4"
        alt="Jarne"
        className=""
      />
      <h1 className="">Jarne (Nickname)</h1>
      <p className="">Aankomend topprogrammeur</p>
      <div className="">
        <Link href="https://linkedin.com/in/jouwprofiel" target="_blank">
          <span className="">LinkedIn</span>
        </Link>
        <Link href="https://github.com/jouwgithub" target="_blank">
          <span className="">GitHub</span>
        </Link>
      </div>

      <div className="">
        <h2 className="">Stage-informatie</h2>
        <p className="">
          Momenteel loop ik stage bij 2commit, gevestigd in Kontich. Mijn rol is
          stagiair, waarbij ik werk met PowerPlatform aan diverse
          applicatieontwikkelingsprojecten. Dit helpt mij om mijn vaardigheden
          in low-code ontwikkeling, automatisering en integraties verder te
          ontwikkelen.
        </p>
      </div>
    </div>
  );
}
