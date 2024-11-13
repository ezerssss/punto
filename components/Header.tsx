import Link from 'next/link';

function Header() {
    return (
        <header className="px-10 py-5">
            <Link href="/">
                <h2 className="text-3xl font-bold">Punto</h2>
            </Link>
        </header>
    );
}

export default Header;
