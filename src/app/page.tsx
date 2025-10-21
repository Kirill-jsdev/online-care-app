import Link from "next/link";

export default function Home() {
  return (
    <div className="p-2 flex gap-2">
      <Link href="/nurse-register">Go to Nurse Register</Link>
      <Link href="/nurse-list">Go to Nurse List</Link>
    </div>
  );
}
