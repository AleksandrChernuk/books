import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return <div className="max-w-5xl px-4 mx-auto">{children}</div>;
}
