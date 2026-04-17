import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
    Mail,
    ChevronRight,
    ChevronLeft,
    ArrowUpRight,
    GraduationCap,
    MapPin,
    Sparkles,
    Code,
    Wifi,
    Wrench,
    Box,
    ImageIcon,
    X
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useRef, useState } from "react";

/* ───── data ───── */

const PROJECTS = [
    {
        title: "Gömülü Sistemler & IoT",
        subtitle: "ESP32-C6 Ekosistemi",
        description: "ESP32-C6 ve LVGL ile donanım arayüzleri yazdığım, Contiki-NG ile ağ protokolleri ve optimizasyonlar geliştirdiğim gömülü sistem çalışmaları.",
        tech: ["C/C++", "ESP-IDF", "LVGL", "Contiki-NG", "IoT"],
        github: "https://github.com/AkerimC",
        color: "from-violet-500/20 to-fuchsia-500/10",
        screenshots: []
    },
    {
        title: "StegoLagrange",
        subtitle: "Görsel Steganografi Sistemi",
        description: "Görsellerin içine veri saklamak için Lagrange interpolasyonu kullanan bir algoritma. Ayrıca resim kalitesini test eden PSNR ölçümü de var.",
        tech: ["Python", "Steganography", "Algorithms"],
        github: "https://github.com/AkerimC/steganografi-gorsele-gorsel-saklama",
        color: "from-amber-500/20 to-orange-500/10",
        screenshots: ["/screenshots/steganografi-gorsel.png", "/screenshots/steganografi-gorsel1.png", "/screenshots/steganografi-gorsel2.png"]
    },
    {
        title: "Neural Networks",
        subtitle: "Sıfırdan C++ ile YSA",
        description: "Hiçbir hazır ML kütüphanesi kullanmadan, sıfırdan yazdığım MLP ve Autoencoder sinir ağları. Geri yayılım (backprop) algoritmaları dahil tamamen el yapımı.",
        tech: ["C++", "Machine Learning", "Math"],
        github: "https://github.com/AkerimC/Yapay-Sinir-A-",
        color: "from-emerald-500/20 to-teal-500/10",
        screenshots: ["/screenshots/YSA_Mnist.png", "/screenshots/YSA_Regression.png", "/screenshots/YSA_classification.png"]
    },
    {
        title: "Procedural World",
        subtitle: "Dünya Simülasyonu",
        description: "Raylib kullanarak geliştirdiğim top-down bir simülasyon. Harita tamamen prosedürel üretiliyor; içinde hava durumu ve mevsim döngüleri var.",
        tech: ["C++", "Raylib", "Simulation"],
        github: "https://github.com/AkerimC/Simulasyon",
        color: "from-indigo-500/20 to-purple-500/10",
        screenshots: ["/screenshots/world_generator.png", "/screenshots/world_generator1.png"]
    },
    {
        title: "RISC-V Sieve",
        subtitle: "Asal Sayı Bulucu",
        description: "C koduyla RISC-V Assembly dilini birleştirip Eratosthenes Eleği algoritmasını yazdım. Performans için doğrudan register seviyesinde çalışıyor.",
        tech: ["C", "RISC-V Assembly", "Low-level"],
        github: "https://github.com/AkerimC/riscv-sieve-of-eratosthenes",
        color: "from-cyan-500/20 to-blue-500/10",
        screenshots: []
    },
    {
        title: "Route Mate",
        subtitle: "Sosyal Planlama Uygulaması",
        description: "Kullanıcıların harita üzerinde eş zamanlı etkileşime girip ortak rotalar çizebildiği, Leaflet kullanan web uygulaması.",
        tech: ["React", "Sequelize", "Leaflet"],
        github: "https://github.com/AkerimC/RouteMate",
        color: "from-rose-500/20 to-pink-500/10",
        screenshots: ["/screenshots/routemate.png", "/screenshots/routemate2.png", "/screenshots/route mate3.png"]
    },
    {
        title: "StegoCipher",
        subtitle: "Şifreli Mesajlaşma Uygulaması",
        description: "Şifreleme ve Steganografi kavramlarını birleştiren, verileri resimler arasına saklayarak güvenli mesajlaşma sunan bir uygulama.",
        tech: ["Python", "Cryptography", "Steganography", "Networking"],
        github: "https://github.com/egeyolsal/StegoCipher",
        color: "from-violet-500/20 to-fuchsia-500/10",
        screenshots: ["/screenshots/stegocipher.png", "/screenshots/stegocipher1.png", "/screenshots/stegocipher2.png"]
    }
];

