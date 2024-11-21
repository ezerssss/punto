import Link from 'next/link';

function Header() {
    return (
        <header className="p-2">
            <Link href="/">
                <h2 className="text-3xl font-bold">Punto</h2>
            </Link>
        </header>
    );
}

export default Header;
