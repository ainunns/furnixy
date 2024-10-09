import { cn } from "@/Lib/utils";
import {
  type InputHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export default forwardRef(function Input(
  {
    type = "text",
    className = "",
    isFocused = false,
    disabled,
    readOnly = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref,
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      className={cn(
        "flex w-full rounded-lg shadow-sm",
        "min-h-[2.25rem] py-0 md:min-h-[2.5rem]",
        "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
        "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:focus:border-gray-300 disabled:focus:ring-0",
        "read-only:cursor-not-allowed read-only:border-gray-300 read-only:bg-gray-100 read-only:focus:border-gray-300 read-only:focus:ring-0",
        "invalid:border-red-500 invalid:focus:border-red-500 invalid:focus:ring-red-500",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-700 file:cursor-pointer",
        className,
      )}
      ref={localRef}
    />
  );
});
