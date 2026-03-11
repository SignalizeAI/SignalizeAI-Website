const ChevronIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`fill-current ${className}`}
  >
    <path d="M12 16.0313C11.75 16.0313 11.5312 15.9375 11.375 15.75L6.03125 10.0625C5.75 9.75 5.75 9.28125 6.03125 8.96875C6.3125 8.6875 6.78125 8.6875 7.09375 8.96875L12 14.1875L16.9062 8.96875C17.2188 8.6875 17.6875 8.6875 17.9688 8.96875C18.25 9.28125 18.25 9.75 17.9688 10.0625L12.625 15.75C12.4688 15.9375 12.25 16.0313 12 16.0313Z" />
  </svg>
);

export default ChevronIcon;
