import MenuItem from "@/components/MenuItem";
import StickyHeader from "@/components/stickyheader";
import Link from "next/link";
import Container from "@/components/Container";
import { FaEnvelope, FaFilePdf, FaGithub, FaLinkedin } from "react-icons/fa";

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
    <div className="">
      <StickyHeader />
      <Container className="flex flex-col md:flex-row justify-center gap-7">
        <div>
          <img
            src="https://avatars.githubusercontent.com/u/97990733?v=4"
            alt="GitHub profile picture"
            className="rounded-3xl h-100"
          />
        </div>
        <Container nopadding bgColor="w-2/3 ps-0 lg:ps-20 md:w-1/2">
          <h1>Jarne Eldrup</h1>
          <p>
            02/09/2004 ={`>`} {calculateAge(new Date(2004, 8, 2))} years old
          </p>
          <p>
            {"Studying Programming @ "}
            <Link
              href="https://www.ap.be"
              target="_blank"
              className="underline text-nowrap"
            >
              AP-Antwerpen
            </Link>
          </p>
          <div className="flex flex-col justify-center gap-4">
            <Link
              href="https://www.linkedin.com/in/jarne-eldrup"
              target="_blank"
              className="underline flex flex-nowrap"
            >
              <FaLinkedin className="mr-2" />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/jarneke"
              target="_blank"
              className="underline flex flex-nowrap"
            >
              <FaGithub className="mr-2" />
              <span>GitHub</span>
            </Link>
            <div className="flex">
              <Link
                href="mailto:jarne.eldrup@outlook.com"
                target="_blank"
                className="underline flex flex-nowrap"
              >
                <FaEnvelope className="mr-2" />
                <span>Email</span>
              </Link>
            </div>
            <Link
              href="CV_Jarne_Eldrup.pdf"
              target="_blank"
              className="underline flex flex-nowrap"
            >
              <FaFilePdf className="mr-2" />
              <span>Curriculum Vitae</span>
            </Link>
          </div>
        </Container>
      </Container>
      <div className="flex flex-col xl:flex-row">
        <Container className="flex flex-col gap-7" bgColor="bg-neutral-800">
          <h1>About Me</h1>
          <p className="m-0">
            I am a dedicated programmer, always eager to enhance my skills and
            embrace new challenges. Currently, I am pursuing a programming
            degree at AP-Antwerpen, where I am deepening my expertise in
            software development.
          </p>
        </Container>
        <Container className="flex flex-col gap-7">
          <h1>Internship</h1>
          <p className="m-0">
            I am interning at{" "}
            <Link href="https://2commit.be" target="_blank">
              2commit
            </Link>
            , an IT company based in Kontich, Belgium. As part of the Cronos
            Group, 2commit specializes in Microsoft .NET consultancy, focusing
            on innovative and digital automation projects.In my role, I am
            engaged in Power Platform app development, utilizing Microsoft's
            low-code platform to create custom business applications that
            streamline processes and enhance efficiency.This experience allows
            me to apply my academic knowledge to real-world projects and grow as
            a developer.
          </p>
        </Container>
      </div>
    </div>
  );
}
