export default (props) => {
    if (props.value === true)
        return props.children;
    else
        return null;
}