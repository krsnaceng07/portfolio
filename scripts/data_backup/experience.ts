export interface ExperienceItem {
    title: string;
    type: string;
    description: string;
    skills: string[];
}

export const experience: ExperienceItem[] = [
    {
        title: "Network Configuration & Simulation",
        type: "Academic Experience",
        description: "Designed and simulated complex network topologies using Cisco Packet Tracer, including VLANs, RIP/OSPF routing, and ACL configurations.",
        skills: ["Cisco Packet Tracer", "Switching", "Routing"],
    },
    {
        title: "Linux System Administration",
        type: "Academic Experience",
        description: "Performed user and group management, permission handling (chmod/chown), and service configuration on Ubuntu/Debian systems.",
        skills: ["Linux CLI", "Bash", "System hardening"],
    },
    {
        title: "Digital Forensics Investigation",
        type: "Academic Experience",
        description: "Practiced evidence acquisition and analysis using FTK Imager and Autopsy in a lab environment. Maintained chain of custody procedures.",
        skills: ["FTK Imager", "Chain of Custody", "Evidence Handling"],
    },
    {
        title: "Network Traffic Analysis",
        type: "Academic Experience",
        description: "Analyzed packet captures using Wireshark to identify HTTP/HTTPS handshakes, ARP spoofing patterns, and suspicious traffic.",
        skills: ["Wireshark", "Packet Analysis"],
    },
];
