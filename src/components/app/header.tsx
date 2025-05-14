import Image from "next/image";
import { Badge } from "../ui/badge";
import { Check, Loader } from "lucide-react";

interface HeaderProps {
  title: string;
  showConnection?: boolean;
  isConnected?: boolean;
}

export default function Header({
  title,
  showConnection = false,
  isConnected = false,
}: HeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="py-6 px-4 flex justify-between container mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/globe.svg" alt="Logo" width={24} height={24} />
          <h1 className="text-2xl font-bold text-foreground leading-0">
            {title}
          </h1>
        </div>
        {showConnection && (
          <Badge>
            {!isConnected && <Loader className="w-2 h-2 animate-spin mr-1" />}
            {isConnected && <Check className="w-2 h-2 mr-1" />}
            <span>{isConnected ? "Connected" : "Establishing connection"}</span>
          </Badge>
        )}
      </div>
    </header>
  );
}
