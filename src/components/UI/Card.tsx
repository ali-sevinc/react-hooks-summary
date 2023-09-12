import { ReactNode } from "react";

import "./Card.css";

interface PropType {
  children?: ReactNode;
}

export default function Card({ children }: PropType) {
  return <div className="card">{children}</div>;
}
