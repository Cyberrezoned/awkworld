import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      <path
        d="M0 24V0L12 0V12L8 12V8H4V16H8V14L12 12V24H0Z"
        fill="currentColor"
      />
      <path
        d="M20 24V0H32V4H24V8H32V12H24V20H32V24H20Z"
        fill="currentColor"
      />
      <path
        d="M38 24V0H50V4H42V20H50V24H38Z"
        fill="currentColor"
      />
      <path
        d="M56 24V0H68V24H64V4H60V24H56Z"
        fill="currentColor"
      />
      <path
        d="M74 24V0H86V4H78V8H84C86.2091 8 88 9.79086 88 12V12C88 14.2091 86.2091 16 84 16H78V20H86V24H74ZM78 12H84V12H78V12Z"
        fill="currentColor"
      />
      <path
        d="M94 24V0H106V24H102V14H98V24H94ZM98 4V10H102V4H98Z"
        fill="currentColor"
      />
      <path
        d="M112 24V0H124V4H116V8H122C124.209 8 126 9.79086 126 12V12C126 14.2091 124.209 16 122 16H116L124 24H120L112 14.9091V24H112Z"
        fill="currentColor"
      />
      <path
        d="M132 24V0H144V4H136V20H144V24H132Z"
        fill="currentColor"
      />
    </svg>
  );
}
