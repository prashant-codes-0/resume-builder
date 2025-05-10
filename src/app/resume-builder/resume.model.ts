export interface Resume {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experience: {
        title: string;
        company: string;
        duration: string;
        description: string;
    }[];
    education: {
        degree: string;
        institution: string;
        year: string;
    }[];
    skills: { name: string }[];
}