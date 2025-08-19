import Button from 'react-bootstrap/Button';
const HomePage = () => {
    return <>
        <header className="header">
        <h1>Espace o+</h1>
        <h2>"Un service qui permet aux utilisateurs de géolocaliser, d’évaluer et de partager des lieux publics variés, accessibles aux personnes en situation d’obésité. "</h2>
        <div>
        <Button variant="primary" href='/login'>Connexion</Button>
        <Button variant="primary" href="/application">Application</Button>
        </div>
        </header>
        <div>
            <h3> A propos :</h3>
            <p>Le projet Espaces O+ vise à adresser le manque d'informations concernant l'accessibilité des lieux publics pour les personnes en situation d'obésité. Cette problématique, souvent invisible, génère des situations de mal-être, de stigmatisation et d'exclusion dues à des infrastructures inadaptées (sièges, passages étroits, équipements de confort). C'est pouquoi j'ai une plateforme web interactive et intuitive permettant la recherche et l'évaluation de lieux publics selon des critères d'accessibilité spécifiques aux personnes en situation d'obésité.</p>
        </div>
     </>;
}
 
export default HomePage;