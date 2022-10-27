import { component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

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
