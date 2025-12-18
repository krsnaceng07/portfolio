import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { profile } from './data_backup/profile';
import { skills } from './data_backup/skills';
import { experience } from './data_backup/experience';
import { education } from './data_backup/education';
import { projects } from './data_backup/projects';
import { workshops } from './data_backup/workshops';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    console.log('Starting seed process...');

    // 0. Clear existing data to prevent duplicates (Reverse order of dependencies if any, though here they are independent)
    console.log('🧹 Clearing existing data...');
    await supabase.from('profile').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('experience').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('education').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('workshops').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log('✨ Data cleared.');

    // 1. Profile
    // Note: profile table usually has only one row.
    const { error: profileError } = await supabase.from('profile').insert({
        name: profile.name,
        role: profile.role,
        tagline: profile.tagline,
        description: profile.description,
        email: profile.contact.email,
        phone: profile.contact.phone,
        location: profile.contact.location,
        status: profile.availability.status,
    });
    if (profileError) console.error('Profile Seed Error:', profileError);
    else console.log('✅ Profile seeded');

    // 2. Skills
    const { error: skillsError } = await supabase.from('skills').insert(skills);
    if (skillsError) console.error('Skills Seed Error:', skillsError);
    else console.log('✅ Skills seeded');

    // 3. Experience
    const experienceData = experience.map(exp => ({
        title: exp.title,
        type: exp.type,
        description: exp.description,
        skills: exp.skills,
    }));
    const { error: expError } = await supabase.from('experience').insert(experienceData);
    if (expError) console.error('Experience Seed Error:', expError);
    else console.log('✅ Experience seeded');

    // 4. Education
    const { error: eduError } = await supabase.from('education').insert(education);
    if (eduError) console.error('Education Seed Error:', eduError);
    else console.log('✅ Education seeded');

    // 5. Projects
    const { error: projError } = await supabase.from('projects').insert(projects);
    if (projError) console.error('Projects Seed Error:', projError);
    else console.log('✅ Projects seeded');

    // 6. Workshops
    const { error: workError } = await supabase.from('workshops').insert(workshops);
    if (workError) console.error('Workshops Seed Error:', workError);
    else console.log('✅ Workshops seeded');

    console.log('🎉 Seed process finished.');
}

seed();
