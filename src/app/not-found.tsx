import { Action } from "@/components/site";
export default function NotFound() {
  return (
    <div className="container not-found">
      <p>Erreur 404</p>
      <h1>Cette page n’est plus ici.</h1>
      <p>
        Retrouvez nos solutions, vos ressources et les accès aux plateformes
        depuis l’accueil.
      </p>
      <Action href="/">Retour à l’accueil</Action>
    </div>
  );
}
