export interface SkillCategory {
    category: string;
    items: string[];
}

export const skills: SkillCategory[] = [
    {
        category: "Cybersecurity & Digital Forensics",
        items: ["Digital Evidence Handling", "Packet Analysis", "Security Hardening", "Incident Response Basics"],
    },
    {
        category: "Networking",
        items: ["TCP/IP & OSI Model", "Subnetting", "Routing & Switching", "Cisco Packet Tracer"],
    },
    {
        category: "Operating Systems",
        items: ["Linux (Kali, Ubuntu)", "Windows Server", "Active Directory Basics", "File System Hierarchy"],
    },
    {
        category: "Tools",
        items: ["Wireshark", "Nmap", "FTK Imager", "Burp Suite (Basic)", "Metasploit (Basic)"],
    },
    {
        category: "Programming & Scripting",
        items: ["Python (Automation/Security)", "Bash Scripting", "SQL (Basic)", "HTML/CSS"],
    },
];
