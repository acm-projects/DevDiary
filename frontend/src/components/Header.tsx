import Logo from '../components/Logo';

function Header({ children }: { children?: React.ReactNode }) {
    return (

        <div>
            <header className="w-full bg-cover bg-[url(src/assets/NavBarGradient.png)] p-4 flex justify-between items-center backdrop-blur-sm">
                <Logo />

                {children}
            </header>
        </div>
    );
}

export default Header;