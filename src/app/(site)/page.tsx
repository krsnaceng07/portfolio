import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { Experience } from '@/components/sections/Experience';
import { Workshops } from '@/components/sections/Workshops';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { getItems, getProfile } from '@/actions/cms';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function Home() {
  const [
    profile,
    skills,
    experience,
    education,
    projects,
    workshops
  ] = await Promise.all([
    getProfile(),
    getItems('skills'),
    getItems('experience'),
    getItems('education'),
    getItems('projects'),
    getItems('workshops')
  ]);

  return (
    <div className="flex flex-col gap-0">
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Education education={education} />
      <Experience experience={experience} />
      <Workshops workshops={workshops} />
      <Projects projects={projects} />
      <Contact email={profile?.email} phone={profile?.phone} location={profile?.location} />
    </div>
  );
}
