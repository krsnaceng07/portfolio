export interface EducationItem {
    degree: string;
    institution: string;
    year: string;
    status: string;
    details: string;
}

export const education: EducationItem[] = [
    {
        degree: "BSc (Hons) Cybersecurity & Digital Forensics",
        institution: "ISMT College (Affiliated with University of Sunderland)",
        year: "2023 – Present",
        status: "Running",
        details: "Focusing on network security, digital forensics, and ethical hacking.",
    },
    {
        degree: "+2 Science",
        institution: "Kantipur Secondary School",
        year: "2021 – 2023",
        status: "Completed",
        details: "Major in Physics and Computer Science.",
    },
];
