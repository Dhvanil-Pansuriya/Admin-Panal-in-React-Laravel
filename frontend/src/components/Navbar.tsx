import { LogOut, User2, User } from "lucide-react"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Breadcrumbs from "../utils/Breadcrumbs"
import { logoutUser } from "../features/users/userSlice"
import { motion, AnimatePresence } from "framer-motion"
import { RootState } from "../app/store"

interface LayoutProps {
    children?: React.ReactNode
}

const Navbar: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const user = useSelector((state: RootState) => state.user.userData)

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/login")
    }

    const handleEditProfile = () => {
        navigate("/dashboard/profile")
        setIsPopupOpen(false)
    }

    const isDashboardRoute = location.pathname.startsWith("/dashboard")

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                !buttonRef.current?.contains(event.target as Node)
            ) {
                setIsPopupOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleProfileClick = () => {
        setIsPopupOpen(!isPopupOpen)
    }

    return (
        <>
            <nav className="sticky top-0 z-10 bg-white flex items-center justify-between h-16 px-4 border-b">
                {children}
                <div className="text-black text-xl font-bold">
                    <Link to="/" className="text-xl font-semibold">
                        My App
                    </Link>
                </div>
                <div className="relative">
                    {isDashboardRoute ? (
                        <button
                            ref={buttonRef}
                            className="flex items-center justify-center mr-1 w-10 h-10 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-sm"
                            onClick={handleProfileClick}
                        >
                            <User2 className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Logout
                        </button>
                    )}
                    <AnimatePresence>
                        {isPopupOpen && (
                            <motion.div
                                ref={popupRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-4 mr-1 w-48 bg-white rounded-sm shadow-lg py-0 z-40"
                            >
                                <div className="flex items-center w-full justify-center">
                                    <div className="max-w-xs">
                                        <div className="photo-wrapper py-2 flex items-center justify-center">
                                            <div className="h-20 w-20 rounded-md bg-gray-200 flex items-center justify-center">
                                                <User2 className="w-10 h-10" />
                                            </div>
                                        </div>
                                        <div className="pb-2">
                                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                                                {user?.name}
                                            </h3>
                                            <div className="text-center text-gray-600 text-xs font-semibold">
                                                <p>{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleEditProfile}
                                    className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    <User className="w-5 h-5 mr-3" />
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="w-5 h-5 mr-3" />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
            <section className="sticky top-16 bg-gray-100 z-0 p-3 flex items-center">
                <Breadcrumbs />
            </section>
        </>
    )
}

export default Navbar