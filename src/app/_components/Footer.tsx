'use client';

import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-secondary-dark text-neutral-dark py-8 mt-4 block px-8 mb-8">
            <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row justify-between">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-white mb-2">HormigaDev</h3>
                    <p className="text-neutral mb-4">Ejemplos de comandos de bots de Discord</p>
                    <div className="flex justify-center md:justify-start space-x-6 mb-4">
                        <p>
                            ¿Tienes dudas o buscas más contenido? Visita nuestro&nbsp;&nbsp;
                            <a
                                href="https://www.youtube.com/@HormigaDev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-primary transition-colors underline"
                            >
                                <i className="fa fa-brands fa-youtube mr-1" />
                                Canal de YouTube
                            </a>
                            . &nbsp; Si prefieres ayuda directa o tienes ideas para mejorar, únete a
                            nuestra&nbsp;&nbsp;
                            <a
                                href="https://discord.gg/Rx5Db2WBF3"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-primary transition-colors underline"
                            >
                                <i className="fa fa-brands fa-discord mr-1" />
                                Comunidad de Discord
                            </a>
                            . ¡Nos encantaría conocerte!
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-start space-x-6">
                        <Link
                            href="/privacy-policy"
                            className="text-neutral underline transition-colors hover:text-primary"
                        >
                            Política de privacidad
                        </Link>
                        <Link
                            href="/terms-of-service"
                            className="text-neutral underline transition-colors hover:text-primary"
                        >
                            Términos de servicio
                        </Link>
                    </div>
                </div>

                <div className="mt-8 md:mt-0 text-center text-sm text-neutral pl-12">
                    <p>
                        &copy; {new Date().getFullYear()} HormigaDev. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
