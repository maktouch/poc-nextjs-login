import parse from "urlencoded-body-parser";
import { useRouter } from "next/router";
import { useEffect } from "react";

const logins = {
  "2farequired": {
    status: "2FA_REQUIRED",
  },
  goodpassword: {
    status: "SUCCESS",
  },
};

export default function Home({ status }) {
  const router = useRouter();

  useEffect(
    function () {
      if (status === "SUCCESS") {
        router.replace("/success");
      }
    },
    [status]
  );

  return (
    <div className="container">
      <main>
        <h1 className="title">Hello world</h1>

        <form method="POST" target="/">
          <p>Use these password to test</p>
          <ul>
            {Object.keys(logins).map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <input type="text" name="password" placeholder="password" />

          {status === "2FA_REQUIRED" && (
            <div>
              <input type="text" name="2fa" placeholder="2fa" />
            </div>
          )}

          {status === "BAD_PASSWORD" && <div>BAD PASSWORD!</div>}

          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const body = await parse(req);

  const { password } = body;

  // in real scenario, this will send the login to an API that checks if it's valid
  const status = (function () {
    // when its undefined, it's the initial stuff.
    if (typeof password === "undefined") {
      return null;
    }

    return logins[password]?.status ?? "BAD_PASSWORD";
  })();

  if (status === "SUCCESS") {
    // write some cookies here or something
  }

  return {
    props: {
      status,
    },
  };
}
