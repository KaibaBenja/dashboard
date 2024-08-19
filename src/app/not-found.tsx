import Link from "next/link";
import Image from "next/image";

import NotFoundLogo from "../images/logo-susti.png";

export default function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 text-center">
      <Image
        src={NotFoundLogo}
        alt="not found img"
        className="mb-6 lg:mb-14 w-full mx-4 lg:w-[700px] object-contain"
      />
      <h1 className="text-6xl font-bold tracking-tight text-[#66cc00] md:text-7xl">404 Not Found Page</h1>
      <p className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">
        Oops, esta pagina no existe
      </p>
      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
        Parece que te perdiste, te mostraremos como volver al inicio de la pagina.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md px-8 py-4 text-base bg-[#66cc00] font-semibold text-[#ffffff]"
        prefetch={false}
      >
        Volver al Home
      </Link>
    </div>
  )
}