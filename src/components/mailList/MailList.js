import './mailList.scss';

function MailList() {
    return (
        <div className='mail'>
            <h1 className="mailTitle">
                Save time, save Money !
            </h1>
            <span className="mailDesc">
                sign up for more information
            </span>
            <div className="mailInputContainer">
                <input type="text" placeholder='Your Email ' className='mailInput' />
                <button className='mailSubmitBtn'>Subscribe</button>

            </div>
        </div>
    )
}

export default MailList