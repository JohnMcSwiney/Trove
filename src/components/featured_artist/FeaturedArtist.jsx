import React from "react";
import "./FeaturedArtist.css";



const FeaturedArtist = () => {
    // const user = props.user;
    const artist = {
        name: "PitBull",
        imgUrl: "https://storage.googleapis.com/trv_test/TempUsers/U0001/pitbullpic.jpg",
    //     bio: `Pitbull, also known as 'Mr. Worldwide', is a rapper, singer, and songwriter from Miami, Florida. His music blends hip-hop, pop, and Latin influences, creating a sound that is uniquely his own. Pitbull's career took off in the early 2000s, thanks in part to his energetic mixtapes and collaborations with other artists.

    //         Pitbull's music is known for its upbeat, party-ready sound, as well as his signature catchphrase, '¡Dale!', which means 'Let's go!' in Spanish. He has released a string of hit singles and albums, including 'I Know You Want Me (Calle Ocho)', 'Give Me Everything', and 'Timber', featuring Kesha. He has also worked with a wide range of artists from various genres, such as Jennifer Lopez, Enrique Iglesias, Ne-Yo, and Christina Aguilera, among many others.

    //         Pitbull has earned the nickname 'Mr. Worldwide' due to his global popularity and the fact that his music is loved by fans all around the world. He has toured extensively throughout North America, Europe, Latin America, and Asia, performing at major events such as the World Cup and the Olympics. His music has even been used in movies, TV shows, and commercials, further expanding his reach and influence.

    //         In addition to his music career, Pitbull is also involved in various business ventures, including his own record label, Mr. 305 Inc., and his partnership with Voli Vodka. He is also known for his philanthropic work, supporting initiatives related to education, health, and disaster relief.

    //         With his unique sound, catchy hooks, and positive energy, Pitbull has become one of the most beloved and recognizable artists in the music industry, earning the title of 'Mr. Worldwide' in the process.`
    // 
}

    return (
        <div className="featArtCont">
            <div className="featArtImg">
                <img src={artist.imgUrl}/>
                <h1>{artist.name}</h1>
            </div>
        

        </div>

    );
}

export default FeaturedArtist;