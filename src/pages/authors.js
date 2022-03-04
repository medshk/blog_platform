import { useEffect, useState } from 'react/cjs/react.development';
import { auth, getAuthors } from '../firebaseConfig';
import med from '../images/med.jpg';
import Loader from '../components/layout/loader'
const users  = getAuthors()
const Authors = () => {
    const [authors, setAuthors] = useState(users)
    const [isPending, setIsPending] = useState(true)
    useEffect(() =>{
        setAuthors(users)
        if(users) {
            setIsPending(false)
        }
        return () =>{
            setAuthors(null)
        }
    },[users])
    
    return (
    <div className="authors">
        {isPending && <Loader/>}
        <div class="tags">
            <ul class="ks-cboxtags">
                <li><input type="checkbox" id="checkboxOne" value="Rainbow Dash"/><label for="checkboxOne">React</label></li>
                <li><input type="checkbox" id="checkboxTwo" value="Cotton Candy" /><label for="checkboxTwo">Food</label></li>
                <li><input type="checkbox" id="checkboxThree" value="Rarity" /><label for="checkboxThree">LifeStyle</label></li>
                <li><input type="checkbox" id="checkboxFour" value="Moondancer"/><label for="checkboxFour">Freelance</label></li>
                <li><input type="checkbox" id="checkboxFive" value="Surprise"/><label for="checkboxFive">NextJs</label></li>
                <li><input type="checkbox" id="checkboxSix" value="Twilight Sparkle" /><label for="checkboxSix">Sport
                                Sparkle</label></li>
            </ul>
        </div>
        <h1 style={{marginLeft:'80px'}}>Authors</h1>
        <div className="authors-grid">
            {authors.map(author =>{ return (
                 <div className="author" onClick={()=>window.location.href=`/author/${author.id}`} key={author.authorId}>
                 <div className="img-container"><img src={author.photoURL} alt="" /></div>
                 <div className="details">
                     <h2>{author.displayName}</h2>
                    <span>{author.niche}</span>
                 </div>
             </div>

            )})}
        </div>
    </div>
    );
}
 
export default Authors;