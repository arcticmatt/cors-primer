import Head from "next/head";

const SERVERS = {
  CORS: "http://localhost:3002/test",
  CORS_CREDENTIALS: "http://localhost:3003/test",
  NO_CORS: "http://localhost:3001/test",
};

function GenericButton(props) {
  return (
    <button
      onClick={async () => {
        try {
          const response = await fetch(props.server, props.requestOptions);
          console.log("response", response);
        } catch (e) {
          console.log("exception!", e);
        }
      }}
    >
      {props.buttonTitle}
    </button>
  );
}

function ButtonSimpleFailure() {
  // Results in an exception ("TypeError: Failed to fetch") being thrown and caught.
  return (
    <GenericButton
      buttonTitle="CORS Failure"
      requestOptions={{
        method: "POST",
        headers: {
          // This does nothing, you can't modify Origin programatically.
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin
          Origin: "http://localhost:3001",
        },
      }}
      server={SERVERS.NO_CORS}
    />
  );
}

function ButtonNoCors() {
  // Results in an opaque response being returned. See
  // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
  return (
    <GenericButton
      buttonTitle="No CORS"
      requestOptions={{
        method: "POST",
        mode: "no-cors",
      }}
      server={SERVERS.NO_CORS}
    />
  );
}

function ButtonPreflightFailure() {
  // Results in a preflight request being sent and an exception 
  // ("TypeError: Failed to fetch") being thrown and caught.
  return (
    <GenericButton
      buttonTitle="CORS Preflight Failure"
      requestOptions={{
        method: "POST",
        headers: {
          // This triggers a CORS preflight
          "Content-Type": "application/xml",
        },
      }}
      server={SERVERS.NO_CORS}
    />
  );
}

function ButtonSimplePass() {
  // Request succeeds
  return (
    <GenericButton
      buttonTitle="CORS Pass"
      requestOptions={{
        method: "POST",
      }}
      server={SERVERS.CORS}
    />
  );
}

function ButtonPreflightPass() {
  // Request succeeds
  return (
    <GenericButton
      buttonTitle="CORS Preflight Pass"
      requestOptions={{
        method: "POST",
        headers: {
          // This triggers a CORS preflight
          "Content-Type": "application/xml",
        },
      }}
      server={SERVERS.CORS}
    />
  );
}

function ButtonCredentialsFailure() {
  return (
    <GenericButton
      buttonTitle="CORS Credentials Failure"
      requestOptions={{
        method: "POST",
        credentials: "include",
        headers: {
          // This triggers a CORS preflight
          "Set-Cookie": "hi",
        },
      }}
      server={SERVERS.CORS}
    />
  );
}

function ButtonCredentialsPass() {
  return (
    <GenericButton
      buttonTitle="CORS Pass"
      requestOptions={{
        method: "POST",
        credentials: "include",
        headers: {
          // This triggers a CORS preflight
          "Set-Cookie": "hi",
        },
      }}
      server={SERVERS.CORS_CREDENTIALS}
    />
  );
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>CORS Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is for testing CORS.</h1>
        <h2>Server with no CORS support</h2>
        <ButtonSimpleFailure />
        <ButtonNoCors />
        <ButtonPreflightFailure />
        <h2>Server with CORS support</h2>
        <ButtonSimplePass />
        <ButtonPreflightPass />
        <ButtonCredentialsFailure />
        <h2>Server with CORS credentials support</h2>
        <ButtonCredentialsPass />
      </main>
    </div>
  );
}
