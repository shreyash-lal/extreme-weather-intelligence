import { motion, AnimatePresence } from "framer-motion";

const AIInsightPanel = ({ insight, show, onClose, loading }) => {
  return (
    <AnimatePresence>
      {show && insight && (
        <motion.div
          key="ai-panel"
          initial={{
            opacity: 0,
            x: window.innerWidth >= 768 ? 300 : 0,
            y: window.innerWidth < 768 ? 200 : 0,
          }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{
            opacity: 0,
            x: window.innerWidth >= 768 ? 300 : 0,
            y: window.innerWidth < 768 ? 200 : 0,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="
            fixed z-70 bg-white shadow-2xl rounded-2xl p-4
            w-[92vw] max-w-[380px]
            bottom-4 left-1/2 -translate-x-1/2
            md:bottom-auto md:top-20 md:left-auto md:right-4 md:translate-x-0
          "
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-green-700">
              AI Weather Insight
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-green-700 text-xl"
            >
              ✕
            </button>
          </div>

          {/* CONTENT */}
          <div className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700 max-h-[50vh] overflow-y-auto">
            {loading ? "Loading..." : insight}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIInsightPanel;
