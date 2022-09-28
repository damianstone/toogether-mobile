/**
 * imported from react-native
 */
function setAndForwardRef({ getForwardedRef, setLocalRef, }) {
    return function forwardRef(ref) {
        const forwardedRef = getForwardedRef();
        setLocalRef(ref);
        // Forward to user ref prop (if one has been specified)
        if (typeof forwardedRef === 'function') {
            // Handle function-based refs. String-based refs are handled as functions.
            forwardedRef(ref);
        }
        else if (typeof forwardedRef === 'object' && forwardedRef != null) {
            // Handle createRef-based refs
            forwardedRef.current = ref;
        }
    };
}
export default setAndForwardRef;
