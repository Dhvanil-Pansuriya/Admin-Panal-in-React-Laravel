// components/Breadcrumbs.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className="flex items-center text-sm text-gray-600 ">
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                return (
                    <React.Fragment key={name}>
                        {isLast ? (
                            <span className="text-gray-900 capitalize">{name}</span>
                        ) : (
                            <>
                                <Link to={routeTo} className="hover:text-gray-900 capitalize">
                                    {name}
                                </Link>
                                <ChevronRight className="mx-2 h-4 w-4" />
                            </>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;