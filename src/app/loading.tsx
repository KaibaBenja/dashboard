import Image from "next/image";
import LogoCorrientes from "../images/logo-c.png";

export default function Loading() {
  return (
    <div className="relative flex w-screen h-screen items-center justify-center">
      <Image
        alt="Imagen giratoria"
        className="animate-spin"
        width={200}
        height={200}
        src={LogoCorrientes}
      />
    </div>
  );
}
