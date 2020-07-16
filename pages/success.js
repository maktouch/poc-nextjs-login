import Link from "next/link";

export default function Success(props) {
  return (
    <div>
      Ayyyy good password!
      <Link href="/">
        <a>Return to login page</a>
      </Link>
    </div>
  );
}
