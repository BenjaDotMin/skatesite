import clsx from "clsx";

//can only be one of these (typescript)
type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; //optional
  size?: "xl" | "lg" | "md" | "sm" | "xs"; //opitonal
  children: React.ReactNode; //childen not required (content within <heading> tags, like slots)
  className?: string; //optional
};

//just like passing things in, except it as :HeadingProps on the end, and that says what the types wil be
export function Heading({ as: Comp = "h1", className, children, size = "lg",}: HeadingProps) {
    return (
        <Comp //comp is whatver "as" is?
            className={clsx(
                "font-sans uppercase",
                size === "xl" && "~text-4xl/8xl",
                size === "lg" && "~text-4xl/7xl",
                size === "md" && "~text-3xl/5xl",
                size === "sm" && "~text-2xl/4xl",
                size === "xs" && "~text-lg/xl",
                className,
            )}>
            {children}
        </Comp>
    );
}