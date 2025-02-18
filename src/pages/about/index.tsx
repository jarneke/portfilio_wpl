import MenuItem from "@/components/MenuItem";
import StickyHeader from "@/components/stickyheader";
import Link from "next/link";
import Container from "@/components/Container";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
      <StickyHeader />
      <Container bgColor="bg-neutral-800" className="flex gap-7">
        <Container nopadding>
          <img
            src="https://avatars.githubusercontent.com/u/97990733?v=4"
            alt="GitHub profile picture"
            className="rounded-3xl h-100"
          />
        </Container>
        <Container nopadding>
          <h1>Jarne Eldrup</h1>
          <p>
            02/09/2004 ={`>`} {calculateAge(new Date(2004, 8, 2))} years old
          </p>

          <div className="flex flex-nowrap">
            <p className="text-nowrap">Studying Programming @</p>
            <Link
              href="www.ap.be"
              target="_blank"
              className="underline text-nowrap"
            >
              AP-Antwerpen
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="https://linkedin.com/in/jouwprofiel"
              target="_blank"
              className="underline"
            >
              <FaLinkedin className="inline-block mr-2" />
              <span>LinkedIn</span>
            </Link>
            <Link href="" target="_blank" className="underline">
              <FaGithub className="inline-block mr-2" />
              <span>GitHub</span>
            </Link>
          </div>
        </Container>
      </Container>
      <div className="flex flex-col xl:flex-row">
        <Container className="flex flex-col gap-7">
          <h1>About Me</h1>
          <p>
            I am a dedicated programmer, always eager to enhance my skills and
            embrace new challenges. Currently, I am pursuing a programming
            degree at AP-Antwerpen, where I am deepening my expertise in
            software development.
          </p>
        </Container>
        <Container className="flex flex-col gap-7">
          <h1>Internship</h1>
          <p>
            I am interning at 2commit, an IT company based in Edegem, Belgium.
            As part of the Cronos Group, 2commit specializes in Microsoft .NET
            consultancy, focusing on innovative and digital automation
            projects.In my role, I am engaged in Power Platform app development,
            utilizing Microsoft's low-code platform to create custom business
            applications that streamline processes and enhance efficiency.This
            experience allows me to apply my academic knowledge to real-world
            projects and grow as a developer.
          </p>
        </Container>
      </div>
    </>
  );
}
