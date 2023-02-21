import { useState } from 'react'
import './tab.css'


const MyAccountTabs = () => {

    const [state, setState] = useState(1);

    const action =  (index)=> {
        setState(index)
    }
   return(
        <>
        <div className='box'>
            <div className='tabs'>
                <h3 className={`${state===1?`tab active-tab`:`tab` }`} onClick={()=>action(1)}>
                    Account
                </h3>

                <h3 className={`${state===2?`tab active-tab`:`tab` }`} onClick={()=>action(2)}>
                    Password
                </h3>

                <h3 className={`${state===3?`tab active-tab`:`tab` }`} onClick={()=>action(3)}>
                    Help
                </h3>

            </div>

            <div className='contents'>
            <div className={`${state===1? "content active-content" : 'content'}`}>
                <h1>Content 1</h1>
                <p> This is content 1</p>
            </div>

            <div className={`${state===2? "content active-content" : 'content'}`}>
                <h1>Content 2</h1>
                <p> This is content 2</p>
            </div>

            <div className={`${state===3? "content active-content" : 'content'}`}>
                <h1>Content 3</h1>
                <p> This is content 3</p>
            </div>

        </div>
        </div>

        
        </>
   )
}

export default MyAccountTabs