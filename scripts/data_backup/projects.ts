export interface ProjectItem {
    title: string;
    type: string;
    description: string;
    tools: string[];
    outcome: string;
    link: string;
}

export const projects: ProjectItem[] = [
    {
        title: "Network Traffic Analysis",
        type: "Case Study",
        description: "Analyzed malicious traffic patterns using Wireshark to identify potential security breaches.",
        tools: ["Wireshark", "TCPDump"],
        outcome: "Identified 3 distinct attack vectors in sample data.",
        link: "#",
    },
    {
        title: "Linux Security Hardening",
        type: "Guide / Script",
        description: "Created a checklist and basic bash script to secure a fresh Ubuntu server installation.",
        tools: ["Bash", "Linux"],
        outcome: "Automated 12 key security checks.",
        link: "#",
    },
];
