import { Badge } from "../components/ui/badge"
import { Award, CheckCircle } from "lucide-react"
import type { Metadata } from "next"
import { forwardRef, useEffect, useState } from "react"
export const metadata: Metadata = {
    title: "Certificate of Achievement",
    description: "Professional certificate of achievement",
}
interface CertificateProps { }
const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
    ({ name }, ref) => {
        const [date, setDate] = useState<string>(""); // Ensure type safety
        // Function to get formatted date
        const getCurrentDate = () => {
            const today = new Date();
            return today.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });
        };
        // Certificate data (would normally come from a database or API)
        const certificateData = {
            recipientName: "",
            courseName: "Advanced Data Science",
            skillArea: "Machine Learning and AI",
            issueDate: "",
            score: "95%",
            certificateId: "MMA-2024-78945612",
        }
        // function lock
        useEffect(() => {
            setDate(getCurrentDate());
        }, []); // Runs only on component mount
        return (
            <div  ref={ref} className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
                <div className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg print:shadow-none">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-[0.02]">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[30deg] text-[400px] text-blue-500"
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${i * 18}deg)`,
                                }}
                            >
                                ⬡
                            </div>
                        ))}
                    </div>

                    {/* Certificate content */}
                    <div className="relative z-10 p-8 md:p-12">
                        {/* Header */}
                        <div className="mb-8 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                                    <Award className="h-6 w-6" />
                                </div>
                                <h2 className="text-xl font-semibold text-blue-600">MindMap AI</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-500">Certificate ID</p>
                                <p className="font-mono text-sm font-medium">{certificateData.certificateId}</p>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="mb-10 text-center">
                            <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                Certificate of Achievement
                            </h1>
                            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                        </div>

                        {/* Recipient */}
                        <div className="mb-10 text-center">
                            <p className="mb-2 text-sm uppercase tracking-wider text-slate-500">This certifies that</p>
                            <h2 className="mb-2 font-serif text-4xl font-medium text-slate-800 md:text-5xl">
                                {name}
                            </h2>
                            <p className="mx-auto max-w-2xl text-center text-slate-600">
                                has successfully completed the <span className="font-semibold">{certificateData.courseName}</span> and
                                demonstrated proficiency in <span className="font-semibold">{certificateData.skillArea}</span>
                            </p>
                        </div>

                        {/* Details */}
                        <div className="mb-10 flex flex-wrap justify-center gap-6 md:gap-10">
                            <div className="text-center">
                                <p className="text-sm uppercase tracking-wider text-slate-500">Issue Date</p>
                                <p className="font-medium text-slate-800">{date}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm uppercase tracking-wider text-slate-500">Score</p>
                                <p className="font-medium text-slate-800">{certificateData.score}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm uppercase tracking-wider text-slate-500">Status</p>
                                <Badge className="bg-green-50 text-green-700 hover:bg-green-50">
                                    <CheckCircle className="mr-1 h-3 w-3" /> Verified
                                </Badge>
                            </div>
                        </div>

                        {/* Signature */}
                        <div className="flex flex-col items-center justify-between gap-8 border-t border-slate-200 pt-8 md:flex-row">
                            <div className="text-center md:text-left">
                                <div className="mb-2 font-serif text-lg italic text-slate-600">Sahil rana</div>
                                <p className="text-sm text-slate-500">Program Director, MindMap AI</p>
                            </div>

                            <div className="flex gap-2">
                                <div className="h-12 w-12 rounded-full bg-blue-100 p-2">
                                    <div className="h-full w-full rounded-full bg-blue-600"></div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-amber-100 p-2">
                                    <div className="h-full w-full rounded-full bg-amber-400"></div>
                                </div>
                            </div>
                        </div>

                        {/* Watermark */}
                        <div className="absolute bottom-6 right-6 text-xs text-slate-300">
                            Verify this certificate at mindmap-ai.com/verify
                        </div>
                    </div>
                </div>
            </div>
        )
    })
export default Certificate