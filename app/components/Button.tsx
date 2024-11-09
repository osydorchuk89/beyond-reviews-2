interface ButtonProps {
    text: string;
    style: string;
    type?: "submit" | "reset" | "button" | undefined;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ text, style, type, handleClick }: ButtonProps) => {
    const amberStyle =
        "bg-amber-300 rounded-lg text-sky-900 font-bold px-8 py-3 hover:bg-amber-400 hover:text-sky-950";
    const skyStyle =
        "bg-sky-500 rounded-lg text-white px-8 py-3 hover:bg-sky-600";
    return (
        <button
            className={style === "amber" ? amberStyle : skyStyle}
            onClick={handleClick}
            type={type}
        >
            {text}
        </button>
    );
};
