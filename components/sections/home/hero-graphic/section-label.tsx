interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

const SectionLabel = ({ children, className = "" }: SectionLabelProps) => (
    <span
        className={`inline-block px-3 py-1 rounded-full text-primary-foreground text-[10px] tracking-[0.14em] uppercase whitespace-nowrap ${className}`}
        style={{ backgroundColor: "#C46184" }}
    >
        {children}
    </span>
);

export default SectionLabel;
