import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import Header from '../components/Header';
import AnimatedPage from '../components/AnimatedPages';
import { motion, AnimatePresence } from 'framer-motion';

const FormStep: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
    <div className="w-full text-left">
        <label className="text-2xl font-semibold text-gray-200">{question}</label>
        <div className="mt-6">
            {children}
        </div>
    </div>
);

const Tips: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    let title = "Pro Tip!";
    let text = "Fill out your logs clearly to make them easier to find later.";

    switch (currentStep) {
        case 1:
            title = "Choosing a Title";
            text = "A good title is specific! 'Fixed auth bug' is better than 'bug'. Try to summarize the problem and solution.";
            break;
        case 2:
            title = "Organizing by Project";
            text = "Assigning a project helps you group related logs. You can create new projects from the main dashboard.";
            break;
        case 3:
            title = "Log Types";
            text = "Use 'Bug' for errors, 'Feature' for new additions, and 'Refactor' for code cleanup. This makes filtering powerful.";
            break;
        case 4:
            title = "Setting Status";
            text = "'In Progress' is for active problems. 'Completed' is for solved ones. 'On Hold' is for things you'll come back to.";
            break;
        case 5:
            title = "Powerful Tags";
            text = "Tags are your best friend! Use tags for technologies (e.g., react, node), concepts (e.g., auth, api), or error codes.";
            break;
    }

    return (
        <motion.div
            //re-animates at every question
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }} //  ease-out curve
            className="bg-gradient-to-br from-[#1E293B]/60 to-[#2c1e3b]/80 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm shadow-lg shadow-purple-500/10 h-full flex flex-col justify-center"
        >
            <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-lg text-gray-300">{text}</p>
            </div>
        </motion.div>
    );
};


function LogMetaData() {
    const [step, setStep] = useState(1);
    const [isTipsVisible, setIsTipsVisible] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        project: 'Project A',
        type: 'Feature',
        status: 'In Progress',
        tags: '',
    });

    const navigate = useNavigate();
    const totalSteps = 5;

    const nextStep = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            const params = new URLSearchParams();
            params.set('title', formData.title || 'Untitled Log'); // Use a default if empty
            params.set('project', formData.project);
            params.set('type', formData.type);
            params.set('status', formData.status);
            params.set('tags', formData.tags);
            
            // Navigate to the edit page with the params in the URL
            navigate(`/edit-log?${params.toString()}`);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
<<<<<<< HEAD
        <AnimatedPage>
            <div className="w-screen h-screen bg-[#0d0b1e] bg-[url(src/assets/Variant8.png)] bg-cover text-white flex flex-col font-sans">

=======
        <AnimatedPage> {/* Wrap the page content with AnimatedPage for transitions */}
            {/* Screen Container */}
            <div className="w-screen h-screen bg-[#0d0b1e] bg-[url(src/assets/Variant8.png)] bg-cover text-white flex flex-col font-sans">
                {/* Header */}
>>>>>>> routed-pages
                <Header>
                    <div className="w-full flex justify-center">
                        <p className="font-semibold text-xl">Create New Log</p>
                    </div>
                </Header>

