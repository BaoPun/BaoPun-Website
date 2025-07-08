import styles from '../Styles/style.module.css';
import { Link } from 'react-router';
import Navigation from '../Components/Navigation';
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 Not Found" },
    { name: "description", content: "Not Found" },
  ];
}

export default function NotFoundPage(){
    return (
        <>
            {/* Add title at the top  */}
            <div className={styles.title}>
                <h1 id='404Title'>Page Not Found</h1>
                <p><Link to="/" style={{'color': 'cyan', 'fontSize': '20px'}}>Click Here</Link> to return to the home page.</p><br/>
            </div>


            <div className={styles.page}>
                <main className={styles.main}>
                    {/*<Image className={styles.logo} src="/next.svg" alt="Next.js logo" width={180} height={38} priority/>*/}
                    {/* &apos; is the same as ' */}
                    <p>
                    
                    </p>
                </main>
            </div>


            {/* Creating side bar content, which will be styled with css content later */}
            <Navigation />
        
        </>
    );
}