import { Edit, ChevronLeft, ChevronRight } from "lucide-react"
import type React from "react"
import { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { formatDistanceToNow } from "date-fns"
import EditModal from "../../utils/EditModal"
import PopupNotification from "../../utils/PopupNotification"

interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  role: number
}

type SortKey = "name" | "email"

const AllAdmins: React.FC = () => {
  const [admins, setAdmins] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "ascending" | "descending" } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [adminsPerPage] = useState(10)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const [updateMessage, setUpdateMessage] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)



  useEffect(() => {
    const token = localStorage.getItem("authToken")

    if (!token) {
      setError("No authentication token found. Please log in.")
      setLoading(false)
      return
    }

    axios
      .get(`${import.meta.env.VITE_SERVER_ADMIN_API}/admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setAdmins(response.data.data.admins)
        } else {
          setError("Failed to fetch admins: Invalid response format")
        }
      })
      .catch((error) => {
        console.error("Error fetching admins:", error)
        setError("Failed to fetch admins. Please check your permissions and try again.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const sortedadmins = useMemo(() => {
    const sortableadmins = [...admins]
    if (sortConfig !== null) {
      sortableadmins.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1
        return 0
      })
    }
    return sortableadmins
  }, [admins, sortConfig])

  const filteredadmins = useMemo(() => {
    return sortedadmins.filter(
      (user) =>
        user.id.toString().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [sortedadmins, searchTerm])

  // Pagination logic
  const indexOfLastUser = currentPage * adminsPerPage
  const indexOfFirstUser = indexOfLastUser - adminsPerPage
  const currentadmins = filteredadmins.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredadmins.length / adminsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const openEditModal = (user: User) => {
    setUserToEdit(user)
    setIsEditModalOpen(true)
  }

  // Close Edit Modal
  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setUserToEdit(null)
  }

  const handleUpdate = async (updatedUser: Partial<User>) => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      setError("No authentication token found. Please log in.")
      return
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_ADMIN_API}/user/${userToEdit?.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        setAdmins((prevUsers) =>
          prevUsers.map((user) => (user.id === userToEdit?.id ? { ...user, ...response.data.data.user } : user)),
        )
        setUpdateMessage(`Admin ${updatedUser.name} updated successfully!`)
        setShowPopup(true)
        setTimeout(() => {
          setShowPopup(false)
          setUpdateMessage(null)
        }, 3000)
        closeEditModal()
      }
    } catch (error) {
      console.error("Error updating user:", error)
      setError("Failed to update user. Please check your permissions and try again.")
    }
  }

  if (loading) {
    return <div className="text-center py-6">Loading admins...</div>
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">All Admins</h1>

      </div>
      <div className="flex items-center  justify-between">
        <input
          type="text"
          placeholder="Search users..."
          className=" px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:cursor-not-allowed">
          Add User
        </button>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { label: "ID", key: "id" },
                  { label: "Name", key: "name" },
                  { label: "Email", key: null },
                  { label: "Role", key: null },
                  { label: "Created", key: null },
                  { label: "Updated", key: null },
                  { label: "Actions", key: null },
                ].map((column) => (
                  <th
                    key={column.label}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => column.key && handleSort(column.key as SortKey)}
                  >
                    <div className="flex items-center gap-3">
                      {column.label}
                      {column.key && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentadmins.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.role == 1 && "Admin"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(user.updated_at), { addSuffix: true })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-gray-600 hover:text-gray-900 mx-1" onClick={() => openEditModal(user)}>
                      <Edit size={20} className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastUser, filteredadmins.length)}
                </span>{" "}
                of <span className="font-medium">{filteredadmins.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show first page, last page, current page, and pages around current page
                  const shouldShow =
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1;
                  return shouldShow;
                })
                .map((page, index, array) => {
                  // Add ellipsis where there are gaps
                  if (index > 0 && array[index - 1] !== page - 1) {
                    return [
                      <span key={`ellipsis-${page}`} className="px-3 py-2">...</span>,
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === page
                          ? "z-10 bg-gray-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {page}
                      </button>
                    ];
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === page
                        ? "z-10 bg-gray-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <EditModal isOpen={isEditModalOpen} onClose={closeEditModal} onSave={handleUpdate} user={userToEdit} />
        <PopupNotification
          showPopup={showPopup}
          updateMessage={updateMessage}
          onClose={() => setShowPopup(false)}
        />
      </div>
    </div>
  )
}

export default AllAdmins