import { PostSuggestion } from '@/components/post-suggestion';
import { Profile } from '@/components/profile'
import { Suggestion } from '@/components/suggestion'

export default async function Home() {

  const suggestions = [{
    author: {
      name: "Sportek",
      title: "Admin",
      profileUrl: "https://cdn.discordapp.com/avatars/231228861168222216/377a5db95ca13153aeb67c154da2e497.webp?size=128"
    },
    suggestion: "Je suis en désaccord. Minecraft ou non, les règles de game design sont les mêmes. Ce n'est pas parce qu'on est dans Minecraft qu'on doit infantiliser le domaine. Faire des listes d'items sur un bloc note j'appelle pas ça du game design. Au mieux tu liste des idées, mais trouver les idées n'importequi peut le faire. Si EndMC prennait sous son aile plusieurs moteurs de jeux (Unity, Unreal, Gmod, Roblox, etc) on pourrais définir des catégories globales pour tous les rôles existants. Or ce n'en est pas le cas aux dernières nouvelles, car EndMC explicite son intention de graviter autours de Minecraft."
  }]

  suggestions.push(...Array(5).fill(undefined).map(() => ({...suggestions[0]})));

  return (
    <main>
      <div>
        <PostSuggestion/>
        {suggestions.map((item, index) => (
          <Suggestion suggestion={item.suggestion} key={index}>
            <Profile name={item.author.name} title={item.author.title} profileUrl={item.author.profileUrl}/>
          </Suggestion>
        ))}
      </div>
    </main>
  )
}
