import Logo from '../components/Logo';

function Header({ children }: { children?: React.ReactNode }) {
    return (

        <div>
            <header className="flex mx-4 items-center justify-between py-3 px-4border-b border-gray-700/80">
                {/* Render the Logo on the left */}
                <Logo />

                {/* Renders the content passed from the page */}
                {children}
            </header>
        </div>
    );
}

export default Header;