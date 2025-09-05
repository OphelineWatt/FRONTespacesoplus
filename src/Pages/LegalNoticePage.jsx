import React from 'react'
const LegalNoticePage = () => {
    return (    <React.Fragment>
          <h1>Mentions Légales</h1>
          <h2>1. Éditeur du site</h2>
          <p>
            Nom de l’entreprise : [Nom de l'entreprise ou du particulier]<br />
            Forme juridique : [Ex : SAS, Auto-entrepreneur, etc.]<br />
            Adresse : [Adresse complète]<br />
            Téléphone : [Numéro de téléphone]<br />
            Email : [Adresse email de contact]<br />
            SIRET : [Numéro SIRET]<br />
            Directeur de la publication : [Nom du responsable]
          </p>
          <h2>2. Hébergeur du site</h2>
          <p>
            Nom de l’hébergeur : [Ex : OVH, Infomaniak, etc.]<br />
            Adresse : [Adresse complète de l’hébergeur]<br />
            Téléphone : [Numéro de téléphone de l’hébergeur]
          </p>
          <h2>3. Propriété intellectuelle</h2>
          <p>
            Le contenu du site (textes, images, vidéos, etc.) est protégé par le droit d’auteur. Toute reproduction, distribution ou utilisation sans autorisation est interdite.
          </p>
          <h2>4. Données personnelles</h2>
          <p>
            Les données personnelles collectées sont utilisées uniquement dans le cadre défini par la politique de confidentialité. Conformément à la loi Informatique et Libertés et au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données.
          </p>
          <h2>5. Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer l’expérience utilisateur. Vous pouvez gérer vos préférences via les paramètres de votre navigateur.
          </p>
          <h2>6. Responsabilité</h2>
          <p>
            L’éditeur ne saurait être tenu responsable des dommages directs ou indirects liés à l’utilisation du site.
          </p>
        </React.Fragment>  );
}
 
export default LegalNoticePage;