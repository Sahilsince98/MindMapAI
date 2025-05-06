"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
    Award,
    BookOpen,
    Brain,
    Calendar,
    Clock,
    Download,
    ExternalLink,
    Heart,
    Lightbulb,
    Linkedin,
    Loader2,
    MessageSquare,
    Mic,
    PuzzleIcon as PuzzlePiece,
    Share2,
    ThumbsUp,
    Users,
} from "lucide-react"
import { Radar } from "recharts"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Certificate from "./Certificate"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export const Report = ({ data, timeSpent }) => {
    const [testSummary, setTestSummary] = useState({});
    const [categoryBreakdown, setCategoryBreakdown] = useState({});
    const [userStrengths, setUserStrengths] = useState({});
    const [userWeaknesses, setUserWeaknesses] = useState({});
    const [personalizedRecommendation, setPersonalizedRecommendation] = useState({});
    const [engagementInsights, setEngagementInsights] = useState({});
    const [score, setScore] = useState(0)
    const [communicationProgress, setCommunicationProgress] = useState(0)
    const [emotionalProgress, setEmotionalProgress] = useState(0)
    const [problemProgress, setProblemProgress] = useState(0)
    const [teamworkProgress, setTeamworkProgress] = useState(0)
    const [timeProgress, setTimeProgress] = useState(0)
    const [date, setDate] = useState()
    const [isDownloading, setIsDownloading] = useState(false);
    const certificateRef = useRef(null);
    const [name, setName] = useState<string>("");
    const [showModal, setShowModal] = useState(true);

    const handleSubmit = () => {
        if (name.trim()) {
            setShowModal(false);
        }
    };
    //formatTime
    const formatTime = (seconds: number): string => {
        if (seconds < 60) {
            return `${seconds} sec`; // If less than 60 sec, show in seconds
        } else {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes} min ${remainingSeconds} sec`;
        }
    }
    const getPerformanceLevel = (score) => {
        if (score < 60) return { label: "Needs Improvement", color: "#ec4899" }
        if (score < 75) return { label: "Good", color: "#a855f7" }
        if (score < 90) return { label: "Excellent", color: "#4f46e5" }
        return { label: "Expert", color: "#2563eb" }
    }
    const skillsData = [
        {
            name: "Communication",
            score: 92,
            average: 75,
            icon: <Mic className="h-5 w-5" />,
            strengths: ["Clear and concise verbal communication", "Active listening skills"],
            improvements: ["Practice public speaking", "Work on non-verbal cues"],
        },
        {
            name: "Emotional Intelligence",
            score: 85,
            average: 70,
            icon: <Brain className="h-5 w-5" />,
            strengths: ["Self-awareness", "Empathy towards colleagues"],
            improvements: ["Develop stress management techniques", "Practice emotional regulation"],
        },
        {
            name: "Problem-Solving",
            score: 78,
            average: 72,
            icon: <Lightbulb className="h-5 w-5" />,
            strengths: ["Analytical thinking", "Creative solution generation"],
            improvements: ["Improve decision-making speed", "Enhance critical thinking"],
        },
        {
            name: "Teamwork",
            score: 90,
            average: 78,
            icon: <PuzzlePiece className="h-5 w-5" />,
            strengths: ["Collaborative mindset", "Conflict resolution"],
            improvements: ["Develop leadership skills", "Improve delegation abilities"],
        },
        {
            name: "Time Management",
            score: 70,
            average: 68,
            icon: <Clock className="h-5 w-5" />,
            strengths: ["Meeting deadlines", "Task prioritization"],
            improvements: ["Reduce procrastination", "Improve planning techniques"],
        },
    ]
    const radarData = [
        { subject: "Communication", A: 92, B: 75, fullMark: 100 },
        { subject: "Emotional Intelligence", A: 85, B: 70, fullMark: 100 },
        { subject: "Problem-Solving", A: 78, B: 72, fullMark: 100 },
        { subject: "Teamwork", A: 90, B: 78, fullMark: 100 },
        { subject: "Time Management", A: 70, B: 68, fullMark: 100 },
    ]
    //downloadPDF
    const downloadPDF = async () => {
        setIsDownloading(true); // Start loader
        const element = certificateRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);

        pdf.save("Certificate(MindMap AI).pdf");
        setIsDownloading(false); // Stop loader after download
    };
    //function lock
    useEffect(() => {
        if (data) {
            setTestSummary(data["Test Summary"] ?? {});
            setCategoryBreakdown(data["Category-wise Breakdown"] ?? {});
            setUserStrengths(data["User  Strengths"] ?? {});
            setUserWeaknesses(data["User  Weaknesses & Improvement Plan"] ?? {});
            setPersonalizedRecommendation(data["Personalized Recommendation"] ?? {});
            setEngagementInsights(data["Engagement-Based Insights"] ?? {});
        }
    }, [data]);
    useEffect(() => {
        const currentDate = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = currentDate.toLocaleDateString("en-US", options);
        setDate(formattedDate);
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => setScore(87), 500)
        const timer1 = setTimeout(() => setCommunicationProgress(92), 600)
        const timer2 = setTimeout(() => setEmotionalProgress(85), 800)
        const timer3 = setTimeout(() => setProblemProgress(78), 1000)
        const timer4 = setTimeout(() => setTeamworkProgress(90), 1200)
        const timer5 = setTimeout(() => setTimeProgress(70), 1400)

        return () => {
            clearTimeout(timer)
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
            clearTimeout(timer4)
            clearTimeout(timer5)
        }
    }, [])
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center  justify-center  z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Enter Your Name</h2>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button
                            className="w-full bg-gradient-to-r from-[#3b82f6] to-[#9333ea] text-white p-2 rounded"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
            <div className={`min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#eef2ff] p-4 md:p-8 transition ${showModal ? "blur-md" : ""
                }`}>
                <div className="mx-auto max-w-12xl">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className=" flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#9333ea] bg-clip-text text-transparent">
                                    Your Soft Skills Assessment Report
                                </h1>
                                <p className="mt-2 text-gray-600 text-lg">
                                    Discover your strengths, areas for improvement, and career potential.
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                <div className="h-12 w-12 rounded-full bg-[#dbeafe] flex items-center justify-center">
                                    <Users className="h-6 w-6 text-[#3b82f6]" />
                                </div>
                                <div>
                                    <h3 className="font-medium">{name}</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>{date}</span>
                                        <span className="mx-2">•</span>
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>{formatTime(timeSpent)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Overall Performance */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="mb-8 overflow-hidden border-none shadow-lg">
                            {/* <div className="absolute top-0 right-5 w-64 h-64 bg-[#fce7f3] rounded-full -mr-20 -mt-20 opacity-50" /> */}
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#dcfce7] rounded-full -ml-20 -mb-20 opacity-50" />

                            <CardHeader className="relative z-10">
                                <CardTitle className="text-2xl"> {data ? "Overall Test Performance" : <Skeleton width={200} />}</CardTitle>
                                <CardDescription> {data ? "How you performed across all soft skill categories" : <Skeleton width={250} />}</CardDescription>
                            </CardHeader>


                            <CardContent className="relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="relative h-48 w-48">
                                            {data ? (
                                                <svg className="h-full w-full" viewBox="0 0 100 100">
                                                    <circle
                                                        className="text-[#e5e7eb]"
                                                        strokeWidth="8"
                                                        stroke="currentColor"
                                                        fill="transparent"
                                                        r="40"
                                                        cx="50"
                                                        cy="50"
                                                    />
                                                    <circle
                                                        className="text-[#3b82f6]"
                                                        strokeWidth="8"
                                                        strokeLinecap="round"
                                                        stroke="currentColor"
                                                        fill="transparent"
                                                        r="40"
                                                        cx="50"
                                                        cy="50"
                                                        strokeDasharray={`${(2 * Math.PI * 40 * testSummary["Percentage Score"]) / 100} ${2 * Math.PI * 40}`}
                                                        strokeDashoffset="0"
                                                    />
                                                </svg>
                                            ) : (
                                                <Skeleton circle height={192} width={192} />
                                            )}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-5xl font-bold">                                {testSummary ? testSummary["Percentage Score"] : <Skeleton width={50} />}
                                                </span>
                                                {data ? <span className="text-xl text-gray-500">/100</span> : ""}
                                            </div>
                                        </div>
                                        <br />
                                        {data ? (
                                            <Badge
                                                className="mt-4 px-4 py-1 text-white"
                                                style={{ backgroundColor: getPerformanceLevel(testSummary["Percentage Score"]).color }}
                                            >
                                                {testSummary["User’s Performance Level"]}
                                            </Badge>
                                        ) : (
                                            <Skeleton width={100} height={30} />
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <div className="mb-6">
                                            <div className="flex items-center mb-2">
                                                <ThumbsUp className="h-5 w-5 mr-2 text-[#4f46e5]" />
                                                <span className="text-lg font-medium">You scored higher than 82% of test takers!</span>
                                            </div>
                                            <p className="text-gray-600">
                                                Your performance places you in the top 20% of all participants who completed this assessment.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">Consistency Score</h4>
                                            <div className="flex items-center">
                                                <Progress value={90} className="h-2 flex-1" />
                                                <span className="ml-2 text-sm font-medium">90%</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Your responses were highly consistent</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <h4 className="font-medium mb-2">Completion Time</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-1 text-sm">
                                                    <span>Your Time</span>
                                                    <span>{formatTime(timeSpent)}</span>
                                                </div>
                                                <Progress value={timeSpent} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1 text-sm">
                                                    <span>Average Time</span>
                                                    <span>{formatTime(timeSpent)}</span>
                                                </div>
                                                <Progress value={100} className="h-2 bg-[#dbeafe]" />
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">You completed the test 25% faster than average</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Skills Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">Category-wise Breakdown</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="border-none shadow-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl">Skills Comparison</CardTitle>
                                    <CardDescription>How your skills compare to industry average</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ChartContainer
                                        config={{
                                            A: {
                                                label: "Your Score",
                                                color: "hsl(var(--chart-1))",
                                            },
                                            B: {
                                                label: "Industry Average",
                                                color: "hsl(var(--chart-2))",
                                            },
                                        }}
                                    >
                                        <Radar data={radarData} cx="50%" cy="50%" outerRadius="70%" width={500} height={300}>
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Radar
                                                name="Your Score"
                                                dataKey="A"
                                                stroke="var(--color-A)"
                                                fill="var(--color-A)"
                                                fillOpacity={0.6}
                                            />
                                            <Radar
                                                name="Industry Average"
                                                dataKey="B"
                                                stroke="var(--color-B)"
                                                fill="var(--color-B)"
                                                fillOpacity={0.6}
                                            />
                                        </Radar>
                                    </ChartContainer>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-xl">Detailed Skills Analysis</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="communication">
                                        <TabsList className="grid grid-cols-5 mb-4">
                                            <TabsTrigger value="communication">
                                                <Mic className="h-4 w-4 md:mr-2" />
                                                <span className="hidden md:inline">Comm</span>
                                            </TabsTrigger>
                                            <TabsTrigger value="emotional">
                                                <Heart className="h-4 w-4 md:mr-2" />
                                                <span className="hidden md:inline">EQ</span>
                                            </TabsTrigger>
                                            <TabsTrigger value="problem">
                                                <Lightbulb className="h-4 w-4 md:mr-2" />
                                                <span className="hidden md:inline">Problem</span>
                                            </TabsTrigger>
                                            <TabsTrigger value="teamwork">
                                                <Users className="h-4 w-4 md:mr-2" />
                                                <span className="hidden md:inline">Team</span>
                                            </TabsTrigger>
                                            <TabsTrigger value="time">
                                                <Clock className="h-4 w-4 md:mr-2" />
                                                <span className="hidden md:inline">Time</span>
                                            </TabsTrigger>
                                        </TabsList>

                                        {skillsData.map((skill) => (
                                            <TabsContent key={skill.name.toLowerCase()} value={skill.name.toLowerCase().replace(" ", "")}>
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <div className="flex items-center">
                                                            <div className="mr-2 p-2 rounded-full bg-[#dbeafe]">{skill.icon}</div>
                                                            <h3 className="font-medium">{skill.name}</h3>
                                                        </div>
                                                        <Badge
                                                            className="px-3 text-white"
                                                            style={{ backgroundColor: getPerformanceLevel(skill.score).color }}
                                                        >
                                                            {getPerformanceLevel(skill.score).label}
                                                        </Badge>
                                                    </div>

                                                    <div className="mb-4">
                                                        <div className="flex justify-between mb-1 text-sm">
                                                            <span>Your Score</span>
                                                            <span>{skill.score}/100</span>
                                                        </div>
                                                        <Progress value={skill.score} className="h-2" />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                        <div>
                                                            <h4 className="font-medium mb-2 flex items-center">
                                                                <Award className="h-4 w-4 mr-1 text-[#4f46e5]" />
                                                                Top Strengths
                                                            </h4>
                                                            <ul className="space-y-1">
                                                                {skill.strengths.map((strength, idx) => (
                                                                    <li key={idx} className="text-sm flex items-start">
                                                                        <span className="text-[#4f46e5] mr-2">✓</span>
                                                                        {strength}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium mb-2 flex items-center">
                                                                <Lightbulb className="h-4 w-4 mr-1 text-[#ec4899]" />
                                                                Areas for Improvement
                                                            </h4>
                                                            <ul className="space-y-1">
                                                                {skill.improvements.map((improvement, idx) => (
                                                                    <li key={idx} className="text-sm">
                                                                        {improvement}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabsContent>
                                        ))}
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    {/* Career & Learning Suggestions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">Personalized Recommendations</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-none shadow-md bg-gradient-to-br from-white to-[#f3e8ff]">
                                <CardHeader>
                                    <CardTitle className="text-xl">Career Suggestions</CardTitle>
                                    <CardDescription>Based on your strengths and skill profile</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4">
                                        Your profile indicates you would excel in roles that leverage your communication and teamwork skills:
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="h-10 w-10 rounded-full bg-[#dbeafe] flex items-center justify-center mb-3">
                                                <Users className="h-5 w-5 text-[#3b82f6]" />
                                            </div>
                                            <h3 className="font-medium mb-1">Project Manager</h3>
                                            <p className="text-sm text-gray-600">
                                                Your teamwork and communication skills make you ideal for coordinating projects.
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="h-10 w-10 rounded-full bg-[#f3e8ff] flex items-center justify-center mb-3">
                                                <MessageSquare className="h-5 w-5 text-[#9333ea]" />
                                            </div>
                                            <h3 className="font-medium mb-1">HR Specialist</h3>
                                            <p className="text-sm text-gray-600">
                                                Your emotional intelligence and people skills would be valuable in human resources.
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="h-10 w-10 rounded-full bg-[#dcfce7] flex items-center justify-center mb-3">
                                                <Lightbulb className="h-5 w-5 text-[#4f46e5]" />
                                            </div>
                                            <h3 className="font-medium mb-1">Consultant</h3>
                                            <p className="text-sm text-gray-600">
                                                Your problem-solving and analytical skills would be assets in consulting roles.
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="h-10 w-10 rounded-full bg-[#fef9c3] flex items-center justify-center mb-3">
                                                <Users className="h-5 w-5 text-[#ec4899]" />
                                            </div>
                                            <h3 className="font-medium mb-1">Team Lead</h3>
                                            <p className="text-sm text-gray-600">
                                                Your combination of skills makes you well-suited for leadership positions.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-xl">Learning Resources</CardTitle>
                                    <CardDescription>Recommended to enhance your skills</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium mb-2 flex items-center">
                                                <BookOpen className="h-4 w-4 mr-2 text-[#4f46e5]" />
                                                Recommended Books
                                            </h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <div className="h-8 w-8 rounded bg-[#dbeafe] flex items-center justify-center mr-2 flex-shrink-0">
                                                        <BookOpen className="h-4 w-4 text-[#3b82f6]" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Atomic Habits by James Clear</p>
                                                        <p className="text-sm text-gray-600">Perfect for improving your time management skills</p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="h-8 w-8 rounded bg-[#f3e8ff] flex items-center justify-center mr-2 flex-shrink-0">
                                                        <BookOpen className="h-4 w-4 text-[#9333ea]" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Emotional Intelligence 2.0</p>
                                                        <p className="text-sm text-gray-600">To further develop your emotional intelligence</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-2 flex items-center">
                                                <ExternalLink className="h-4 w-4 mr-2 text-[#4f46e5]" />
                                                Online Courses
                                            </h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <div className="h-8 w-8 rounded bg-[#dcfce7] flex items-center justify-center mr-2 flex-shrink-0">
                                                        <ExternalLink className="h-4 w-4 text-[#4f46e5]" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">LinkedIn Leadership Program</p>
                                                        <p className="text-sm text-gray-600">Enhance your leadership and teamwork abilities</p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="h-8 w-8 rounded bg-[#fef9c3] flex items-center justify-center mr-2 flex-shrink-0">
                                                        <ExternalLink className="h-4 w-4 text-[#ec4899]" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Coursera: Problem-Solving Techniques</p>
                                                        <p className="text-sm text-gray-600">To strengthen your analytical thinking</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                    <Certificate ref={certificateRef} name={name} />
                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <Card className="border-none shadow-lg bg-gradient-to-r from-[#bfdbfe] to-[#f3e8ff]">
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Button onClick={downloadPDF}  disabled={isDownloading}  className="bg-[#2563eb] hover:bg-[#3b82f6] text-white">
                                        {isDownloading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> // Loader icon
                                        ) : (
                                            <Download className="mr-2 h-4 w-4" /> // Download icon
                                        )}
                                        {isDownloading ? "Downloading..." : "Download Certificate (PDF)"}
                                    </Button>
                                    <Button className="bg-[#4f46e5] hover:bg-[#9333ea] text-white">
                                        <Linkedin className="mr-2 h-4 w-4" />
                                        Share on LinkedIn
                                    </Button>
                                    <Button className="bg-[#ec4899] hover:bg-[#a855f7] text-white">
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Invite Friends to Take Test
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

