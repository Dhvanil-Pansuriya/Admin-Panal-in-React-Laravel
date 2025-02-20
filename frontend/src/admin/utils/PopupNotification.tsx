import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle } from 'lucide-react';

interface User {
  name: string;
}

interface PopupNotificationProps {
  showPopup: boolean;
  deletedUser?: User | null;
  updateMessage?: string | null;
  onClose?: () => void;
  actionType: "delete" | "update" | null;
}

const PopupNotification: React.FC<PopupNotificationProps> = ({
  showPopup,
  deletedUser,
  updateMessage,
  actionType,
  onClose,
}) => {
  useEffect(() => {
    if (showPopup) {
      toast(
        <div className="flex items-center space-x-4">
          <CheckCircle className={`h-6 w-6  ${deletedUser ? 'text-red-400' : 'text-green-400'}`} />
          <span className="flex-1">
            {/* {deletedUser ? `User ${deletedUser.name} deleted successfully!` : updateMessage} */}
            {actionType === "delete" && deletedUser && (
              <p>User {deletedUser.name} has been deleted.</p>
            )}
            {actionType === "update" && updateMessage && (
              <p>{updateMessage}</p>
            )}
          </span>
        </div>
      );
    }
  }, [showPopup, deletedUser, updateMessage, onClose]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      closeOnClick={true}
      pauseOnHover
      draggable
      newestOnTop
      toastClassName="bg-gray-800 text-white rounded-lg shadow-lg"
      className="p-4"
    />
  );
};

export default PopupNotification;
