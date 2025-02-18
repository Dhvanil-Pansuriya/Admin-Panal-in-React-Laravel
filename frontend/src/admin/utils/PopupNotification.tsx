import { CheckCircle, X } from 'lucide-react'; // Import Lucide icons
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

// Define types for props
interface User {
  name: string;
}

interface PopupNotificationProps {
  showPopup: boolean;
  deletedUser?: User | null;
  updateMessage?: string | null;
  onClose: () => void;
}

const PopupNotification: React.FC<PopupNotificationProps> = ({
  showPopup,
  deletedUser,
  updateMessage,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(showPopup);

  useEffect(() => {
    if (showPopup) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose(); // Close the popup after a delay
      }, 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showPopup, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4"
          initial={{ opacity: 0, y: 20 }} // Initial state (hidden)
          animate={{ opacity: 1, y: 0 }} // Animate in
          exit={{ opacity: 0, y: 20 }} // Animate out
          transition={{ duration: 0.3, ease: 'easeInOut' }} // Smooth transition
        >
          <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4 opacity-95 ">
            <CheckCircle className="h-6 w-6 text-green-400" /> {/* Lucide icon */}
            <span className="flex-1">
              {deletedUser ? `User ${deletedUser.name} deleted successfully!` : updateMessage}
            </span>
            <button
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Close notification"
            >
              <X className="h-5 w-5 text-gray-400" /> {/* Lucide close icon */}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupNotification;