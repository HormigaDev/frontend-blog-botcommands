const Footer = () => {
    return (
        <footer className="bg-secondary-dark text-neutral-dark py-8 mt-4">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center md:flex-row justify-between">
                {/* Información del footer */}
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-white mb-2">HormigaDev</h3>
                    <p className="text-neutral mb-4">Ejemplos de comandos de bots de Discord</p>
                    <div className="flex justify-center md:justify-start space-x-6 mb-4">
                        {/* Enlaces de redes sociales */}
                        <a
                            href="https://discord.gg/tu-enlace"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-primary transition-colors"
                        >
                            Discord
                        </a>
                        <a
                            href="https://youtube.com/tu-canal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-primary transition-colors"
                        >
                            YouTube
                        </a>
                    </div>
                    <div className="flex justify-center md:justify-start space-x-6">
                        {/* Enlaces adicionales */}
                        <a
                            href="/privacy-policy"
                            className="text-neutral hover:text-white transition-colors"
                        >
                            Política de privacidad
                        </a>
                        <a
                            href="/terms-of-service"
                            className="text-neutral hover:text-white transition-colors"
                        >
                            Términos de servicio
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 md:mt-0 text-center text-sm text-neutral">
                    <p>
                        &copy; {new Date().getFullYear()} HormigaDev. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
