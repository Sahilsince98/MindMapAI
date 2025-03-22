
import NavbarLandingPage from '../components/NavbarLandingPage'
import { Brain, Lightbulb, Target, Compass, Star, ArrowRight, CheckCircle, Users, TrendingUp, Play, Zap, Users2, Eye, Award, Building2, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const SoftSkillsTest = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
   const navigate=useNavigate()
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
const handleNavigate=()=>{
    navigate("/questions")
}
  useEffect(() => {
    let intervalId;
    if (!isPaused) {
      intervalId = setInterval(nextSlide, 4000); // Autoplay every 4 seconds
    }
    return () => clearInterval(intervalId);
  }, [isPaused]);
  return (
    <>
    <NavbarLandingPage/>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="mb-8 animate-float">
            <Brain className="w-16 h-16 mx-auto text-indigo-600" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text fade-in">
          Unlock Your Full Potential
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 fade-in-delay-1">
           Discover Your True Strengths Today! Gain a competitive edge in your career with a personalized strengths report and a recognized certificate to showcase your soft skills.

          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 fade-in-delay-2">
            <button onClick={handleNavigate}  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Take the Test Now <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>Join 1000+ users</span>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Why Take This Test? <span className="gradient-text">(Unlock Your Career)</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl card-shadow hover-scale">
                <div className="mb-6">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                  <div className="text-indigo-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                {/* <a href="#" className="text-indigo-600 font-semibold flex items-center gap-2 hover:text-indigo-700 transition-colors">
                  Learn more <ArrowRight className="w-4 h-4" />
                </a> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              See How It Works
            </h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl hover:shadow-indigo-500/20 transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                alt="How it works"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <button className="w-20 h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-indigo-600 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            {stats.map((stat, index) => (
              <div key={index} className="hover-scale">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Your Journey to <span className="gradient-text">Mental Clarity</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl card-shadow hover-scale">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Before the Test</h3>
              </div>
              <div className="mb-6 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Person looking confused"
                  className="w-full h-48 object-cover"
                />
              </div>
              <ul className="space-y-6">
                {beforePoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="text-red-500 mt-1">{point.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{point.title}</h4>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl card-shadow hover-scale">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">After the Test</h3>
              </div>
              <div className="mb-6 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="People collaborating successfully"
                  className="w-full h-48 object-cover"
                />
              </div>
              <ul className="space-y-6">
                {afterPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="text-green-500 mt-1">{point.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{point.title}</h4>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Transform Your <span className="gradient-text">Understanding</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl card-shadow hover-scale">
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                  <div className="text-indigo-600">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Start Your <span className="gradient-text">Strengths Journey</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl ${plan.featured ? 'ring-2 ring-indigo-600 shadow-xl' : 'card-shadow'} hover-scale`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.title}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-full font-semibold ${plan.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} transition-colors`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          What Others Are Saying 
          <span className="gradient-text">(Real Success Stories)</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl card-shadow hover-scale">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-indigo-50"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    <div 
      className="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button 
        className="carousel-arrow prev"
        onClick={prevSlide}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        className="carousel-arrow next"
        onClick={nextSlide}
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div 
        className="carousel-inner"
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className={`carousel-item p-4 ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="bg-white p-8 rounded-2xl card-shadow">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-indigo-50"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Ready to Unlock Your Mind's Potential?
            </h2>
            <p className="text-xl opacity-90 mb-12">
              Join thousands of others who have transformed their understanding through our AI-powered test.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center mx-auto gap-2">
              Start Your Journey Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
 
 
    </>
   
  );
};
const stats = [
  { value: "1000+", label: "Active Users" },
  { value: "97%", label: "Satisfaction Rate" },
  { value: "15min", label: "Average Test Time" },
  { value: "89%", label: "Accuracy Rate" }
];

const beforePoints = [
  {
    icon: <Compass className="w-5 h-5" />,
    title: "Unclear Direction",
    description: "Struggling to understand your natural thinking patterns and decision-making process."
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Decision Paralysis",
    description: "Finding it difficult to make confident choices in personal and professional life."
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "Cognitive Confusion",
    description: "Unsure about your mental strengths and how to leverage them effectively."
  }
];

const afterPoints = [
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Crystal Clear Insight",
    description: "Deep understanding of your cognitive patterns and how to optimize them."
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: "Confident Decisions",
    description: "Make choices aligned with your natural thinking style and strengths."
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Enhanced Performance",
    description: "Leverage your cognitive strengths for better personal and professional results."
  }
];

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: " Know Your Strengths",
    description: "Gain deep insights into your unique abilities and how they shape your success.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Users2 className="w-6 h-6" />,
    title: "Accelerate Your Career",
    description: "Stand out in job applications, ace interviews, and become a high performer in your industry.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Get a Recognized Certificate",
    description: "Showcase your soft skills with a certification that is valued by companies and recruiters.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: " Boost Your Resume & LinkedIn Profile",
    description: " Highlight your strengths and increase your chances of landing your dream job.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: " Improve Communication & Teamwork",
    description: "Enhance collaboration, leadership, and emotional intelligence for professional and personal success.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <BadgeCheck className="w-6 h-6" />,
    title: "Personalized Growth Plan",
    description: " Get tailored recommendations to develop your skills and unlock new opportunities.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const benefits = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Enhanced Self-Awareness",
    description: "Gain deep insights into your cognitive patterns and thinking preferences, understanding how your mind naturally works.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Better Decision Making",
    description: "Learn to leverage your natural thinking style for improved choices, reducing stress and uncertainty in decision-making.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: "Clear Direction",
    description: "Receive personalized recommendations for personal and professional growth based on your unique cognitive profile.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const pricingPlans = [
  {
    title: "Full Strengths Report",
    price: "29",
    period: "/report",
    features: [
      "List of your top 5 strengths",
      "Actionable development insights",
      "Watch out areas",
      "Best partners",
      "Career applications",
      "Collect one-time 360 feedback",
      "Invite up to 10 friends",
      "Create up to 5 groups"
    ]
  },
  {
    title: "Full Report + Coaching Call",
    price: "69",
    period: "",
    featured: true,
    features: [
      "Everything from the Full Strengths Report",
      "30-min debriefing call with certified coach",
      "Personalized session based on results",
      "Clear actions identified",
      "Development plan creation",
      "Follow-up resources",
      "Priority support"
    ]
  },
  {
    title: "Full Platform Access",
    price: "96",
    period: "/year",
    features: [
      "Your Full Strengths Report",
      "Collect ongoing 360 feedback",
      "Unlimited friend invites",
      "Weekly insights",
      "Unlimited analytics",
      "Unlimited groups",
      "Priority support",
      "Regular progress tracking"
    ]
  }
];

const testimonials = [
  {
    name: "Sagar Sharma",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    quote: "This test gave me incredible insights into how I process information. It's transformed how I approach challenges at work and helped me build stronger team dynamics."
  },
  {
    name: "Sahil Singh",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    quote: "The personalized recommendations were spot-on. I've noticed a significant improvement in my problem-solving abilities and how I approach complex technical challenges."
  },
  {
    name: "Shivani thakur",
    role: "Student",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    quote: "As a student, understanding my thinking patterns has helped me develop better study strategies. My grades have improved, and I feel more confident in my academic journey."
  },
  {
    name: "Shivani thakur",
    role: "Business Consultant",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    quote: "The insights from this test have revolutionized how I approach client consultations. I can now better understand and adapt to different thinking styles."
  },
  {
    name: "Udit Kumar",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    quote: "This assessment helped me build better relationships with my team. Understanding our different strengths has improved our collaboration significantly."
  },
  {
    name: "James Wilson",
    role: "HR Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    quote: "We've incorporated this test into our hiring process. It's helped us build more balanced teams and improve workplace harmony."
  }
];
export default SoftSkillsTest;
