export default function AtomButton({ className, children, onClick}) {
    return <button className={className} onClick={onClick}>{children}</button>;
}