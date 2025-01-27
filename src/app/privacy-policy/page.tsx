import Link from 'next/link';
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="px-8 md:px-32 sm:px-12 lg:px-48 py-8 bg-secondary-dark text-foreground">
            <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidad</h1>
            <p className="text-justify mt-8 mb-8">
                Esta Política de Privacidad describe cómo se recopila, utiliza y protege tu
                información cuando utilizas nuestro blog y servicios asociados. Tu privacidad es muy
                importante para nosotros y estamos comprometidos a protegerla.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Información que Recopilamos</h2>
            <p className="text-justify mt-8 mb-8">
                Recopilamos información no personal relacionada con la actividad en nuestro sitio,
                como la ubicación geográfica aproximada, el tipo de dispositivo y el navegador
                utilizado. También podemos recopilar información sobre las páginas visitadas, los
                enlaces en los que haces clic y el tiempo que pasas en cada página, utilizando
                herramientas como Google Analytics.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Uso de la Información</h2>
            <p className="text-justify mt-8 mb-8">
                La información recopilada es utilizada principalmente para mejorar la experiencia de
                usuario en el blog, mejorar la funcionalidad y el rendimiento del sitio, y realizar
                análisis sobre el comportamiento de los usuarios. Además, los datos recopilados
                pueden ser utilizados para mejorar los contenidos ofrecidos y personalizar la
                experiencia de navegación.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies</h2>
            <p className="text-justify mt-8 mb-8">
                Utilizamos cookies para mejorar la experiencia del usuario. Las cookies son pequeños
                archivos de texto que se almacenan en tu dispositivo y que nos permiten recordar tus
                preferencias o realizar un seguimiento de tus interacciones con el sitio. Si lo
                prefieres, puedes configurar tu navegador para que rechace las cookies o te avise
                antes de aceptarlas. Sin embargo, debes saber que algunas funciones del sitio
                podrían no funcionar correctamente si desactivas las cookies.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Google Analytics</h2>
            <p className="text-justify mt-8 mb-8">
                Utilizamos Google Analytics, un servicio de análisis web proporcionado por Google
                Inc. Google Analytics utiliza cookies para analizar cómo los usuarios interactúan
                con el sitio web. La información generada por la cookie sobre el uso del sitio (como
                la dirección IP) se transmite a Google y se almacena en sus servidores. Puedes
                desactivar el seguimiento de Google Analytics mediante la configuración de tu
                navegador o utilizando complementos de desactivación disponibles en línea.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Seguridad</h2>
            <p className="text-justify mt-8 mb-8">
                Tomamos medidas razonables para proteger la información personal de los usuarios
                contra accesos no autorizados, alteraciones, divulgación o destrucción. Sin embargo,
                debes tener en cuenta que ninguna transmisión de datos a través de Internet es
                completamente segura, por lo que no podemos garantizar la seguridad absoluta de la
                información transmitida.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Compartición de Información</h2>
            <p className="text-justify mt-8 mb-8">
                No compartimos ni vendemos la información personal recopilada a terceros. Sin
                embargo, podemos compartir datos agregados y anónimos con socios comerciales, con el
                fin de mejorar el contenido del blog y optimizar la experiencia del usuario, pero
                esta información nunca incluye datos personales identificables.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cambios en la Política</h2>
            <p className="text-justify mt-8 mb-8">
                Nos reservamos el derecho de actualizar o modificar esta Política de Privacidad en
                cualquier momento. Los cambios serán efectivos inmediatamente después de su
                publicación en esta página. Te recomendamos que revises periódicamente esta política
                para estar al tanto de cualquier cambio.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contacto</h2>
            <p className="text-justify mt-8 mb-8">
                Si tienes alguna pregunta sobre nuestra Política de Privacidad o sobre cómo tratamos
                tu información personal, no dudes en contactarnos a través de la siguiente dirección
                de correo electrónico:&nbsp;
                <Link
                    href="mailto:hormigadev7@gmail.com"
                    className="text-primary underline hover:text-primary-dark"
                >
                    hormigadev7@gmail.com
                </Link>
                .
            </p>
        </div>
    );
};

export default PrivacyPolicy;
