import clsx from "clsx";
import Link from "next/link";

/**
 * @param {{
 * children: any,
 * className: string,
 * variant: 'primary' | 'outline',
 * href: string
 * }} props
 *
 */

export function UiButton({ children, className, variant, href = "#", onClick = "" }) {
  const buttonClassname = clsx(
    "",
    className,
    {
      primary:
        "bg-blue-400 rounded-xs py-2 px-3 text-white hover:bg-blue-300 transition-colors border-blue-400 border-1",
      outline:
        "border-1 rounded-xs py-2 px-3 hover:bg-blue-50 transition-colors ",
    }[variant]
  );
  return <Link className={buttonClassname} href={href} onClick={onClick}>{children}</Link>;
}
