import Logo from '../components/Logo';

function Header({ children }: { children?: React.ReactNode }) {
    return (

        <div>
            <header className="flex mx-4 items-center justify-between py-3 px-4 border-gray-700/80">
                <Logo />

                {children}
            </header>
        </div>
    );
}

export default Header;