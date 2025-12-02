import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg 
        viewBox="0 0 150 25" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("text-foreground", className)}
    >
        <path d="M14.5 25V13.5L20.5 10.5V25H14.5Z" fill="currentColor"/>
        <path d="M0 25V0H6L14.5 8.5V0H20.5V11.5L12 16.5L6 13.5V25H0Z" fill="currentColor"/>
        <path d="M26.5 25V0H45.5V5.5H32.5V10.5H42.5V15.5H32.5V25H26.5Z" fill="currentColor"/>
        <path d="M51.5 25V0H70.5V5.5H57.5V25H51.5Z" fill="currentColor"/>
        <path d="M76.5 25V0H95.5V25H89.5V5.5H82.5V25H76.5Z" fill="currentColor"/>
        <path d="M129.5 0H112.5L102.5 12.5V0H96.5V25H102.5L113.5 11.5L114 25H120L129.5 0Z" fill="currentColor"/>
        <path d="M132.5 25V0H150V5.5H138.5V25H132.5Z" fill="currentColor"/>
    </svg>
  );
}
