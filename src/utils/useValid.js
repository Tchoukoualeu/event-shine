import { useSelector } from "react-redux";

export const useValid = (id) => useSelector((state) => {
  return (
    typeof state.form.valid[id] === 'undefined' ?
      undefined
    : {
      ...state.form.valid[id],
      text: (
        state.form.valid[id].text.length ?
          state.form.valid[id].text.join(' ')
        : ''
      )
    }
  );
});
