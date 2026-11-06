import Link from "next/link";

type Props = {
  name: string;
  tag: string;
  body: string;
  note: string;
};

export default function ModelCard({ name, tag, body, note }: Props) {
  return (
    <article className="card model-card">
      <span className="badge">{tag}</span>
      <h3>{name}</h3>
      <p>{body}</p>
      <p className="model-note">{note}</p>
      <Link href="/models" className="btn btn-white btn-small">
        See Image 1.0
      </Link>
    </article>
  );
}
