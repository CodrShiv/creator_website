const Close = (props) => {
    return <svg className={props.Name} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="7" fill="white" />
        <path d="M21 8L8 21" stroke="#E31E0C" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8L21 21" stroke="#E31E0C" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}
export default Close;