'use client';
import { loadChrono } from '@/api/dev/loadChrono';
import { useEffect } from 'react';

const About = () => {
    useEffect(() => {
        loadChrono('Acerca de');
    }, []);
    return (
        <div className="px-8 md:px-48 sm:px-12 lg:px-64 py-8">
            <h1 className="text-4xl font-bold mb-8">Acerca de HormigaDev</h1>
            <p className="text-justify mt-8 mb-8">
                ¡Hola! Soy <strong>HormigaDev</strong>, el creador de este espacio dedicado
                exclusivamente a quienes desean aprender y perfeccionarse en la creación de{' '}
                <strong>comandos para bots de Discord</strong>. Mi misión es enseñar, compartir
                conocimiento y construir una comunidad donde todos puedan aportar y crecer juntos,
                promoviendo un verdadero sentido de unidad.
            </p>
            <p className="text-justify mt-8 mb-8">
                Este blog nació del deseo de facilitar el camino a los programadores principiantes,
                porque sé lo que es comenzar desde cero sin tener a alguien que te dé ese empujón
                necesario. Cuando inicié, me emocionaba simplemente ver que un bot respondiera un
                simple mensaje como <strong>&quot;Hola &lt;nombre&gt;, ¿Cómo estás?&quot;</strong>.
                Eso encendió mi pasión por la programación y me motivó a no rendirme, incluso cuando
                las cosas parecían complicadas.
            </p>
            <p className="text-justify mt-8 mb-8">
                Aquí encontrarás ejemplos de comandos organizados por categorías, versiones de la
                API de Discord, y lenguajes como <strong>Python, Node.js, Rust</strong> y otros. Una
                característica clave es que cada publicación incluye pestañas para alternar entre
                diferentes versiones y frameworks, asegurando que siempre tengas contenido
                actualizado y relevante. Este enfoque hace que el blog sea único, ya que no se
                limita a mostrar &quot;cómo usar comandos&quot; sino que se centra en enseñarte cómo
                crearlos desde cero.
            </p>
            <p className="text-justify mt-8 mb-8">
                Actualmente, el blog está enfocado en ofrecer una colección creciente de ejemplos
                prácticos, pero a futuro tengo grandes planes. Entre ellos, una base de conocimiento
                con <strong>errores comunes</strong> y una sección educativa más amplia para cubrir
                otros aspectos de la programación. Además, sueño con expandir este espacio hacia un
                sistema de <strong>&quot;Enciclopedias&quot;</strong> organizadas por tecnologías y
                temas, para hacer del aprendizaje una experiencia aún más completa y accesible.
            </p>
            <p className="text-justify mt-8 mb-8">
                En cuanto a mi trayectoria, aunque no soy un programador senior, puedo decir con
                base que he ayudado a varios colegas a resolver problemas en sus bots y he creado
                dos bots propios:
            </p>
            <ul className="list-disc pl-12">
                <li className="mb-4 mt-2">
                    <strong>Sparklybot:</strong> Un bot con funciones administrativas diseñado para
                    servidores de Discord.
                </li>
                <li>
                    <strong>Zuumo:</strong>Un bot centrado en la diversión, ideal para alegrar a los
                    usuarios con características entretenidas.
                </li>
            </ul>
            <p className="text-justify mt-8 mb-8">
                Ambos están en etapa de desarrollo, pero espero que pronto puedas conocerlos
                operando en nuestra comunidad de Discord.
            </p>
            <p className="text-justify mt-8 mb-8">
                Si este blog te ha sido útil, te invito a unirte a nuestra{' '}
                <a
                    href="https://discord.gg/Rx5Db2WBF3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors underline"
                    aria-label="Unirte a nuestra comunidad de discord"
                >
                    <i className="fa fa-brands fa-discord mr-1" />
                    Comunidad de Discord
                </a>
                . Allí podrás compartir tus ideas, preguntar, colaborar con otros, o simplemente
                charlar sobre programación. Y si quieres apoyar aún más, suscribirte al{' '}
                <a
                    href="https://youtube.com/tu-canal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors underline"
                    aria-label="Visitar nuestro canal de YouTube"
                >
                    <i className="fa fa-brands fa-youtube mr-1" />
                    Canal YouTube
                </a>{' '}
                nos ayuda muchísimo a seguir creciendo.
            </p>
            <p className="text-justify mt-8 mb-8">
                Recuerda, no tienes que contribuir económicamente. Muchas veces, el conocimiento que
                compartimos es más valioso que el oro. Juntos, podemos crear una comunidad sólida
                donde aprender sea accesible y divertido para todos.
            </p>
            <p className="text-justify mt-8 mb-8 text-xl font-semibold text-primary">
                ¡Gracias por ser parte de esta aventura! 🚀
            </p>
        </div>
    );
};

export default About;
