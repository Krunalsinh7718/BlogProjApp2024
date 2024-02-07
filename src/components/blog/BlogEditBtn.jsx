function BlogEditBtn(props) {
  return (
    <>
      <button
        className="rounded-full bg-black h-10 w-10 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black grid place-items-center hover:bg-blue-600 shadow-xl"
        title="Edit"
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#fff"
          viewBox="0 0 24 24"
          height={16}
          width={16}
        >
          <path
            fill="#fff"
            fillRule="evenodd"
            d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  );
}

export default BlogEditBtn;
