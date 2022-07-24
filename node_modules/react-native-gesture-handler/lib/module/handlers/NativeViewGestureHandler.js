import createHandler from './createHandler';
import { baseProps } from './gestureHandlers';
export const nativeViewProps = [...baseProps, 'shouldActivateOnStart', 'disallowInterruption'];
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of gestureHandlers.ts file
export const NativeViewGestureHandler = createHandler({
  name: 'NativeViewGestureHandler',
  allowedProps: nativeViewProps,
  config: {}
});
//# sourceMappingURL=NativeViewGestureHandler.js.map