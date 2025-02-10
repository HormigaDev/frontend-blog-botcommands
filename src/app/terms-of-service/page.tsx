import Link from 'next/link';
import RootLayout from '@/app/layouts/RootLayout';
import { Metadata } from 'next';
import _metadata from '@/app/data/metadata.json';

const host = process.env.HOST;

export const metadata: Metadata = {
    title: 'HormigaDev - ' + _metadata.terms_of_services.title,
    description: _metadata.terms_of_services.description,
    keywords: _metadata.terms_of_services.keywords.join(', '),
    openGraph: {
        title: 'HormigaDev - ' + _metadata.terms_of_services.title,
        description: _metadata.terms_of_services.description,
        images: `${host}/logo.png`,
        url: `${host}`,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HormigaDev - ' + _metadata.terms_of_services.title,
        description: _metadata.terms_of_services.description,
        images: `${host}/logo.png`,
    },
    authors: [{ name: 'Isaí Medina', url: 'portfolio.hormiga.dev' }],
};

const TermsOfService = () => {
    return (
        <RootLayout>
            <section className="px-8 md:px-32 sm:px-12 lg:px-48 py-8 bg-secondary-dark text-foreground">
                <h1 className="text-4xl font-bold mb-8 text-center">Términos de Servicio</h1>

                <p className="text-justify mb-4">
                    Al acceder y utilizar este blog, aceptas los siguientes términos y condiciones.
                    Si no estás de acuerdo con estos términos, te pedimos que abandones este sitio.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Uso del Contenido</h2>
                <p className="text-justify mb-4">
                    Todo el contenido de este blog, incluyendo textos, imágenes, ejemplos de
                    comandos de bots de Discord y demás material educativo, está destinado a fines
                    informativos y educativos. El contenido no debe ser utilizado para fines
                    comerciales sin el permiso explícito del propietario del blog.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Política de Privacidad</h2>
                <p className="text-justify mb-4">
                    Al utilizar este blog, aceptas nuestra{' '}
                    <Link href="/privacy-policy" className="text-primary hover:underline">
                        Política de Privacidad
                    </Link>
                    , la cual detalla cómo recopilamos, utilizamos y protegemos tus datos
                    personales. Asegúrate de leerla antes de continuar usando el sitio.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Anuncios de Google Adsense</h2>
                <p className="text-justify mb-4">
                    Este blog puede mostrar anuncios de Google Adsense, los cuales pueden recopilar
                    información de tu navegador y dispositivo para personalizar los anuncios que se
                    te muestran. Google puede usar cookies y otras tecnologías para mostrar anuncios
                    según tu interacción con este y otros sitios.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Google Analytics</h2>
                <p className="text-justify mb-4">
                    Este blog utiliza Google Analytics para analizar el tráfico web y mejorar la
                    experiencia del usuario. Google Analytics recopila información sobre el uso del
                    sitio, como las páginas que visitas y el tiempo que pasas en ellas. Esta
                    información es anónima y se utiliza solo para mejorar el contenido y la
                    funcionalidad del sitio.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    5. Modificación de los Términos
                </h2>
                <p className="text-justify mb-4">
                    Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier
                    momento. Las modificaciones serán publicadas en esta misma página y estarán
                    vigentes en el momento de su publicación. Es tu responsabilidad revisar
                    periódicamente estos términos para estar al tanto de cualquier cambio.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    6. Limitación de Responsabilidad
                </h2>
                <p className="text-justify mb-4">
                    El propietario de este blog no se hace responsable de los daños directos o
                    indirectos derivados del uso del contenido del blog o de los servicios
                    ofrecidos, incluyendo la interacción con los anuncios de Google Adsense y los
                    datos recopilados por Google Analytics.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Aceptación de los Términos</h2>
                <p className="text-justify mb-4">
                    Al utilizar este blog, aceptas estos Términos de Servicio. Si no estás de
                    acuerdo con alguno de estos términos, por favor, abandona el sitio y no uses
                    nuestros servicios.
                </p>
            </section>
        </RootLayout>
    );
};

export default TermsOfService;
