import { useState, useRef, useEffect } from "react";
export default function SearchBox() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    }; 
    const openSearch = (e) => {
        e.stopPropagation();
        setIsSearchOpen(true);
    }; 
    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery("");
    }; 
    // Close search on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                closeSearch();
            }
        };
        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]);

    return (
        <div className="relative flex items-center" ref={searchRef}>
            {/* Search Icon Button */}
            <button
                type="button"
                onClick={openSearch}
                className={`
                        flex items-center justify-center
                        w-[40px] h-[40px] rounded-full
                        transition-all duration-500 z-10
                        ${isSearchOpen
                        ? 'bg-gradient-to-r from-[#0B436A] to-[#299B8A]'
                        : 'bg-transparent'
                    }
                    `}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`
                        transition-colors duration-300 max-sm:hidden
                        ${isSearchOpen ? 'text-white' : 'text-white sm:text-gray-700'}
                        `}
                >
                    <path
                        d="M23.7732 22.6951L17.5765 16.5975C19.1992 14.8345 20.1963 12.5029 20.1963 9.93719C20.1955 4.44868 15.6748 0 10.0977 0C4.52072 0 0 4.44868 0 9.93719C0 15.4257 4.52072 19.8744 10.0977 19.8744C12.5074 19.8744 14.7175 19.0409 16.4535 17.6553L22.6742 23.7769C22.9773 24.0755 23.4694 24.0755 23.7725 23.7769C24.0763 23.4784 24.0763 22.9937 23.7732 22.6951ZM10.0977 18.3455C5.37898 18.3455 1.55368 14.581 1.55368 9.93719C1.55368 5.29341 5.37898 1.5289 10.0977 1.5289C14.8165 1.5289 18.6418 5.29341 18.6418 9.93719C18.6418 14.581 14.8165 18.3455 10.0977 18.3455Z"
                        fill="currentColor"
                    />
                </svg>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" className="sm:hidden">
                    <path d="M21.4739 21.474L17.036 17.036" stroke="white" strokeWidth="2.58333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.2482 19.4288C15.7662 19.4288 19.4288 15.7663 19.4288 11.2483C19.4288 6.73027 15.7662 3.06771 11.2482 3.06771C6.73022 3.06771 3.06766 6.73027 3.06766 11.2483C3.06766 15.7663 6.73022 19.4288 11.2482 19.4288Z" stroke="white" strokeWidth="2.58333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>


            {/* Expandable Search Input */}
            <form
                onSubmit={handleSearch}
                className={`
                      absolute right-0 flex items-center
                      transition-all duration-500 ease-out
                      ${isSearchOpen ? 'w-[300px] sm:w-[280px] opacity-100 translate-x-0' : 'w-0 opacity-0 pointer-events-none'}
                    `}
            >
                <div className="relative w-full">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search here..."
                        className="
                          w-full  h-[40px] 3xl:h-[45px] pl-5 pr-12
                          bg-white border-2 border-gray-200
                          rounded-full
                          outline-none transition-all duration-300
                          focus:border-blue 
                          text-gray-700 text-sm
                          placeholder:text-gray-400
                        "
                        autoFocus={isSearchOpen}
                    />
                    {/* Submit Button Inside Input */}
                    <button
                        type="submit"
                        className="
                          absolute right-1 top-1/2 -translate-y-1/2
                          flex items-center justify-center 
                          w-[28px] 2xl:w-[35px] 3xl:w-[45px] h-[28px] 2xl:h-[35px] 3xl:h-[45px] 
                          bg-transparent
                          rounded-full
                          transition-all duration-200
                          hover:scale-105 active:scale-95                          
                        "
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M23.7732 22.6951L17.5765 16.5975C19.1992 14.8345 20.1963 12.5029 20.1963 9.93719C20.1955 4.44868 15.6748 0 10.0977 0C4.52072 0 0 4.44868 0 9.93719C0 15.4257 4.52072 19.8744 10.0977 19.8744C12.5074 19.8744 14.7175 19.0409 16.4535 17.6553L22.6742 23.7769C22.9773 24.0755 23.4694 24.0755 23.7725 23.7769C24.0763 23.4784 24.0763 22.9937 23.7732 22.6951ZM10.0977 18.3455C5.37898 18.3455 1.55368 14.581 1.55368 9.93719C1.55368 5.29341 5.37898 1.5289 10.0977 1.5289C14.8165 1.5289 18.6418 5.29341 18.6418 9.93719C18.6418 14.581 14.8165 18.3455 10.0977 18.3455Z" fill="white" />
                        </svg>
                    </button>

                    {/* Clear Button */}
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="
                            absolute right-12 top-1/2 -translate-y-1/2
                            flex items-center justify-center
                            w-[24px] h-[24px]
                            text-gray-400 hover:text-gray-600
                            transition-colors duration-200
                          "
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
