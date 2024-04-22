interface CircleProps {
    diameter: number;
    background: string;
    child: any;
    border?: string;
    emptyColour?: string;
    fillRatio?: 0 | 25 | 50 | 75 | 100;
}

export default function Circle({diameter, background, child, border, fillRatio = 100, emptyColour}: CircleProps) {

    let bg: any;
    if (fillRatio === 100) {
        bg= {background};

    } else if (fillRatio === 0) {
        bg = {background: emptyColour};
    } else if (fillRatio === 25) {
        bg = {backgroundImage: `linear-gradient(00deg, ${emptyColour} 50%, transparent 50%), linear-gradient(90deg,${background} 50%, transparent 50%`};
    } else if (fillRatio === 50) {
        bg = {backgroundImage: `linear-gradient(-90deg, ${emptyColour} 50%, transparent 50%), linear-gradient(90deg,${background} 50%, transparent 50%`};
    } else if (fillRatio === 75) {
        bg = {backgroundImage: `linear-gradient(180deg, transparent 50%, ${background} 50%), linear-gradient(90deg,${background} 50%, transparent 50%`};
    }

    const style = {
        display: "flex",
        width: diameter,
        height: diameter,
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        border,
        ...bg
    }

    return <div style={style}>{child}</div>

}
