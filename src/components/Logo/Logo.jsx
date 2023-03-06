import s from './style.module.css'
export function Logo ({img, title, subtitle}){
    return(
        <>
            <div className={s.container}>
                <img src={img} alt="logo" className={s.img}/>
                <div className={s.title}>{title}</div>
            </div>
            <div className={s.subtitle}>{subtitle}</div>
        </>
    )
}