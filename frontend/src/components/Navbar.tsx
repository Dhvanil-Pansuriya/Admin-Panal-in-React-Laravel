"use client"

import { LogOut, User2, Edit, User } from "lucide-react"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Breadcrumbs from "../utils/Breadcrumbs"
import { logoutUser } from "../features/users/userSlice"
import { motion, AnimatePresence } from "framer-motion" // Import motion and AnimatePresence

interface LayoutProps {
    children?: React.ReactNode
}

const Navbar: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupRef = useRef<HTMLDivElement>(null)

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
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsPopupOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

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
                            className="flex items-center justify-center mr-1 w-10 h-10 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-full"
                            onClick={() => setIsPopupOpen((prev) => !prev)} // Toggle popup state
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
                                className="absolute right-0 mt-2 mr-1 w-48 bg-white rounded-md shadow-lg py-1 z-40"
                            >
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