<<<<<<< HEAD
                <main className="flex-grow flex items-center justify-center p-8 lg:p-12 gap-12 relative">

                    <button
                        onClick={() => setIsTipsVisible(prev => !prev)}
                        className="absolute top-8 right-8 z-10 px-5 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors font-semibold"
                        aria-label="Toggle Tips"
                    >
                        Tips
                    </button>

                    <div className="w-full max-w-2xl">
                        <div className="bg-[#1E293B]/60 border border-teal-500/20 rounded-2xl p-8 backdrop-blur-sm shadow-lg shadow-teal-500/10">

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-700/50 rounded-full h-1.5 mb-8">
                                <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: `${(step / totalSteps) * 100}%`, transition: 'width 0.3s ease-in-out' }}></div>
                            </div>

                            {/* Form Steps */}
                            <div className="min-h-[200px]">
                                {step === 1 && <FormStep question="What's the title of your new log?">
                                    <input
                                        type="text"
                                        placeholder="e.g., Fixed the authentication bug"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className="block w-full p-3 bg-[#011522]/80 border border-teal-500/30 rounded-lg focus:ring-teal-400 focus:border-teal-400 outline-none transition text-lg"
                                    />
                                </FormStep>}

                                {step === 2 && <FormStep question="Which project does this log belong to?">
                                    <Dropdown
                                        label=""
                                        options={["Project A", "Project B", "Project C"]}
                                        defaultValue={formData.project}
                                        onChange={(val) => handleInputChange('project', val)}
                                    />
                                </FormStep>}

                                {step === 3 && <FormStep question="What type of log is this?">
                                    <Dropdown
                                        label=""
                                        options={["Feature", "Bug", "Refactor", "Testing"]}
                                        defaultValue={formData.type}
                                        onChange={(val) => handleInputChange('type', val)}
                                    />
                                </FormStep>}

                                {step === 4 && <FormStep question="What is the current status?">
                                    <Dropdown
                                        label=""
                                        options={["In Progress", "Completed", "On Hold"]}
                                        defaultValue={formData.status}
                                        onChange={(val) => handleInputChange('status', val)}
                                    />
                                </FormStep>}

                                {step === 5 && <FormStep question="Add some comma-separated tags.">
                                    <input
                                        type="text"
                                        placeholder="e.g., react, typescript, bug"
                                        value={formData.tags}
                                        onChange={(e) => handleInputChange('tags', e.target.value)}
                                        className="block w-full p-3 bg-[#011522]/80 border border-teal-500/30 rounded-lg focus:ring-teal-400 focus:border-teal-400 outline-none transition text-lg"
                                    />
                                </FormStep>}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="w-full flex justify-end items-center gap-4 mt-10">
                                {step > 1 && <button onClick={prevStep} className="text-gray-400 hover:text-white transition-colors font-semibold px-4 py-2">Back</button>}
                                <button
                                    onClick={nextStep}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${step === totalSteps ? 'bg-purple-600 hover:bg-purple-700' : 'bg-teal-500 hover:bg-teal-600'}`}
                                >
                                    {step === totalSteps ? 'Start Writing' : 'Next'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tips Card */}
                    <AnimatePresence>
                        {isTipsVisible && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, width: 0 }}
                                animate={{ opacity: 1, scale: 1, width: '28rem' }} 
                                exit={{ opacity: 0, scale: 0.9, width: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="h-full hidden lg:block"
                            >
                                <Tips currentStep={step} />
                            </motion.div>
                        )}
                    </AnimatePresence>

=======
                {/* Progress Line */}
                <div className="w-screen bg-[#0000004d] rounded-full h-1.5 mb-8">
                    <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: `${(step / totalSteps) * 100}%`, transition: 'width 0.3s ease-in-out' }}></div>
                </div>

                <main className="flex-grow flex flex-col items-center justify-center p-4">

                    <div className="w-full max-w-3xl bg-[#1E293B]/60 border border-teal-500/20 rounded-2xl p-8 backdrop-blur-sm shadow-lg shadow-teal-500/10">

                        {/* Questions */}
                        {step === 1 && <FormStep question="What's the title of your new log?">
                            <input
                                type="text"
                                placeholder="e.g., Fixed the authentication bug"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full p-3 text-xl bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-teal-400 transition-colors" />
                        </FormStep>}

                        {step === 2 && <FormStep question="Which project does this log belong to?">
                            <Dropdown
                                label=""
                                options={["Project A", "Project B", "Project C"]}
                                defaultValue={formData.project}
                                onChange={(val) => handleInputChange('project', val)}
                            />
                        </FormStep>}

                        {step === 3 && <FormStep question="What type of log is this?">
                            <Dropdown
                                label=""
                                options={["Feature", "Bug", "Refactor", "Testing"]}
                                defaultValue={formData.type}
                                onChange={(val) => handleInputChange('type', val)}
                            />
                        </FormStep>}

                        {step === 4 && <FormStep question="What is the current status?">
                            <Dropdown
                                label=""
                                options={["In Progress", "Completed", "On Hold"]}
                                defaultValue={formData.status}
                                onChange={(val) => handleInputChange('status', val)}
                            />
                        </FormStep>}

                        {step === 5 && <FormStep question="Add some comma-separated tags.">
                            <input
                                type="text"
                                placeholder="e.g., react, typescript, bug"
                                value={formData.tags}
                                onChange={(e) => handleInputChange('tags', e.target.value)}
                                className="w-full p-3 text-xl bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-teal-400 transition-colors"
                            />
                        </FormStep>}

                        {/* Next/Back/Start writing buttons */}
                        <div className="w-full flex justify-start items-center gap-4 mt-10">
                            <button onClick={nextStep} className={`px-6 py-2 bg-[#43B5A8] rounded-md font-semibold hover:opacity-90 transition-opacity ${step === totalSteps ? 'bg-[#8248af]' : ''}`}>{step === totalSteps ? 'Start Writing' : 'Next'} </button>
                            {step > 1 && <button onClick={prevStep} className="text-gray-400 hover:text-white transition-colors">Back</button>}
                        </div>
                    </div>
>>>>>>> routed-pages
                </main>
            </div>
        </AnimatedPage>
    );
};

export default LogMetaData;