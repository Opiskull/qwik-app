import { component$, Resource } from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";

interface LoginData {
  username?: string;
  password?: string;
  error?: string;
}

export default component$(() => {
  const resource = useEndpoint<typeof onPost>();

  return (
    <div>
      <h1>Sign In</h1>

      <form method="post" action="/login">
        <label>
          <span>Username</span>
          <input name="username" type="text" disabled={resource.loading} />
        </label>
        <label>
          <span>Password</span>
          <input name="password" type="password" disabled={resource.loading} />
        </label>
        <Resource
          value={resource}
          onPending={() => <div>Loading...</div>}
          onRejected={() => <div>Error</div>}
          onResolved={(res) => <>{res.error}</>}
        />
        <button type="submit" disabled={resource.loading}>
          Sign In
        </button>
      </form>
      <p>(Username: opi, Password: opi)</p>
    </div>
  );
});

export const onPost: RequestHandler<LoginData> = async ({
  request,
  response,
}) => {
  const formData = await request.formData();

  const userName = formData.get("username") || "";

  const password = formData.get("password") || "";

  if (userName === "opi" && password === "opi") {
    response.headers.set("Set-Cookie", "isLoggedIn=1");
    throw response.redirect("/bla");
  }

  response.status = 401;

  return {
    username: userName as string,
    error: "Password or username wrong",
  };
};

export const head: DocumentHead = {
  title: "Buttonizer",
};
