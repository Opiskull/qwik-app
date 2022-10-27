import { component$, useStore } from "@builder.io/qwik";
import { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ request, response }) => {
  const cookie = request.headers.get("cookie");
  if (!cookie || !cookie.includes("isLoggedIn=1")) {
    throw response.redirect("/login");
  }
};

export default component$(() => {
  const state = useStore({
    count: 0,
  });

  return (
    <>
      <button
        onClick$={() => {
          state.count -= 1;
        }}
      >
        -
      </button>
      <input value={state.count} type="text" readOnly={true} />
      <button
        onClick$={() => {
          state.count += 1;
        }}
      >
        +
      </button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Buttonizer",
};
