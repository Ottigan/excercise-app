/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import cn from 'classnames';

interface HeaderProps {
  routes: string[];
}

function Header(props: HeaderProps) {
  const { routes } = props;
  const { pathname } = window.location;

  return (
    <header className="py-3">
      <nav className="flex justify-evenly text-white font-semibold">
        {routes.map((route) => {
          const name = route[1].toUpperCase() + route.slice(2);

          return (
            <Link key={route} href={route}>
              <a className={cn(pathname === route ? 'underline decoration-solid' : '')}>{name}</a>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
