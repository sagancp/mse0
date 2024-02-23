import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className='py-6 bg-gray-500 mb-10'>
        <div className="container  mx-auto flex justify-center items-center">
      
        <ul className="w-2xl flex justify-around">
          <li className="mx-10 text-2xl font-bold">
            <Link className="text-gray-200 hover:text-gray-400" href="/">
            Home
            </Link>
          </li>
          <li className="mx-10 text-2xl font-bold">
            <Link className="text-gray-200 hover:text-gray-400" href="/pe">
            PE харьцаа
            </Link>
          </li>
          <li className="mx-10 text-2xl font-bold">
            <Link className="text-gray-200 hover:text-gray-400" href="/pb">
            PB харьцаа
            </Link>
          </li>
          <li className="mx-10 text-2xl font-bold">
            <Link className="text-gray-200 hover:text-gray-400" href="/roe">
              ROE
            </Link>
          </li>
          <li className="mx-10 text-2xl font-bold">
            <Link className="text-gray-200 hover:text-gray-400" href="/roa">
              ROA
            </Link>
          </li>
        </ul>
      </div>
      {/* <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/pe">
            PE харьцаа
          </Link>
        </li>
        <li>
          <Link href="/pb">
            PB харьцаа
          </Link>
        </li>
        <li>
          <Link href="/roe">
            ROE
          </Link>
        </li>
        <li>
          <Link href="/roa">
            ROA
          </Link>
        </li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
