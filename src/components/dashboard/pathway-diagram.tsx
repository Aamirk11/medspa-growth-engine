"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface PathwayNode {
  id: string;
  label: string;
  sublabel?: string;
  revenue?: string;
  type: "start" | "treatment" | "decision" | "outcome" | "upsell" | "ongoing";
}

const nodes: PathwayNode[] = [
  {
    id: "consult",
    label: "New Client Consultation",
    sublabel: "Initial assessment",
    revenue: "$150",
    type: "start",
  },
  {
    id: "botox",
    label: "Botox Initial Treatment",
    sublabel: "First session",
    revenue: "$425",
    type: "treatment",
  },
  {
    id: "followup",
    label: "Follow-up at 2 Weeks",
    sublabel: "Satisfaction check",
    type: "decision",
  },
  {
    id: "satisfied",
    label: "Satisfied",
    sublabel: "Rebook at 3 months",
    revenue: "$425",
    type: "outcome",
  },
  {
    id: "adjust",
    label: "Needs Adjustment",
    sublabel: "Schedule touch-up",
    revenue: "$150",
    type: "outcome",
  },
  {
    id: "upsell",
    label: "Upsell: Dermal Fillers",
    sublabel: "Complementary treatment",
    revenue: "$650",
    type: "upsell",
  },
  {
    id: "ongoing",
    label: "Quarterly Maintenance",
    sublabel: "Ongoing care plan",
    revenue: "$1,700/yr",
    type: "ongoing",
  },
];

const nodeStyles: Record<string, string> = {
  start:
    "bg-teal-500 text-white border-teal-600 dark:bg-teal-600 dark:border-teal-500",
  treatment:
    "bg-white text-foreground border-teal-300 dark:bg-card dark:border-teal-700",
  decision:
    "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
  outcome:
    "bg-white text-foreground border-gray-200 dark:bg-card dark:border-gray-700",
  upsell:
    "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
  ongoing:
    "bg-teal-50 text-teal-800 border-teal-300 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function Arrow({ color = "teal" }: { color?: "teal" | "green" | "orange" }) {
  const colorClasses = {
    teal: "border-teal-400 dark:border-teal-600",
    green: "border-green-400 dark:border-green-600",
    orange: "border-amber-400 dark:border-amber-600",
  };

  const arrowColor = {
    teal: "text-teal-400 dark:text-teal-600",
    green: "text-green-400 dark:text-green-600",
    orange: "text-amber-400 dark:text-amber-600",
  };

  return (
    <div className="flex flex-col items-center py-1">
      <div className={`h-5 w-0 border-l-2 border-dashed ${colorClasses[color]}`} />
      <svg
        className={`h-3 w-3 ${arrowColor[color]}`}
        viewBox="0 0 12 12"
        fill="currentColor"
      >
        <path d="M6 9L1 4h10L6 9z" />
      </svg>
    </div>
  );
}

function NodeCard({ node }: { node: PathwayNode }) {
  const isStart = node.type === "start";
  const isDecision = node.type === "decision";

  return (
    <motion.div variants={nodeVariants} className="flex justify-center">
      <div
        className={`
          relative border-2 px-5 py-3 shadow-sm transition-shadow hover:shadow-md
          ${isStart ? "rounded-full" : isDecision ? "rounded-xl rotate-0" : "rounded-xl"}
          ${nodeStyles[node.type]}
          min-w-[200px] max-w-[260px] text-center
        `}
      >
        {isDecision && (
          <div className="absolute -left-1 -top-1 h-3 w-3 rounded-full bg-blue-400 dark:bg-blue-500" />
        )}
        <p className={`text-sm font-semibold ${isStart ? "" : ""}`}>
          {node.label}
        </p>
        {node.sublabel && (
          <p className={`text-xs mt-0.5 ${isStart ? "text-teal-100" : "text-muted-foreground"}`}>
            {node.sublabel}
          </p>
        )}
        {node.revenue && (
          <span className={`
            inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full
            ${node.type === "upsell"
              ? "bg-amber-200/60 text-amber-800 dark:bg-amber-800/40 dark:text-amber-300"
              : node.type === "start"
                ? "bg-white/20 text-white"
                : "bg-teal-100 text-teal-700 dark:bg-teal-800/40 dark:text-teal-300"
            }
          `}>
            {node.revenue}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function PathwayDiagram() {
  return (
    <Card>
      <CardContent className="p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Start */}
          <NodeCard node={nodes[0]} />
          <Arrow />

          {/* Botox treatment */}
          <NodeCard node={nodes[1]} />
          <Arrow />

          {/* Decision */}
          <NodeCard node={nodes[2]} />

          {/* Branching */}
          <div className="flex items-start gap-4 sm:gap-8 mt-1">
            {/* Satisfied branch */}
            <div className="flex flex-col items-center">
              <Arrow color="green" />
              <NodeCard node={nodes[3]} />
            </div>

            {/* Needs adjustment branch */}
            <div className="flex flex-col items-center">
              <Arrow color="orange" />
              <NodeCard node={nodes[4]} />
            </div>
          </div>

          {/* Merge back */}
          <div className="flex items-start gap-4 sm:gap-8 w-full justify-center mt-1">
            <div className="flex flex-col items-center">
              <div className="h-5 w-0 border-l-2 border-dashed border-teal-400 dark:border-teal-600" />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-5 w-0 border-l-2 border-dashed border-teal-400 dark:border-teal-600" />
            </div>
          </div>

          {/* Connecting horizontal line */}
          <div className="w-40 sm:w-56 h-0 border-t-2 border-dashed border-teal-400 dark:border-teal-600" />
          <div className="h-5 w-0 border-l-2 border-dashed border-teal-400 dark:border-teal-600" />
          <svg
            className="h-3 w-3 text-teal-400 dark:text-teal-600"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path d="M6 9L1 4h10L6 9z" />
          </svg>

          {/* Upsell */}
          <NodeCard node={nodes[5]} />
          <Arrow />

          {/* Ongoing */}
          <NodeCard node={nodes[6]} />
        </motion.div>
      </CardContent>
    </Card>
  );
}
