interface ButtonProps {
    text: string;
    style: string;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ text, style, handleClick }: ButtonProps) => {
    const amberStyle =
        "bg-amber-200 rounded-lg text-sky-900 px-8 py-3 hover:bg-amber-300 hover:text-sky-950";
    const skyStyle =
        "bg-sky-500 rounded-lg text-white px-8 py-3 hover:bg-sky-600";
    return (
        <button
            className={style === "amber" ? amberStyle : skyStyle}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};
