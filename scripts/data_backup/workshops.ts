export interface WorkshopItem {
    title: string;
    organizer: string;
    date?: string;
    year?: string;
    duration?: string;
    description: string;
}

export const workshops: WorkshopItem[] = [
    {
        title: "Cybersecurity Awareness Workshop",
        organizer: "Local Tech Community",
        date: "2024",
        description: "Participated in sessions covering phishing awareness, password security, and social engineering.",
    },
    {
        title: "Computer Hardware & Networking Diploma",
        organizer: "Institute of Technology",
        duration: "6 Months",
        year: "2023",
        description: "Comprehensive training on PC assembly, troubleshooting, cabling, and basic network setup.",
    },
];
