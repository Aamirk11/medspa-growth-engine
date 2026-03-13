"use client";

import { motion } from "framer-motion";

const integrations = [
  { name: "Boulevard", color: "from-violet-500 to-purple-600" },
  { name: "Zenoti", color: "from-blue-500 to-cyan-600" },
  { name: "Vagaro", color: "from-pink-500 to-rose-600" },
  { name: "Google Business", color: "from-red-500 to-orange-500" },
  { name: "Yelp", color: "from-red-600 to-red-500" },
  { name: "Twilio", color: "from-red-500 to-pink-600" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function IntegrationsBar() {
  return (
    <section className="border-b border-border/40 bg-muted/30 py-12 dark:bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Integrates with your favorite tools
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {integrations.map((integration) => (
            <motion.div
              key={integration.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group relative"
            >
              <div className="relative flex items-center gap-2 rounded-xl border border-border/60 bg-white/80 px-5 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-teal-300 hover:shadow-md dark:bg-card/80 dark:hover:border-teal-700">
                {/* Colored dot indicator */}
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br opacity-40 transition-opacity duration-300 group-hover:opacity-100 ${integration.color}`}
                />
                <span className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {integration.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
