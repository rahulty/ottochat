import { h } from "preact";

export function Form(props) {
  const { onSubmit, children, autocomplete, ...otherProps } = props;

  function onS(e) {
    e.preventDefault();
    const txtInputs = e.target.querySelectorAll(
      'input[type="text"],input[type="password"]'
    );
    const retValue = onSubmit(e);
    txtInputs.forEach((t) => (t.value = ""));
    return retValue;
  }
  return (
    <form autocomplete={autocomplete || "off"} onSubmit={onS} {...otherProps}>
      {children}
    </form>
  );
}
