export default function Switch(props) {
  const { conditional, children } = props;

  if (!children || !conditional) {
    return null;
  }

  if (!Array.isArray(children)) {
    return children;
  }

  const match = children.find((child) => conditional(child.props));

  if (match) {
    return match;
  }

  return null;
}
