import { StructuredContent } from "./types";

// Update the generateStructuredResponse function to handle specific project types
export function generateStructuredResponse(queryType: string): StructuredContent | null {
    // Define individual project templates
    const projectTemplates: Record<string, { title: string; description: string; technologies: string[]; link: string }[]> = {
        skillconnect_project: [
            {
                title: "SkillConnect",
                description:
                    "AI-powered freelancing platform connecting clients and freelancers.",
                technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Clerk", "LangChain", "FAISS"],
                link: "https://github.com/07-Vignesh/SkillConnect",
            },
        ],
       learnifycareers_AI: [
            {
                title: "Learnify Careers AI",
                description:
                    "AI-powered career platform for resume building and mentorship.",
                technologies:["Next.js", "React", "Node.js", "Clerk", "PostgreSQL", "Gemini AI"],
                link: "https://github.com/07-Vignesh/Learnify-Careers-AI",
            },
        ],
       smartBus_tracking_system: [
            {
                title: "Smart Bus Tracking System",
                description:
                    "Developed a smart bus management system that tracks student location in real-time and provides seat availability alerts. Integrated hardware sensors with a web application to monitor bus occupancy and student boarding status.",
                technologies:["React.js", "Node.js", "IoT", "GPS", "Real-time Tracking", "REST API"],
                link: "https://github.com/Ahamedin/Bus-app",
            },
        ],
    };

    // Define individual contact templates
    const contactTemplates: Record<string, { email?: string; phone?: string; location?: string; discord?: string; type: string }> = {
        email_contact: {
            email: "2006vigneshvicky@gmail.com",
            type: "Email",
        },
        phone_contact: {
            phone: "+918925615178",
            type: "Phone",
        },
        location_contact: {
            location: "Karaikudi",
            type: "Location",
        },
       
    };

    // Define individual link templates
    const linkTemplates: Record<string, { title: string; url: string; description: string }[]> = {
       
      
        github_link: [
            {
                title: "GitHub Profile",
                url: "https://github.com/07-Vignesh",
                description:
                    "Check out my code repositories and open-source contributions",
            },
        ],
        linkedin_link: [
            {
                title: "LinkedIn Profile",
                url: "https://www.linkedin.com/in/viknesh-waran/",
                description: "Connect with me professionally on LinkedIn",
            },
        ],

        project_links: [
            {
                title: "SkillConnect",
                url: "https://github.com/07-Vignesh/SkillConnect",
                description: "AI-powered freelancing platform connecting clients and freelancers.",
            },
            {
                title: "Learnify Careers AI",
                url: "https://github.com/07-Vignesh/Learnify-Careers-AI",
                description: "AI-powered career platform for resume building and mentorship.",
            },
            {
                title: "Smart Bus Tracking System",
                url: "https://github.com/Ahamedin/Bus-app",
                description: "Developed a smart bus management system that tracks student location in real-time and provides seat availability alerts. Integrated hardware sensors with a web application to monitor bus occupancy and student boarding status.",
            },
        ],
    };

    // Define the structured data templates for general categories
    const structuredDataTemplates: Record<string, unknown> = {
        skills: [
            { name: "JavaScript", category: "Programming Language" },
            { name: "Java", category: "Programming Language" },
            { name: "React.js", category: "Frontend Framework" },
            { name: "Next.js", category: "Frontend Framework" },
            { name: "TypeScript", category: "Programming Language" },
            { name: "Node.js", category: "Backend" },
            { name: "MySQL", category: "Database" },
            { name: "PostgreSQL", category: "Database" },
            { name: "Docker", category: "DevOps" },
            { name: "Git", category: "Version Control" },
            { name: "MangoDb", category: "Database" },
            { name: "XAMPP", category: "All In One" },
             { name: "Postman", category: "API Testing Tool" },

        ],
        projects: [
            {
                title: "SkillConnect",
                description:
                    "AI-powered freelancing platform connecting clients and freelancers.",
                 technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Clerk", "LangChain", "FAISS"],
                link: "https://github.com/07-Vignesh/SkillConnect",
            },
            {
                title: "Learnify Careers AI",
                description:
                    "AI-powered career platform for resume building and mentorship.",
                technologies:["Next.js", "React", "Node.js", "Clerk", "PostgreSQL", "Gemini AI"],
                link: "https://github.com/07-Vignesh/Learnify-Careers-AI",
            },
            {
                title: "Smart Bus Tracking System",
                description:
                    "Developed a smart bus management system that tracks student location in real-time and provides seat availability alerts. Integrated hardware sensors with a web application to monitor bus occupancy and student boarding status.",
                technologies: ["React.js", "Node.js", "IoT", "GPS", "Real-time Tracking", "REST API"],
                link: "https://github.com/Ahamedin/Bus-app",
            },
        ],
        experience: [
            {
                title: " Software Development Intern",
                company: "SGS IT Park",
                period: "Dec 2025 - Jan 2026",
                description:
                "Completed a one-month internship at South Grapes Solutions .",
            }, 
            {
                title: " Web Development Intern",
                company: "DrobospaceX Automation Pvt. Ltd.",
                period: "May 2025 - June 2025",
                description:
                    " Completed internship training in Web Development at DrobospaceX Automation Pvt. Ltd.",
            },
        ],
        education: [
            {
                title: "B.VOC Software Development",
                institution: "Karaikudi, TamilNadu",
                period: "2023 - 2026",
                description: "Bachelor's degree in Software development",
            },
            {
                title: "12th Grade",
                institution: "S.M.S.V.HR.SEC School, Karaikudi",
                period: "2021 - 2023",
                description: "Higher secondary education",
            },
          
        ],
        contact: {
            email: "2006vigneshvicky@gmail.com",
            phone: "+918925615178",
            location: "Karaikudi",
            linkedin: "https://www.linkedin.com/in/viknesh-waran/",
            github: "https://github.com/07-Vignesh",
           
        },
       
        links: [
            
            {
                title: "GitHub Profile",
                url: "https://github.com/07-Vignesh",
                description: "Check out my code repositories and contributions",
            },
            {
                title: "LinkedIn",
                url: "https://www.linkedin.com/in/viknesh-waran/",
                description: "Connect with me professionally",
            },
            {
                title: "SkillConnect",
                url: "https://github.com/07-Vignesh/SkillConnect",
                description: "AI-powered freelancing platform connecting clients and freelancers.",
            },
            {
                title: "Learnify Careers AI",
                url: "https://github.com/07-Vignesh/Learnify-Careers-AI",
                description: "AI-powered career platform for resume building and mentorship.",
            },
            {
                title: "Smart Bus Tracking System",
                url: "https://github.com/Ahamedin/Bus-app",
                description: "CLI tool for natural language command conversion",
            },
        ],
    };

    // Check if it's a specific project type
    if (queryType.includes("_project")) {
        return {
            type: "projects",
            data: projectTemplates[queryType],
        };
    }

    // Check if it's a specific contact type
    if (queryType.includes("_contact")) {
        return {    
            type: "contact",
            data: contactTemplates[queryType],
        };
    }

    // Check if it's a specific link type
    if (queryType.includes("_link")) {
        return {
            type: "links",
            data: linkTemplates[queryType],
        };
    }

    // Otherwise return the general category data
    if (structuredDataTemplates[queryType]) {
        return {
            type: queryType,
            data: structuredDataTemplates[queryType],
        };
    }

    return null;
}
