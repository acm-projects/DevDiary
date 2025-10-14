import Cancel from '../components/Cancel';
import Save from '../components/Save';
import Header from '../components/Header';
import Profile from '../components/Profile';
import { useState } from "react";

interface SettingsProps {
    label: string
    description: string
    children?: React.ReactNode

}

function Settings() {
    const [activeSection, setActiveSection] = useState('profile');  {/* sets profile as the default active section */}

    const navLinks = [
        { id: 'profile', label: 'Profile'},
        { id: 'account', label: 'Account'},
        { id: 'appearance', label: 'Appearance'},
        { id: 'notifications', label: 'Notifications'},
    ]

    // component for individual settings rows
    const SettingRow = ({ label, description, children }: SettingsProps) => (
        <div className="flex justify-between items-center py-4 border-b border-gray-400/50">
            <div className="flex flex-wrap justify-start">
                <h3 className="font-semibold text-white">{label}</h3>
                <div className="w-full flex-none"></div> {/* forces description to be on a new line */}
                <p className="text-sm text-gray-300">{description}</p>
            </div>
            <div>
                {children}
            </div>
        </div>
    );

    // toggle switch
    const ToggleSwitch = () => (
         <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-500 peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
            after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
        </label>
    );

    return (
        <div className="w-screen h-screen bg-[#011522] text-white overflow-hidden flex flex-grow flex-col font-sans">
            
            {/* Header */}
            <div className="border-b py-1 border-solid border-[#ffffff33]/30 bg-cover bg-[#011522] bg-[url(src/assets/Variant6.svg)] text-white overflow-hidden">
            <Header>
                <div className="flex items-center gap-4">
                    <p className="font-semibold text-xl">Settings</p>
                </div>
                <div className="flex items-center gap-4">
                   <Profile />
                </div>
            </Header>
            </div>

            {/* Main */}
            <div className="flex flex-col md:flex-row flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 gap-0 overflow-hidden md:gap-6">

                {/* Nav SideBar */}
                <nav className="w-full md:w-1/4 lg:w-1/5 p-4 bg-cover bg-white/5 rounded-lg border border-r-0 border-solid border-white/20 h-full bg-[url(src/assets/Variant7.png)] ">
                    <ul className="space-y-2 text-white">
                       {navLinks.map((link) => (

                        <li key={link.id}>
                            <a 
                                href={`#${link.id}`}
                                onClick = {() => setActiveSection(link.id)}
                                className={`block p-2 rounded-md hover:bg-teal-500/20 font-semibold transition-colors ${activeSection == link.id ? 'bg-teal-500/20' : ''}`}>

                                {link.label}

                            </a>
                        </li>
                       )                  
                    )}
                    </ul>
                </nav>
                


                {/* Settings Content */}
                <main className="flex-1 bg-white/5 bg-cover rounded-lg border border-l-[1px] border-solid border-white/20 p-6 md:p-8 overflow-y-auto bg-[url(src/assets/Variant7.png)]">
                     <div className="flex justify-between items-center mb-6">
                        <h1 className="font-semibold text-[30px]">General Settings</h1>
                        <div className="flex items-center gap-4">
                            <Cancel />
                            <Save onClick={() => { /* handles save action */ }} />
                        </div>
                    </div>

                    {/* Profile Section */}
                    <section id="profile" className={`mb-10    `}>
                        <h2 className="text-left text-xl font-semibold border-b border-blue-950/50 pb-2 mb-4">Profile</h2>
                        <div className="space-y-4">
                            <SettingRow label="Full Name" description="This will be displayed on your profile.">
                                <input type="text" defaultValue="John Doe" className="w-64 p-2 bg-gray-700/50 border border-[#6A7278]  rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                            </SettingRow>
                             <SettingRow label="Username" description="Your unique username on the platform.">
                                <input type="text" defaultValue="johndoe" className="w-64 p-2 bg-gray-700/50 border border-[#6A7278] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                            </SettingRow>
                        </div>
                    </section>

                    {/* Account Section */}
                    <section id="account" className="mb-10">
                        <h2 className="text-left text-xl font-semibold border-b border-blue-950/50 pb-2 mb-4">Account</h2>
                         <div className="space-y-4">
                            <SettingRow label="Email Address" description="Used for login and notifications.">
                                <input type="email" defaultValue="john.doe@example.com" className="w-64 p-2 bg-gray-700/50 border border-[#6A7278] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                            </SettingRow>
                             <SettingRow label="Change Password" description="Update your account password.">
                                <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-md font-semibold transition-colors">Change</button>
                            </SettingRow>
                             <SettingRow label="Delete Account" description="Permanently delete your account and all data.">
                                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-colors">Delete</button>
                            </SettingRow>
                        </div>
                    </section>

                    {/* Appearance Section */}
                    <section id="appearance" className="mb-10">
                        <h2 className="text-left text-xl font-semibold border-b border-blue-950/50 pb-2 mb-4">Appearance</h2>
                        <SettingRow label="Theme" description="Switch between light and dark mode.">
                           <div className="flex gap-2">
                                <button className="px-4 py-2 bg-gray-700 rounded-md">Light</button>
                                <button className="px-4 py-2 bg-teal-600 rounded-md">Dark</button>
                           </div>
                        </SettingRow>
                    </section>

                     {/* Notifications Section */}
                    <section id="notifications" className="mb-10">
                        <h2 className="text-left text-xl font-semibold border-b border-blue-950/50 pb-2 mb-4">Notifications</h2>
                        <SettingRow label="Email Notifications" description="Receive updates and alerts via email.">
                           <ToggleSwitch />
                        </SettingRow>
                         <SettingRow label="Push Notifications" description="Receive alerts directly on your device.">
                           <ToggleSwitch />
                        </SettingRow>
                    </section>
                </main>
            </div>
        </div>

        
    );
}

export default Settings;