const SKILLS = [
    {
        category: "Languages",
        icon: Code,
        items: ["C/C++", "Python", "Assembly (RISC-V/x86)", "JavaScript"]
    },
    {
        category: "Embedded / IoT",
        icon: Wifi,
        items: ["ESP32-C6", "Contiki-NG", "LVGL", "ESP-IDF", "LoRa", "6TiSCH"]
    },
    {
        category: "Systems / Tools",
        icon: Wrench,
        items: ["Linux (EndeavourOS)", "Hyprland", "Git/Github", "Raylib"]
    },
    {
        category: "Frameworks",
        icon: Box,
        items: ["React", "React Native", "Sequelize", "Leaflet"]
    }
];

/* ───── components ───── */

function TerminalBlock({ children, title = "~/" }: { children: React.ReactNode; title?: string }) {
    return (
        <div className="glass sleek-border rounded-lg overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-brand-border bg-brand-surface/40">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[10px] font-mono text-text-muted ml-2">{title}</span>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

function TypewriterLine({ prefix, text, delay = 0 }: { prefix: string; text: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="flex gap-2 font-mono text-sm"
        >
            <span className="text-brand-accent shrink-0">{prefix}</span>
            <span className="text-text-main">{text}</span>
        </motion.div>
    );
}

function ScreenshotCarousel({ screenshots, onImageClick }: { screenshots: string[], onImageClick: (img: string) => void }) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    if (screenshots.length === 0) {
        return (
            <div className="h-48 bg-gradient-to-br from-brand-surface/80 to-brand-bg flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-text-dim">
                    <ImageIcon className="w-8 h-8 opacity-40" />
                    <span className="text-[10px] font-mono">Görsel yok</span>
                </div>
            </div>
        );
    }

    const paginate = (newDir: number) => {
        setDirection(newDir);
        setCurrent((prev) => (prev + newDir + screenshots.length) % screenshots.length);
    };

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0 }),
    };

    return (
        <div className="relative h-48 overflow-hidden bg-brand-bg/50 group/carousel">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                    key={current}
                    src={screenshots[current]}
                    alt="Project screenshot"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover object-top cursor-zoom-in"
                    onClick={() => onImageClick(screenshots[current])}
                />
            </AnimatePresence>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/70 via-transparent to-transparent pointer-events-none" />

            {screenshots.length > 1 && (
                <>
                    {/* Nav buttons */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full glass sleek-border flex items-center justify-center text-text-muted hover:text-brand-accent opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer z-10"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full glass sleek-border flex items-center justify-center text-text-muted hover:text-brand-accent opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer z-10"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {screenshots.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-brand-accent w-4" : "bg-text-dim/50 hover:bg-text-muted"}`}
                            />
                        ))}
                    </div>

                    {/* Counter */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 glass sleek-border rounded-full text-[9px] font-mono text-text-muted z-10">
                        {current + 1}/{screenshots.length}
                    </div>
                </>
            )}
        </div>
    );
}

/* ───── main app ───── */

