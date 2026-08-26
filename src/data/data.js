import { Award, Briefcase, Globe, GraduationCap, Languages, School, Users, Video, Trophy, Clock3, ShieldCheck, HeartHandshake, BookOpenCheck, Mic2 } from 'lucide-react';

export const heroSlides = [
    {
        img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=886&auto=format&fit=crop",
        headline: "Where Ambition",
        highlight: "Earns Its Rank",
        sub: "Structured coaching for NTSE, JEE, NEET, Olympiads and 50+ competitive exams — built on weekly mock tests, honest scorecards and mentors who've cleared the exam themselves."
    },
    {
        img: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=870&auto=format&fit=crop",
        headline: "Expert Faculty,",
        highlight: "Proven Results",
        sub: "200+ verified faculty members. 98% success rate. A decade of transforming student careers across 15+ countries."
    },
    {
        img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60",
        headline: "Learn Anywhere,",
        highlight: "Excel Everywhere",
        sub: "Hybrid by design — attend live, join online, or replay recordings. Your education, your schedule."
    },
];


export const services = [
    { icon: <School />, title: 'Schools & Kindergarten', desc: 'Verified profiles, admission timelines, fee structures and honest parent reviews for K-12 schools.', tab: 'schooleducation', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop', accent: '#804501' },
    { icon: <School />, title: 'Primary & Secondary Schools', desc: 'Discover top-rated K-12 schools with verified profiles, admission schedules, academic programmes.', tab: 'schooleducation', img: 'https://plus.unsplash.com/premium_photo-1690479510844-6385aa431b76?w=600&auto=format&fit=crop&q=60', accent: '#F0B429' },
    { icon: <GraduationCap />, title: 'Grades 1–12 Coaching', desc: 'Foundation to board-exam coaching with stream selection support for Science, Commerce and Arts.', tab: 'schooleducation', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop', accent: '#0B1E3D' },
    { icon: <Briefcase />, title: 'CA / CS / CMA / ACCA', desc: 'Structured coaching for finance and accountancy certifications, taught by practicing professionals.', tab: 'professionalcertifications', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop', accent: '#804501' },
    { icon: <BookOpenCheck />, title: 'Medical Entrance (NEET)', desc: 'NEET UG/PG batches with weekly full-length tests benchmarked against national percentile data.', tab: 'medicalcourses', img: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=250&fit=crop', accent: '#F0B429' },
    { icon: <Languages />, title: 'Spoken English & IELTS', desc: 'English proficiency and test-prep training built for students heading overseas.', tab: 'languagecourses', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=250&fit=crop', accent: '#0B1E3D' },
    { icon: <Globe />, title: 'Foreign Languages', desc: 'German, French and Japanese instruction, from conversational to postgraduate proficiency.', tab: 'languagecourses', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop', accent: '#804501' },
    { icon: <Video />, title: 'Online Hourly Classes', desc: 'Pay-per-hour tutoring with flexible scheduling — book a single doubt-clearing session or a full term.', tab: 'placementsupport', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop', accent: '#F0B429' },
    { icon: <HeartHandshake />, title: 'Overseas Education Counselling', desc: 'End-to-end guidance on university shortlisting, visa documentation and scholarship applications.', tab: 'overseaseducation', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop', accent: '#0B1E3D' },
];

export const whyUs = [
    { icon: <Users />, title: "Faculty Who've Been There", desc: "Every mentor has cleared the exam they teach, or trained rank holders who have.", color: 'from-[#804501] to-[#F0B429]' },
    { icon: <Clock3 />, title: 'Weekly Mock Tests', desc: 'Full-length, negatively-marked mocks with All-India percentile comparison, every single week.', color: 'from-[#0B1E3D] to-[#1a3a6e]' },
    { icon: <Video />, title: 'Hybrid by Design', desc: 'Attend live in a classroom, join online, or replay a recorded session — your call, every day.', color: 'from-[#F0B429] to-[#804501]' },
    { icon: <ShieldCheck />, title: 'Transparent Progress Reports', desc: "Parents get a real scorecard after every test, not a vague 'doing well' update.", color: 'from-[#1a3a6e] to-[#804501]' },
    { icon: <HeartHandshake />, title: 'Admission & Placement Desk', desc: 'From counselling on college choices to interview prep, we stay involved past the result day.', color: 'from-[#804501] to-[#0B1E3D]' },
    { icon: <Mic2 />, title: 'Doubt-Solving on Demand', desc: 'A dedicated helpdesk that answers subject doubts within the same day, not the same week.', color: 'from-[#F0B429] to-[#0B1E3D]' },
];

export const rankers = [
    { name: 'Priya Sharma', exam: 'JEE Advanced 2025', tag: 'AIR 412', score: '98.9 %ile', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
    { name: 'Rahul Verma', exam: 'NEET UG 2025', tag: 'AIR 876', score: '99.1 %ile', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { name: 'Ananya Reddy', exam: 'CA Foundation', tag: 'AIR 9', score: 'All India', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
    { name: 'Aditya Kulkarni', exam: 'NTSE Stage II', tag: 'State Topper', score: '100% Score', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
];

export const testimonials = [
    { name: 'Priya Sharma', course: 'JEE Advanced 2025', text: 'The coaching was exceptional. I improved from 60% to 95% in six months of structured mock tests. The faculty\'s dedication is unmatched.', rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', achievement: 'AIR 412' },
    { name: 'Rahul Verma', course: 'NEET UG', text: 'I got a rank under 1000 in NEET. The faculty and mock-test analysis were genuinely world-class. Every session pushed me to my limits.', rating: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', achievement: 'AIR 876' },
    { name: 'Ananya Reddy', course: 'CA Foundation', text: 'Cleared CA Foundation on the first attempt — the study material and weekend doubt sessions made all the difference. Truly premium education.', rating: 5, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', achievement: 'All India Rank 9' },
    { name: 'Fatima Sheikh', course: 'IELTS & Overseas Counselling', text: 'From IELTS prep to my visa file, the counselling desk stayed with me till my offer letter arrived. Simply outstanding!', rating: 5, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face', achievement: 'IELTS 8.5 Band' },
];

export const faqs = [
    { question: 'What exams do you coach for?', answer: 'We cover 50+ exams including NTSE, JEE, NEET, Olympiads, CA, CS, CMA, NDA and CLAT. Check the Services section above for the full list, or ask our counsellors for anything not listed.' },
    { question: 'Do you offer online classes?', answer: 'Yes — every batch runs in a hybrid format. You can attend live in person, join the same class online, or catch up later with a recorded session.' },
    { question: 'How do I enroll in a course?', answer: 'Fill in the enquiry form below with your exam of interest. A counsellor calls you within 24 hours to plan your batch, schedule and fee structure.' },
    { question: 'What is the success rate of your students?', answer: 'Across our exam categories, students report a 98% success rate, with a meaningful share ranking in the national top 1000 each year.' },
    { question: 'Do you provide study materials and mock tests?', answer: 'Yes — comprehensive study material, weekly full-length mock tests with All-India percentile ranking, and previous years\' question papers are included in every course.' },
    { question: 'Can I switch batches or exams after enrolling?', answer: 'Yes, within the first two weeks of a term you can switch batch timing or, in consultation with a counsellor, move between related exam tracks at no extra cost.' },
    { question: 'Do you help with admissions after the results?', answer: 'Our admission desk assists with college shortlisting, document verification and interview preparation once your results are out — this is included, not a separate service.' },
];

export const serviceTabs = [
    { key: 'schooleducation', label: 'School Education', icon: <School className="w-4 h-4" /> },
    { key: 'medicalcourses', label: 'Medical', icon: <BookOpenCheck className="w-4 h-4" /> },
    { key: 'professionalcertifications', label: 'Professional', icon: <Award className="w-4 h-4" /> },
    { key: 'overseaseducation', label: 'Overseas', icon: <Globe className="w-4 h-4" /> },
    { key: 'languagecourses', label: 'Languages', icon: <Languages className="w-4 h-4" /> },
    { key: 'placementsupport', label: 'Placement', icon: <Briefcase className="w-4 h-4" /> },
];

export const stats = [
    { icon: <Users className="w-5 h-5" />, label: 'Students Mentored', value: 50000, suffix: '+' },
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Expert Faculty', value: 200, suffix: '+' },
    { icon: <Trophy className="w-5 h-5" />, label: 'Success Rate', value: 98, suffix: '%' },
    { icon: <Globe className="w-5 h-5" />, label: 'Countries Reached', value: 15, suffix: '+' },
];

export const examTicker = ['NTSE', 'NSO', 'IMO', 'NSE', 'NSTSE', 'IEO', 'NCO', 'GK10', 'POLYCET', 'NDA', 'OLYMPIADS', 'ITI', 'AISSEE', 'JEE', 'NEET', 'KVPY', 'INO', 'SAT', 'ASSET', 'JNUST', 'NBO', 'IAS/KAS', 'IMOTC', 'IOITC', 'IPMAT', 'GMAT', 'GRE', 'AIMS', 'JIPMER', 'FMGE', 'SLAT', 'CA', 'CS', 'BBA', 'MBA', 'CLAT', 'NLSAT'];

export const courses = [
    'JEE Main / Advanced', 'NEET UG / PG', 'NTSE', 'Olympiads',
    'CA Foundation', 'CS Executive', 'CMA', 'ACCA',
    'Spoken English', 'IELTS / TOEFL', 'German Language',
    'French Language', 'NDA', 'CLAT', 'MBA Entrance'
];