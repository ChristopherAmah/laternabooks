import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../context/StoreContext";

const CartToast = () => {
  const { notification } = useStore();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50 rounded-lg bg-orange-700 px-4 py-2 text-sm text-white shadow-lg"
        >
          {notification}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartToast;