export default function App() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const handleLightboxNext = () => {
        if (!lightboxImage) return;
        for (const p of PROJECTS) {
            const idx = p.screenshots.indexOf(lightboxImage);
            if (idx !== -1) {
                const nextIdx = (idx + 1) % p.screenshots.length;
                setLightboxImage(p.screenshots[nextIdx]);
                return;
            }
        }
    };

    const handleLightboxPrev = () => {
        if (!lightboxImage) return;
        for (const p of PROJECTS) {
            const idx = p.screenshots.indexOf(lightboxImage);
            if (idx !== -1) {
                const prevIdx = (idx - 1 + p.screenshots.length) % p.screenshots.length;
                setLightboxImage(p.screenshots[prevIdx]);
                return;
            }
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-brand-bg text-text-main scanlines">
            {/* Background layers */}
            <div className="fixed inset-0 custom-grid pointer-events-none z-0" />
            <motion.div
                style={{ y: bgY }}
                className="fixed inset-0 pointer-events-none z-0"
            >
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-violet-900/8 blur-[120px]" />
                <div className="absolute top-[60%] right-[10%] w-[400px] h-[400px] rounded-full bg-fuchsia-900/6 blur-[100px]" />
                <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-purple-900/5 blur-[80px]" />
            </motion.div>

            {/* Floating particles */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-brand-accent/30 animate-float"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i * 13) % 60}%`,
                            animationDelay: `${i * 1.2}s`,
                            animationDuration: `${5 + i * 1.5}s`
                        }}
                    />
                ))}
            </div>

            {/* ─── NAVIGATION ─── */}
            <nav className="sticky top-0 z-50 glass border-b border-brand-border">
                <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                    <motion.a
                        href="#"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 group no-underline"
                    >
                        <div className="w-7 h-7 bg-brand-accent/20 border border-brand-accent/40 text-brand-accent flex items-center justify-center font-mono font-bold rounded text-xs group-hover:bg-brand-accent/30 transition-all">
                            $
                        </div>
                        <span className="font-mono text-sm text-text-muted group-hover:text-brand-accent transition-colors">
                            abdulkerim<span className="text-brand-accent">@</span>portfolio
                        </span>
                    </motion.a>

                    <div className="hidden md:flex items-center gap-1">
                        {["about", "skills", "projects", "contact"].map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-text-muted hover:text-brand-accent hover:bg-brand-accent/5 rounded transition-all no-underline"
                            >
                                <span className="text-brand-accent/40 mr-1">/</span>{item}
                            </motion.a>
                        ))}
                    </div>

                    <motion.a
                        href="https://github.com/AkerimC"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-brand-accent transition-colors no-underline"
                    >
                        <FaGithub className="w-5 h-5" />
                    </motion.a>
                </div>
            </nav>

            <main className="relative z-10">
                {/* ─── HERO ─── */}
                <section id="about" className="max-w-6xl mx-auto px-6 pt-20 pb-32">
                    <div className="grid lg:grid-cols-[1fr,420px] gap-16 items-start">
                        <div className="space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="space-y-6"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 glass sleek-border rounded-full">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                    </span>
                                    <span className="text-[11px] font-mono text-text-muted">İş birliğine açık</span>
                                </div>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                                    <span className="text-text-main">Abdulkerim</span>
                                    <br />
                                    <span className="text-gradient">Çiçek</span>
                                    <span className="cursor-blink text-brand-accent ml-1">_</span>
                                </h1>

                                <p className="text-base text-text-muted max-w-lg leading-relaxed">
                                    Karadeniz Teknik Üniversitesi Bilgisayar Mühendisliği öğrencisiyim.{" "}
                                    Özellikle <span className="text-text-main">low-level (C/C++, Assembly)</span> ve{" "}
                                    gömülü sistemler alanına ilgi duyuyorum. İşin arka planında, donanım seviyesinde neler olup bittiğini anlamayı seviyorum.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap items-center gap-4"
                            >
                                <a
                                    href="#projects"
                                    className="group px-6 py-3 bg-brand-accent/15 border border-brand-accent/30 text-brand-accent-bright font-mono font-semibold rounded-lg hover:bg-brand-accent/25 hover:border-brand-accent/50 transition-all active:scale-95 flex items-center gap-2 no-underline text-sm glow-accent"
                                >
                                    Projeleri Gör
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                                <a
                                    href="https://github.com/AkerimC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 glass sleek-border text-text-muted font-mono text-sm rounded-lg hover:text-text-main hover:border-brand-accent/30 transition-all flex items-center gap-2 no-underline"
                                >
                                    <FaGithub className="w-4 h-4" />
                                    GitHub
                                </a>
                            </motion.div>


                        </div>

                        {/* Terminal card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, rotateY: -5 }}
                            animate={{ opacity: 1, y: 0, rotateY: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="hidden lg:block"
                        >
                            <TerminalBlock title="~/about — fish">
                                <div className="space-y-3">
                                    <TypewriterLine prefix="$" text="fastfetch" delay={0.5} />
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.0 }}
                                        className="mt-4 space-y-2 text-xs font-mono"
                                    >
                                        <div className="text-brand-accent/60 mb-3 whitespace-pre leading-tight text-[10px]">
{`   _____ ____ 
  / ___ / ___|
 | |   | |    
 | |___| |___ 
  \\____|\\____|`}
                                        </div>
                                        {[
                                            { icon: "👤", k: "user", v: "abdulkerim" },
                                            { icon: "🎓", k: "uni", v: "KTÜ / Bilgisayar Müh." },
                                            { icon: "📊", k: "gpa", v: "2.93 / 4.00" },
                                            { icon: "🐧", k: "os", v: "EndeavourOS (Hyprland)" },
                                            { icon: "🐚", k: "shell", v: "fish" },
                                            { icon: "💻", k: "focus", v: "Low-level & Embedded" },
                                            { icon: "🌐", k: "lang", v: "TR (native) / EN (B2)" },
                                        ].map((row, i) => (
                                            <motion.div
                                                key={row.k}
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.2 + i * 0.1 }}
                                                className="flex gap-2"
                                            >
                                                <span>{row.icon}</span>
                                                <span className="text-brand-accent w-14">{row.k}</span>
                                                <span className="text-text-muted">{row.v}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2.2 }}
                                        className="flex gap-2 font-mono text-sm pt-3"
                                    >
                                        <span className="text-brand-accent">$</span>
                                        <span className="cursor-blink text-brand-accent">▊</span>
                                    </motion.div>
                                </div>
                            </TerminalBlock>
                        </motion.div>
                    </div>
                </section>

                {/* ─── SKILLS ─── */}
                <section id="skills" className="py-24 border-y border-brand-border relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-surface/30" />
                    <div className="max-w-6xl mx-auto px-6 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-accent block mb-3">
                                // teknik yetkinlikler
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Alet <span className="text-gradient">Çantam</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {SKILLS.map((skill, idx) => (
                                <motion.div
                                    key={skill.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glass sleek-border rounded-xl p-6 hover:border-brand-accent/30 transition-all duration-300 group"
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">0{idx + 1}</span>
                                        <skill.icon className="w-4 h-4 text-brand-accent/60 group-hover:text-brand-accent transition-colors" />
                                    </div>
                                    <h3 className="font-mono text-sm font-semibold text-text-main mb-4">{skill.category}</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skill.items.map(item => (
                                            <span
                                                key={item}
                                                className="font-mono text-[10px] px-2 py-1 rounded bg-brand-accent/5 border border-brand-accent/10 text-text-muted hover:text-brand-accent hover:border-brand-accent/25 transition-all cursor-default"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Marquee */}
                        <div className="mt-20 flex gap-12 whitespace-nowrap overflow-hidden py-4 border-y border-brand-border/50 opacity-[0.06] select-none">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex gap-12 items-center font-mono text-3xl font-bold uppercase tracking-tighter animate-marquee">
                                    <span>Computer Engineering</span>
                                    <span className="text-brand-accent">◆</span>
                                    <span>Embedded Systems</span>
                                    <span className="text-brand-accent">◆</span>
                                    <span>Low-Level Programming</span>
                                    <span className="text-brand-accent">◆</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── EDUCATION ─── */}
                <section className="py-20 max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-accent block mb-3">
                            // eğitim
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Akademik <span className="text-gradient">Geçmiş</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass sleek-border rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start"
                    >
                        <div className="w-14 h-14 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-6 h-6 text-brand-accent" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                                <h3 className="text-lg font-bold text-text-main">Karadeniz Teknik Üniversitesi</h3>
                                <span className="px-2 py-0.5 text-[10px] font-mono bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20 w-fit">
                                    2022 – Devam Ediyor
                                </span>
                            </div>
                            <p className="text-text-muted text-sm mb-3">Bilgisayar Mühendisliği Bölümü</p>
                            <div className="flex items-center gap-6 text-xs font-mono text-text-dim">
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3" />
                                    Trabzon, TR
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-brand-accent" />
                                    <span>GPA: <span className="text-text-main">2.93 / 4.00</span></span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ─── PROJECTS ─── */}
                <section id="projects" className="py-24 border-t border-brand-border">
                    <div className="max-w-6xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-accent block mb-3">
                                // mühendislik vitrini
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Öne Çıkan <span className="text-gradient">Projeler</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {PROJECTS.map((project, idx) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.08 }}
                                    viewport={{ once: true }}
                                    className="group glass sleek-border rounded-xl overflow-hidden hover:border-brand-accent/30 transition-all duration-500 card-glow flex flex-col"
                                >
                                    {/* Screenshot carousel */}
                                    <ScreenshotCarousel screenshots={project.screenshots} onImageClick={setLightboxImage} />

                                    <div className="p-5 flex flex-col flex-1">
                                        <p className="text-[10px] font-mono text-brand-accent/80 uppercase tracking-widest mb-1">{project.subtitle}</p>
                                        <h3 className="text-lg font-bold text-text-main group-hover:text-brand-accent-bright transition-colors leading-tight mb-3">
                                            {project.title}
                                        </h3>

                                        <p className="text-text-muted text-xs leading-relaxed flex-1 mb-4">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.tech.map(t => (
                                                <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-accent/8 border border-brand-accent/10 text-brand-accent/80">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 w-full py-2.5 glass sleek-border rounded-lg flex items-center justify-center gap-2 text-xs font-mono text-text-main hover:bg-brand-accent/10 hover:text-brand-accent-bright hover:border-brand-accent/30 transition-all no-underline group/link"
                                        >
                                            <FaGithub className="w-4 h-4" />
                                            Kaynak Kod
                                            <ArrowUpRight className="w-4 h-4 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CONTACT ─── */}
                <section id="contact" className="py-24 border-t border-brand-border">
                    <div className="max-w-6xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-lg mx-auto"
                        >
                            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-accent block mb-3">
                                // iletişim
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                                Birlikte <span className="text-gradient">Çalışalım</span>
                            </h2>
                            <p className="text-text-muted text-sm leading-relaxed mb-10">
                                Staj fırsatları, projeler veya donanım/yazılım sohbetleri için bana e-posta üzerinden ulaşabilirsiniz.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="mailto:akerimcicek159@gmail.com"
                                    className="group px-8 py-4 bg-brand-accent/15 border border-brand-accent/30 rounded-xl font-mono text-sm text-brand-accent-bright hover:bg-brand-accent/25 hover:border-brand-accent/50 transition-all glow-accent flex items-center justify-center gap-3 no-underline"
                                >
                                    <Mail className="w-4 h-4" />
                                    akerimcicek159@gmail.com
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                                <a
                                    href="https://github.com/AkerimC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 glass sleek-border rounded-xl font-mono text-sm text-text-muted hover:text-text-main hover:border-brand-accent/30 transition-all flex items-center justify-center gap-3 no-underline"
                                >
                                    <FaGithub className="w-4 h-4" />
                                    github.com/AkerimC
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* Bottom fade */}
            <div className="h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
            <div className="py-8 text-center">
                <p className="text-[10px] font-mono text-text-dim">
                    <span className="text-brand-accent/40">$</span> echo "Designed & built by Abdulkerim Çiçek"
                </p>
            </div>
            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
                    >
                        <button
                            onClick={() => setLightboxImage(null)}
                            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-[110]"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        
                        {(() => {
                            const project = PROJECTS.find(p => p.screenshots.includes(lightboxImage));
                            if (project && project.screenshots.length > 1) {
                                return (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleLightboxPrev(); }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 glass sleek-border rounded-full hover:bg-white/10 transition-all z-[110]"
                                        >
                                            <ChevronLeft className="w-8 h-8" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleLightboxNext(); }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 glass sleek-border rounded-full hover:bg-white/10 transition-all z-[110]"
                                        >
                                            <ChevronRight className="w-8 h-8" />
                                        </button>
                                    </>
                                );
                            }
                            return null;
                        })()}

                        <motion.img
                            key={lightboxImage}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={lightboxImage}
                            alt="Enlarged screenshot"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl relative z-[105]"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
