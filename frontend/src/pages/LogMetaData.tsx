import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import Header from '../components/Header';
import '../styles/index.css'


interface FormStepProps {
    question: string;
    children: React.ReactNode;
}

// Takes in the question and the input type (box, dropdown, etc)
const FormStep: React.FC<FormStepProps> = ({ question, children }) => (
    <div className="w-full max-w-2xl text-left animate-fadeIn">
        <label className="text-2xl text-gray-300">{question}</label>
        <div className="mt-4">
            {children}
        </div>
    </div>
);

function LogMetaData() {
    const [step, setStep] = useState(1);   // Keeps track of current question
    const [formData, setFormData] = useState({
        title: '',
        project: 'Project A',
        type: 'Feature',
        status: 'In Progress',
        tags: '',
    });

    const navigate = useNavigate();
    const totalSteps = 5;      // Total # of questions

    const nextStep = () => {
        if (step < totalSteps) {
            setStep(step + 1);     // Go to the next question
        } else {
            // After asking the last question, navigate and pass the form data to the Edit Log page
            navigate('/edit-log', { state: { logData: formData } });
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
        // Screen Container
        <div className="w-screen h-screen bg-center bg-cover bg-[url(src/assets/Variant7.png)] bg-[#011522] text-white flex flex-col font-sans">            
            
            {/* Header */}
            <div className="border-b py-1 border-solid border-[#ffffff33]/30 bg-cover bg-[#011522] bg-[url(src/assets/Variant6.svg)] text-white overflow-hidden">
                <Header>
                    <div className="w-full flex justify-center">
                        <p className="mr-25 font-semibold text-xl">Create New Log</p>
                    </div>
                </Header>
            </div>

            {/* Progress Line */}
            <div className="w-screen bg-[#0000004d] rounded-full h-1.5 mb-8">
                <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: `${(step / totalSteps) * 100}%`, transition: 'width 0.3s ease-in-out' }}></div>
            </div>

            <main className="flex-grow flex flex-col items-center justify-center p-4">

            <div className="w-full max-w-2xl flex flex-col items-center justify-center p-4 ">

                {/* Questions */}
                {step === 1 && <FormStep question="What's the title of your new log?">
                    <input 
                        type="text" 
                        placeholder="e.g., Fixed the authentication bug" 
                        value={formData.title} 
                        onChange={(e) => handleInputChange('title', e.target.value)} 
                        className="w-full p-3 text-xl bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-teal-400 transition-colors"/>
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
            </main>
        </div>
    );
};

export default LogMetaData;